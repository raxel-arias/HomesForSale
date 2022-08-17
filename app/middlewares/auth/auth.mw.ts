import { NextFunction, Request, Response } from "express";
import { validationResult, ValidationError, Result } from "express-validator";

import { AuthController } from "../../controllers/auth/auth.controller";
import { SendEmail } from "../../handlers/Mail.handler";
import { JWT } from "../../handlers/Auth.handler";

import { User } from "../../interfaces/models/models.interface";
import { ResolveResponse } from "../../interfaces/response.interface";

export const SignUp = async (req: Request, res: Response): Promise<void> => {
    try {
        let inputErrors: Record<string, ValidationError>;
        const result: Result<ValidationError> = validationResult(req);
        
        if (!result.isEmpty()) {
            inputErrors = result.mapped();
            
            req.flash('input-errors', inputErrors);
            req.flash('input-data', req.body);

            res.redirect('/auth-view/signup');
            return;
        }

        const user: User = req.body as User;

        const response = await new AuthController().SignUp(user) as ResolveResponse;

        const url: string = `http://${req.headers.host}/auth/activation/${response.data.token}?activation=true">http://${req.headers.host}/auth/activation/${response.data.token}?activation=true`;

        await SendEmail({
            type: 'account-activation',
            to: user.email,
            subject: 'New Account',
            options: {
                username: user.name,
                url
            }
        });
        
        req.flash('req-info', response);

        res.redirect('/auth-view/signup');
    } catch (error: any) {
        req.flash('req-error', error);
        req.flash('input-data', req.body);
        console.log(error)
        res.redirect('/auth-view/signup');
    }
}

export const Login = async (req: Request, res: Response): Promise<void> => {
    try {
        let inputErrors: Record<string, ValidationError>;
        const result: Result<ValidationError> = validationResult(req);

        if (!result.isEmpty()) {
            inputErrors = result.mapped();

            req.flash('input-errors', inputErrors);
            req.flash('input-data', req.body);

            res.redirect('/auth-view/login');
            return;
        }

        const user: User = req.body as User;

        const response = await new AuthController().Login(user) as ResolveResponse;

        // req.flash('req-info', response);

        // res.redirect('/auth-view/login');

        const JWT_TOKEN = await JWT.GenJWT({
            id_user: response.data.id_user
        });

        res.cookie('_homesforsale', JWT_TOKEN, {
            httpOnly: true,
        });

        res.redirect('/me');
    } catch (error: any) {
        req.flash('req-error', error);
        req.flash('input-data', req.body);

        res.redirect('/auth-view/login')
    }
}

export const Logout = async (req: Request, res: Response): Promise<void> => {
    res.clearCookie('_homesforsale', {httpOnly: true});

    res.redirect('/auth-view/login');
}

export const RecoverAccount = async (req: Request, res: Response): Promise<void> => {
    try {
        let inputErrors: Record<string, ValidationError>;
        const result: Result<ValidationError> = validationResult(req);

        if (!result.isEmpty()) {
            inputErrors = result.mapped();

            req.flash('input-errors', inputErrors);
            req.flash('input-data', req.body);

            res.redirect('/auth-view/recover-account');
            return;
        }

        const user: User = req.body as User;

        const response = await new AuthController().RecoverAccount(user) as ResolveResponse;

        const url: string = `http://${req.headers.host}/auth/reset-password/${response.data.token}?recovery=true">http://${req.headers.host}/auth/reset-password/${response.data.token}?recovery=true`;

        await SendEmail({
            type: 'reset-password',
            to: user.email,
            subject: 'Account Lost',
            options: {
                url,
                username: response.data.name
            }
        });

        req.flash('req-info', response);

        res.redirect('/auth-view/recover-account');
    } catch (error: any) {
        req.flash('req-error', error);
        req.flash('input-data', req.body);
        
        res.redirect('/auth-view/recover-account')  
    }
}

export const ValidateActivationOrRecoveryToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {token} = req.params;
        const {activation} = req.query;
        const {recovery} = req.query;

        let type!: string;

        if (activation) {
            type = 'activation';
        } else if (recovery) {
            type = 'recovery'
        } else {
            res.redirect('/auth-view/login');
            return;
        }

        const response = await new AuthController().CheckActivationOrRecoveryToken(token, type) as ResolveResponse;

        res.locals.showing = true;
        req.flash('id_user', response.data.id_user);
        req.flash('req-info', response);

        next();
    } catch (error: any) {
        res.locals.showing = true;
        res.locals.isError = true;

        req.flash('req-error', error);

        next();
    }
}

export const SetNewPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id_user = req.flash('id_user');
    if (!id_user) {
        res.redirect('/auth/login');
        return;
    }

    //Temporal Storage for user id
    req.flash('id_user', id_user);

    try {
        let inputErrors: Record<string, ValidationError>;
        const result: Result<ValidationError> = validationResult(req);

        if (!result.isEmpty()) {
            inputErrors = result.mapped();
            
            const errors = {inputErrors, requestError: {}};
            
            res.render('public/set-new-password', {
                title: 'New Password',
                description: 'Make sure you use a strong password',
                errors,
                info: {},
                inputs: {}
            }); 
            return;
        }

        const user = {
            ...req.body,
            id_user: req.flash('id_user')
        }

        const response = await new AuthController().SetNewPassword(user) as ResolveResponse;
        
        req.flash('req-info', response);
        res.locals.showing = true; 
        
        next();
    } catch (error: any) {
        req.flash('req-error', error);
        res.locals.showing = true;

        next();
    }
}