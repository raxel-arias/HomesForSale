import { Request, Response, NextFunction } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import { PropertyController } from "../../controllers/properties/property.controller";
import { PropertyCreation, PropertyImageSetting, PropertyModification } from "../../interfaces/controllers/property.interface";
import { Location, User } from "../../interfaces/models/models.interface";
import { Property } from '../../interfaces/models/models.interface';
import { ResolveResponse } from "../../interfaces/response.interface";

export const CreateProperty = async (req: Request, res: Response): Promise<void> => {
    const user = <User> req.user;

    try {
        let inputErrors: Record<string, ValidationError>;
        const result: Result<ValidationError> = validationResult(req);
        
        if (!result.isEmpty()) {
            inputErrors = result.mapped();
            
            req.flash('input-errors', inputErrors);
            req.flash('input-data', req.body);

            res.redirect('/me/create-property');
            
            return;
        }

        const property: PropertyCreation = <PropertyCreation>req.body;
        property.vendor = Number(user.id_user);
        
        const response = <ResolveResponse> await new PropertyController().CreateProperty(property);

        res.redirect(`/me/property/set-image/${response.data.propertyCreated.id_property}`);
    } catch (error: any) {
        req.flash('req-error', error);
        req.flash('input-data', req.body);

        res.redirect('/me/create-property');
    }
}

export const EditProperty = async (req: Request, res: Response): Promise<void> => {
    const user = <User> req.user;
    const property = <Property> res.locals.property;
    
    try {
        let inputErrors: Record<string, ValidationError>;
        const result: Result<ValidationError> = validationResult(req);
        
        if (!result.isEmpty()) {
            inputErrors = result.mapped();
            
            req.flash('input-errors', inputErrors);
            req.flash('input-data', req.body);

            res.redirect(`/me/property/edit/${property.id_property}`);

            return;
        }

        let {
            _csrf,

            full_address, 
            latitude, 
            longitude, 

            ...propertyToUpdateData
        } = req.body;

        let propertyToUpdate: Property = Object.assign(
            {}, 
            propertyToUpdateData, 
            {
                vendor: user.id_user, 
                id_property: property.id_property
            }); 
        let locationToUpdate: Location = {
            address: full_address, 
            latitude, 
            longitude
        };

        const propertyModification: PropertyModification = {
            ...propertyToUpdate,
            location: locationToUpdate
        }
        
        const response = await new PropertyController().UpdateProperty(propertyModification);
        
        req.flash('req-info', response);

        res.redirect('/me');
    } catch (error: any) {
        req.flash('req-error', error);
        req.flash('input-data', req.body);
        
        res.redirect(`/me/property/edit/${property.id_property}`);
    }
}

export const ValidatePropertyExistence = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = <User> req.user;
    const {id_property} = req.params;

    try {
        const response = <ResolveResponse> (await new PropertyController().GetProperty({
            id_user: user.id_user!,
            id_property
        }));

        res.locals.property = response.data.propertyFound;

        next();
    } catch (error: any) {
        req.flash('req-error', error);

        res.redirect('/me');
    }
}

export const SetImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const property: Property = <Property> res.locals.property;
    
    try {
        const data: PropertyImageSetting = {
            id_property: property.id_property!,
            imageName: req.file!.filename
        }

        const response = <ResolveResponse> await new PropertyController().SetImage(data);

        req.flash('req-info', response);

        res.json({msg: 'Image updated successfully'}).status(200);
    } catch (error: any) {
        req.flash('req-error', error);

        res.redirect(`/me/property/set-image/${property.id_property}`);
    }
}

export const ChangePropertyStatus = async (req: Request, res: Response): Promise<void> => {
    const property: Property = <Property> res.locals.property;

    try {
        const response = <ResolveResponse> await new PropertyController().ChangePropertyPublishedStatus(property.id_property!);

        res.json(response).status(200);
    } catch (error: any) {
        req.flash('req-error', error);

        res.redirect('/me');
    }
}