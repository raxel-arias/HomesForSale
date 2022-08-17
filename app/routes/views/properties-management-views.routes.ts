import { Router } from "express";
import { 
    ShowSetImageView,
    ShowCreatePropertyView,
    ShowMeView, 
    ShowEditPropertyView} from "../../middlewares/views/properties-management/properties-management-views.mw";
import {JWT} from '../../handlers/Auth.handler';
import { ValidatePropertyExistence } from "../../middlewares/properties/properties.mw";

export const PropertiesManagementViewsRouter: Router = Router();

const PropertiesManagementViewsRouterChilds: Router = Router({mergeParams: true});

PropertiesManagementViewsRouter.use('/me', JWT.ValidateJWT, PropertiesManagementViewsRouterChilds);

PropertiesManagementViewsRouterChilds.get('/', ShowMeView);
PropertiesManagementViewsRouterChilds.get('/create-property', ShowCreatePropertyView);
PropertiesManagementViewsRouterChilds.get('/property/set-image/:id_property', ValidatePropertyExistence, ShowSetImageView);
PropertiesManagementViewsRouterChilds.get('/property/edit/:id_property', ValidatePropertyExistence, ShowEditPropertyView);
