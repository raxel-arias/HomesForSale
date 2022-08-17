import { Router } from "express";
import { 
    ShowIndexByGlobalMapView,
    ShowIndexView, ShowPublicPropertyView } from "../../middlewares/views/properties/properties-views.mw";
import { SetViewAsPublic } from "../../middlewares/views/auth/auth-views.mw";
import { JWT } from '../../handlers/Auth.handler';

export const PropertiesViewRouter: Router = Router();

const PropertiesViewRouterChilds: Router = Router({mergeParams: true});

PropertiesViewRouter.use('/app', PropertiesViewRouterChilds);

PropertiesViewRouterChilds.get('/index', SetViewAsPublic, JWT.ValidateJWT, ShowIndexView);
PropertiesViewRouterChilds.get('/index/global', SetViewAsPublic, JWT.ValidateJWT, ShowIndexByGlobalMapView);
PropertiesViewRouterChilds.get('/property/view/:id_property', SetViewAsPublic, JWT.ValidateJWT, ShowPublicPropertyView);