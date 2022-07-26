import { Router } from "express";
import { 
    SetImage,
    CreateProperty, 
    ValidatePropertyExistence
} from "../../middlewares/properties/properties.mw";
import { JWT } from "../../handlers/Auth.handler";
import { PropertyValidator } from "../../validations/property.validator";
import { uploader } from "../../middlewares/files.mw";
    
export const PropertiesRouter: Router = Router();

const PropertiesRouterChilds: Router = Router({mergeParams: true});
PropertiesRouter.use('/properties', JWT.ValidateJWT, PropertiesRouterChilds);

PropertiesRouterChilds.post('/create', PropertyValidator.CreateProperty, CreateProperty);
PropertiesRouterChilds.post('/set-image/:id_property', ValidatePropertyExistence, uploader.single('image'), SetImage);