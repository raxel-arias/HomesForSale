import { Request, Response, NextFunction } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import { PropertyController } from "../../controllers/properties/property.controller";
import { PropertyCreation, PropertyImageSetting } from "../../interfaces/controllers/property.interface";
import { User } from "../../interfaces/models/models.interface";
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
        
        const response = <ResolveResponse>(await new PropertyController().CreateProperty(property));

        res.redirect(`/me/property/set-image/${response.data.propertyCreated.id_property}`);
    } catch (error: any) {
        req.flash('req-error', error);
        req.flash('input-data', req.body);

        res.redirect('/me/create-property');
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
    const property: Property = <Property>res.locals.property;

    try {
        const data: PropertyImageSetting = {
            id_property: property.id_property!,
            imageName: req.file!.filename
        }

        const response = <ResolveResponse> await new PropertyController().SetImage(data);

        req.flash('req-info', response);

        next();
    } catch (error: any) {
        req.flash('req-error', error);

        res.redirect(`/me/property/set-image/${property.id_property}`);
    }
}