import { Request, Response } from "express";
import { CategoriesController } from "../../../controllers/categories/categories.controller";
import { PropertyController } from "../../../controllers/properties/property.controller";
import { Property, User } from '../../../interfaces/models/models.interface';
import { ResolveResponse } from "../../../interfaces/response.interface";

export const ShowMeView = async (req: Request, res: Response): Promise<void> => {
    let requestError: any = req.flash('req-error')[0] || {};
    let requestInfo: any = req.flash('req-info')[0] || {};

    const user: User = <User>req.user;

    const propertiesList: Property[] = <Property[]>(<ResolveResponse> await new PropertyController().GetProperties(user.id_user!)).data.propertiesList;

    res.render('management/panel', {
        title: 'My Panel',
        subtitle: 'My Properties',
        user,
        propertiesList,

        errors: {requestError},
        info: requestInfo
    });
}

//Form
export const ShowCreatePropertyView = async (req: Request, res: Response): Promise<void> => {
    let inputErrors: any = req.flash('input-errors')[0] || {};
    let requestError: any = req.flash('req-error')[0] || {};
    let requestInfo: any = req.flash('req-info')[0] || {};

    const errors = {inputErrors, requestError};
    const inputs = req.flash('input-data')[0];
  
    const user: User = <User>req.user;
    
    const categoriesList = (await new CategoriesController().CategoriesList() as ResolveResponse).data.categoriesList;
    
    res.render('management/create-property', {
        title: 'New Property',
        subtitle: 'Creating Property',
        categoriesList,
        user,

        errors,
        info: requestInfo,
        inputs,
        csrfToken: req.csrfToken(),
    });
}

//Form
export const ShowSetImageView = async (req: Request, res: Response): Promise<void> => {
    const property: Property = <Property>res.locals.property;

    let inputErrors: any = req.flash('input-errors')[0] || {};
    let requestError: any = req.flash('req-error')[0] || {};
    let requestInfo: any = req.flash('req-info')[0] || {};

    const errors = {inputErrors, requestError};
    const inputs = req.flash('input-data')[0];

    const user: User = <User>req.user;

    res.render('management/set-image', {
        title: 'Set Image',
        subtitle: 'Setting Image',
        property,
        user,
        hostname: 'http://' + req.headers.host,

        errors,
        info: requestInfo,
        inputs,
        csrfToken: req.csrfToken()
    });
}