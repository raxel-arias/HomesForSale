import { Router } from "express";
import {
    Login,
    Logout,
    RecoverAccount,
    SetNewPassword,
    SignUp,
    ValidateActivationOrRecoveryToken,
} from '../../middlewares/auth/auth.mw';
import { JWT } from "../../handlers/Auth.handler";
import { ShowAuthInfoView, ShowSetNewPasswordView } from "../../middlewares/views/auth/auth-views.mw";
import { AuthValidator } from "../../validations/auth.validator";

export const AuthRouter: Router = Router();
AuthRouter.get('/auth/logout', JWT.ValidateJWT, Logout);

const AuthRouterChilds: Router = Router({mergeParams: true});
AuthRouter.use('/auth', AuthRouterChilds);

AuthRouterChilds.post('/signup', AuthValidator.SignUp, SignUp);
AuthRouterChilds.post('/login', AuthValidator.Login, Login);
AuthRouterChilds.post('/recover-account', AuthValidator.RecoverAccount, RecoverAccount);
AuthRouterChilds.get('/activation/:token', ValidateActivationOrRecoveryToken, ShowAuthInfoView);
AuthRouterChilds.get('/reset-password/:token', ValidateActivationOrRecoveryToken, ShowSetNewPasswordView, ShowAuthInfoView);
AuthRouterChilds.post('/set-new-password', AuthValidator.SetNewPassword, SetNewPassword, ShowAuthInfoView);