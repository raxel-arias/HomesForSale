import { Request, Response } from "express";
import { PropertyController } from "../../../controllers/properties/property.controller";
import { PropertyFound } from "../../../interfaces/controllers/property.interface";
import { Property, User } from '../../../interfaces/models/models.interface';
import { ResolveResponse } from "../../../interfaces/response.interface";

export const ShowIndexView = async (req: Request, res: Response): Promise<void> => {
    const user: User = <User> req.user;

    let requestError: any = req.flash('req-error')[0] || {};
    let requestInfo: any = req.flash('req-info')[0] || {};
    
    try {
        const publicPropertiesList: Property[] = <Property[]>(<ResolveResponse> await new PropertyController().GetPublicProperties()).data.propertiesList;
        
        res.render('public-view/index', {
            title: 'Index',
            subtitle: 'HomesForSale',
            user,
            publicPropertiesList,
            index: true,
    
            errors: {requestError},
            info: requestInfo
        });
    } catch (error: any) {
        req.flash('req-error', error);

        res.redirect('/app/index');
    }
}

export const ShowIndexByGlobalMapView = async (req: Request, res: Response): Promise<void> => {
    try {

    } catch (error: any) {

    }
}

export const ShowPublicPropertyView = async (req: Request, res: Response): Promise<void> => {
    const user: User = <User> req.user;
    const {id_property} = req.params;

    let inputErrors: any = req.flash('input-errors')[0] || {};
    let requestError: any = req.flash('req-error')[0] || {};
    let requestInfo: any = req.flash('req-info')[0] || {};

    const errors = {inputErrors, requestError};
    const input = req.flash('input-data')[0];

    try {
        const property: PropertyFound = <PropertyFound>(<ResolveResponse> await new PropertyController().GetPublicProperty(id_property!)).data.propertyFound;
        console.log(property.user.email);
        res.render('public-view/property', {
            title: property.title,
            subtitle: 'Vendor: ' + property.user.name,
            hideSubtitle: true,
            index: true,

            user,
            property,

            errors,
            info: requestInfo,
            input,
            csrfToken: req.csrfToken(),
        });
    } catch (error: any) {
        req.flash('req-error', error);

        res.redirect('/app/index');
    }
}