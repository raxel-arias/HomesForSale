import { NextFunction, Request, Response } from "express";

export const ShowLoginView = async (req: Request, res: Response): Promise<void> => {
    let inputErrors: any = req.flash('input-errors')[0] || {};
    let requestError: any = req.flash('req-error')[0] || {};
    let requestInfo: any = req.flash('req-info')[0] || {};
    
    const errors = {inputErrors, requestError};
    
    const inputs = req.flash('input-data')[0];
    
    res.render('public/login', {
        title: 'Login',
        description: 'Access now',
        errors,
        info: requestInfo,
        inputs,
        csrfToken: req.csrfToken()
    });
}

export const ShowSignUpView = async (req: Request, res: Response): Promise<void> => {
    let inputErrors: any = req.flash('input-errors')[0] || {};
    let requestError: any = req.flash('req-error')[0] || {};
    let requestInfo: any = req.flash('req-info')[0] || {};

    const errors = {inputErrors, requestError};
    
    const inputs = req.flash('input-data')[0];

    res.render('public/signup', {
        title: 'SignUp',
        description: 'Create an account',
        errors,
        info: requestInfo,
        inputs,
        csrfToken: req.csrfToken()
    });
}

export const ShowRecoverAccountView = async (req: Request, res: Response): Promise<void> => {
    let inputErrors: any = req.flash('input-errors')[0] || {};
    let requestError: any = req.flash('req-error')[0] || {};
    let requestInfo: any = req.flash('req-info')[0] || {};
    
    const errors = {inputErrors, requestError};
    
    const inputs = req.flash('input-data')[0];
    
    res.render('public/recover-account', {
        title: 'Recover Account',
        description: 'Did you forget your password?',
        errors,
        info: requestInfo,
        inputs,
        csrfToken: req.csrfToken()
    });
}

export const ShowAuthInfoView = async (req: Request, res: Response): Promise<void> => {
    let requestError: any = req.flash('req-error')[0] || {};
    let requestInfo: any = req.flash('req-info')[0] || {};

    const errors = {requestError};

    const showThis = res.locals.showing;

    if (!showThis) {
        res.redirect('/auth-view/login');
        return;
    }

    res.render('public/auth-info', {
        title: 'Authentication',
        description: 'Result...',
        errors,
        info: requestInfo,
        inputs: {}
    });
}

export const ShowSetNewPasswordView = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (res.locals.isError) {
        next();
        return;
    }

    let inputErrors: any = req.flash('input-errors')[0] || {};
    let requestError: any = req.flash('req-error')[0] || {};
    let requestInfo: any = req.flash('req-info')[0] || {};
    
    const errors = {inputErrors, requestError};
    
    const inputs = req.flash('input-data')[0];
    
    res.render('public/set-new-password', {
        title: 'New Password',
        description: 'Make sure you use a strong password',
        errors,
        info: requestInfo,
        inputs,
        csrfToken: req.csrfToken()
    }); 
}