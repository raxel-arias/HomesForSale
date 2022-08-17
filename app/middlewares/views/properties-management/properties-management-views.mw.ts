import { Request, Response } from "express";
import { PropertyController } from "../../../controllers/properties/property.controller";
import { CategoriesController } from "../../../controllers/categories/categories.controller";
import { LocationController } from "../../../controllers/locations/locations.controller";
import { CalculatePaginationCount, GeneratePagination } from "../../../utils/pagination.utils";
import { Property, User } from '../../../interfaces/models/models.interface';
import { ResolveResponse } from "../../../interfaces/response.interface";
import { Pagination } from "../../../interfaces/controllers/pagination.interface";

export const ShowMeView = async (req: Request, res: Response): Promise<void> => {
    let requestError: any = req.flash('req-error')[0] || {};
    let requestInfo: any = req.flash('req-info')[0] || {};

    const user: User = <User>req.user;

    const {
        page
    } = req.query;
    
    const queryParamsRegex = /^[0-9]$/;

    if (page && !queryParamsRegex.test(<string> page)) {
        return res.redirect('/me');
    }

    try {
        const paginationInfo: Pagination = {
            page: Number(page) || 1,
            limit: 3
        };

        const [a, b] = await Promise.all([
            new PropertyController().GetProperties(user.id_user!, paginationInfo),
            new PropertyController().GetPropertiesCounter(user.id_user!)
        ]);

        const propertiesList: Property[] = <Property[]>(<ResolveResponse> a).data.propertiesList;
        const propertiesCount: number = JSON.parse(JSON.stringify(b));

        const paginationCount = CalculatePaginationCount(paginationInfo.limit, propertiesCount);
        const paginationData = GeneratePagination(paginationInfo.page, paginationInfo.limit);
    
        res.render('management/panel', {
            title: 'My Panel',
            subtitle: 'My Properties',
            user,
            propertiesList,
            propertiesCount,
            paginationCount,
            page: page || 1,
            paginationData,
    
            errors: {requestError},
            info: requestInfo,
            csrfToken: req.csrfToken()
        });
    } catch (error: any) {
        req.flash('req-error', error);

        res.redirect('/app/index');
    }
}

//Form
export const ShowCreatePropertyView = async (req: Request, res: Response): Promise<void> => {
    let inputErrors: any = req.flash('input-errors')[0] || {};
    let requestError: any = req.flash('req-error')[0] || {};
    let requestInfo: any = req.flash('req-info')[0] || {};

    const errors = {inputErrors, requestError};
    const inputs = req.flash('input-data')[0];
  
    const user: User = <User>req.user;
    
    try {
        const {data: {categoriesList}} = <ResolveResponse> await new CategoriesController().CategoriesList();
        
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
        
    } catch (error: any) {
        req.flash('req-error', error);

        res.redirect('/app/index');
    }
}

//Form
export const ShowEditPropertyView = async (req: Request, res: Response): Promise<void> => {
    let inputErrors: any = req.flash('input-errors')[0] || {};
    let requestError: any = req.flash('req-error')[0] || {};
    let requestInfo: any = req.flash('req-info')[0] || {};

    const errors = {inputErrors, requestError};
    const inputs = req.flash('input-data')[0];
  
    const property: Property = <Property> res.locals.property;
    const user: User = <User>req.user;
    
    try {
        
        const [{data: {locationFound}}, {data: {categoriesList}}] = await Promise.all([
            <ResolveResponse> await new LocationController().GetLocation(property.id_property!),
            <ResolveResponse> await new CategoriesController().CategoriesList()
        ]);
        
        res.render('management/edit-property', {
            title: 'Edit Property',
            subtitle: property.title,
            user,
            property,
            locationFound,
            categoriesList,
    
            errors,
            info: requestInfo,
            inputs,
            csrfToken: req.csrfToken(),
        });
        
    } catch (error: any) {
        req.flash('req-error', error);

        res.redirect('/app/index');
    }
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