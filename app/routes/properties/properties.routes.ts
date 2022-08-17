import { Router } from "express";
import { 
    SetImage,
    CreateProperty, 
    ValidatePropertyExistence,
    EditProperty,
    ChangePropertyStatus,
    DeleteProperty,
    GetPublicProperties
} from "../../middlewares/properties/properties.mw";
import { JWT } from "../../handlers/Auth.handler";
import { PropertyValidator } from "../../validations/property.validator";
import { uploader } from "../../middlewares/files.mw";
    
export const PropertiesRouter: Router = Router();
//Public access
PropertiesRouter.get('/properties/public/list', GetPublicProperties);

const PropertiesRouterChilds: Router = Router({mergeParams: true});

PropertiesRouter.use('/properties', JWT.ValidateJWT, PropertiesRouterChilds);

//Private Access
PropertiesRouterChilds.post('/create', PropertyValidator.CreateProperty, CreateProperty);
PropertiesRouterChilds.post('/set-image/:id_property', ValidatePropertyExistence, uploader.single('image'), SetImage);
PropertiesRouterChilds.post('/edit/:id_property', ValidatePropertyExistence, PropertyValidator.CreateProperty, EditProperty);
PropertiesRouterChilds.patch('/change-status/:id_property', ValidatePropertyExistence, ChangePropertyStatus);
PropertiesRouterChilds.delete('/delete/:id_property', ValidatePropertyExistence, DeleteProperty);