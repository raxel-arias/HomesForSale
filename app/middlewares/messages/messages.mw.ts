import { Request, Response, NextFunction } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import { PropertyController } from "../../controllers/properties/property.controller";
import { MessageController } from '../../controllers/messages/message.controller';
import { User } from "../../interfaces/models/models.interface";
import { Property } from '../../interfaces/models/models.interface';
import { ResolveResponse } from "../../interfaces/response.interface";

export const SendMessageToVendor = async (req: Request, res: Response): Promise<void> => {
    const user = <User> req.user;
    const {id_property} = req.params;

    try {
        let inputErrors: Record<string, ValidationError>;
        const result: Result<ValidationError> = validationResult(req);
        
        if (!result.isEmpty()) {
            inputErrors = result.mapped();
            
            req.flash('input-errors', inputErrors);
            req.flash('input-data', req.body);

            return res.redirect(`/app/property/view/${id_property}#contact`);
        }


        const propertyFound = <Property>(<ResolveResponse> await new PropertyController().GetPublicProperty(id_property)).data.propertyFound;

        if (propertyFound.vendor == user.id_user) {
            req.flash('req-error', {msg: "Can't message yourself"});

            return res.redirect('/app/index');
        }

        const response = await new MessageController().SendMessageToVendor({
            id_property: propertyFound.id_property!,
            id_user: user.id_user!,
            message: req.body.message
        });

        req.flash('req-info', response);

        res.redirect(`/app/property/view/${id_property}`);
    } catch (error: any) {
        req.flash('req-error', error);

        res.redirect('/app/index');
    }
}