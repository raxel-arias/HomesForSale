import { Router } from "express";
import { 
    ShowLoginView, 
    ShowRecoverAccountView, 
    ShowSignUpView } from "../../middlewares/views/auth/auth-views.mw";

export const AuthViewsRouter: Router = Router();

const AuthViewsRouterChilds: Router = Router({mergeParams: true});
AuthViewsRouter.use('/auth-view', AuthViewsRouterChilds);

AuthViewsRouterChilds.get('/login', ShowLoginView);
AuthViewsRouterChilds.get('/signup', ShowSignUpView);
AuthViewsRouterChilds.get('/recover-account', ShowRecoverAccountView);