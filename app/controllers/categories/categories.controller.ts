import { CategoriesModel } from "../../models/Categories.model";

import { ResolveResponse } from "../../interfaces/response.interface";
import { RejectResponse } from "../../interfaces/response.interface";

export class CategoriesController {
    constructor() {}

    public CategoriesList(): Promise<ResolveResponse | RejectResponse> {
        return new Promise (async (resolve: (info: ResolveResponse) => void, reject: (reason: RejectResponse) => void) => {
            try {
                const categoriesList = await CategoriesModel.findAll();

                resolve({
                    msg: 'Categories list obtained',
                    data: {
                        categoriesList
                    }
                });
            } catch (error: any) {
                reject({
                    error: true,
                    msg: 'An error has occurred while getting categories list',
                    errorDetails: error
                });
            }
        });
    }

    public GetCategory(id_category: number): Promise<ResolveResponse | RejectResponse> {
        return new Promise(async (resolve: (info: ResolveResponse) => void, reject: (reason: RejectResponse) => void) => {
            try {
                const categoryFound = await CategoriesModel.findOne({
                    where: {
                        id_category
                    }
                });

                if (!categoryFound) {
                    reject({
                        error: false,
                        msg: 'Category Not Found'
                    });
                    return;
                }

                resolve({
                    msg: 'Category obtained',
                    data: {
                        categoryFound
                    }
                });
            } catch (error: any) {
                reject({
                    error: true,
                    msg: 'An error has occurred while getting category',
                    errorDetails: error
                })
            } 
        });
    }
}