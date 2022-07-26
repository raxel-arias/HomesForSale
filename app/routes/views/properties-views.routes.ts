import { Router } from "express";
import { 
    ShowIndexView } from "../../middlewares/views/properties/properties-views.mw";
import { JWT } from '../../handlers/Auth.handler';

export const PropertiesViewRouter: Router = Router();

const PropertiesViewRouterChilds: Router = Router({mergeParams: true});

PropertiesViewRouter.use('/app', JWT.ValidateJWT, PropertiesViewRouterChilds);

PropertiesViewRouterChilds.get('/index', ShowIndexView);