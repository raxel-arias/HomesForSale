import { Request, Response } from "express";
import { CategoriesController } from "../../../controllers/categories/categories.controller";
import { PropertyController } from "../../../controllers/properties/property.controller";
import { PropertyFound } from "../../../interfaces/controllers/property.interface";
import { Category, Property, User } from '../../../interfaces/models/models.interface';
import { ResolveResponse } from "../../../interfaces/response.interface";

export const ShowIndexView = async (req: Request, res: Response): Promise<void> => {
    const user: User = <User> req.user;

    let requestError: any = req.flash('req-error')[0] || {};
    let requestInfo: any = req.flash('req-info')[0] || {};

    const {
        category,
        title
    } = req.query;

    const queryParamsRegex = /^[0-9]$/;

    if (category && !queryParamsRegex.test(<string> category)) {
        return res.redirect('/app/index');
    }
    
    try {
        const publicPropertiesList: Property[] = <Property[]>(<ResolveResponse> await new PropertyController().GetPublicProperties(
            {
                ...(category && {category_type: Number(category)}),
                ...(title && {title: <string> title})
            }
            )).data.propertiesList;
        const categoriesList: Category[] = <Category[]>(<ResolveResponse> await new CategoriesController().CategoriesList()).data.categoriesList;

        const categoryTitle = categoriesList.filter(cat => cat.id_category == category);

        res.render('public-view/index', {
            title: 'Index',
            subtitle: categoryTitle && categoryTitle[0] ? categoryTitle[0].name : 'Properties',
            user,
            publicPropertiesList,
            categoriesList,
            index: true,
            indexPage: true,
    
            errors: {requestError},
            info: requestInfo
        });
    } catch (error: any) {
        req.flash('req-error', error);

        res.redirect('/app/index');
    }
}

export const ShowIndexByGlobalMapView = async (req: Request, res: Response): Promise<void> => {
    const user: User = <User> req.user;

    let requestError: any = req.flash('req-error')[0] || {};
    let requestInfo: any = req.flash('req-info')[0] || {};

    const {
        category
    } = req.query;

    const queryParamsRegex = /^[0-9][0-9]$/;

    if (category && !queryParamsRegex.test(<string> category)) {
        return res.redirect('/app/index');
    }

    try {
        const categoriesList: Category[] = <Category[]>(<ResolveResponse> await new CategoriesController().CategoriesList()).data.categoriesList;

        res.render('public-view/global', {
            title: 'Index .:Global:.',
            subtitle: 'Global Map',
            user,
            index: true,
            categoriesList,
            searcher: true,

            errors: {requestError},
            info: requestInfo,
            csrfToken: req.csrfToken(),
        });
    } catch (error: any) {
        req.flash('req-error', error);
        
        res.redirect('/app/index');
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
        const categoriesList: Category[] = <Category[]>(<ResolveResponse> await new CategoriesController().CategoriesList()).data.categoriesList;
        const property: PropertyFound = <PropertyFound>(<ResolveResponse> await new PropertyController().GetPublicProperty(id_property!)).data.propertyFound;
        
        res.render('public-view/property', {
            title: property.title,
            subtitle: 'Vendor: ' + property.user.name,
            hideSubtitle: true,
            index: true,
            indexPage: true,
            categoriesList,

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