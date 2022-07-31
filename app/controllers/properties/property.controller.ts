import { Op } from "sequelize";
import { PropertiesModel } from "../../models/models.module";
import { CategoriesModel } from "../../models/models.module";
import { LocationController } from "../locations/locations.controller";
import { ResolveResponse, RejectResponse } from "../../interfaces/response.interface";
import { PropertyCreation, PropertyFinding, PropertyImageSetting } from "../../interfaces/controllers/property.interface";

export class PropertyController {
    constructor() {}

    public CreateProperty(property: PropertyCreation): Promise<ResolveResponse | RejectResponse> {
        return new Promise(async (resolve: (info: ResolveResponse) => void, reject: (reason: RejectResponse) => void) => {
            try {
                const propertyCreated = await PropertiesModel.create(property);
                
                const locationCreated = await new LocationController().CreateLocation({
                    property: propertyCreated.id_property!,
                    address: property.full_address,
                    latitude: property.latitude.toString(),
                    longitude: property.longitude.toString()
                });

                resolve({
                    msg: 'Property created',
                    data: {
                        propertyCreated
                    }
                });
            } catch (error: any) {
                reject({
                    msg: 'An error has occurred during property creation',
                    error: true,
                    errorDetails: error
                });
            }
        });
    }

    public GetProperties(id_user: number): Promise<ResolveResponse | RejectResponse> {
        return new Promise(async (resolve: (info: ResolveResponse) => void, reject: (reason: RejectResponse) => void) => {
            try {
                const propertiesList = await PropertiesModel.findAll({
                    where: {
                        vendor: id_user
                    },
                    include: [{model: CategoriesModel, as: 'category'}]
                });

                resolve({
                    msg: 'Properties list obtained',
                    data: {
                        propertiesList
                    }
                });
            } catch (error: any) {
                reject({
                    msg: 'An error has occurred while getting properties',
                    error: true,
                    errorDetails: error
                });
            }
        });
    }
    
    public GetProperty(params: PropertyFinding): Promise<ResolveResponse | RejectResponse> {
        return new Promise(async (resolve: (info: ResolveResponse) => void, reject: (reason: RejectResponse) => void) => {
            try {
                const propertyFound = await PropertiesModel.findOne({
                    where: {
                        [Op.and]: [
                            {
                                id_property: params.id_property
                            },
                            {
                                vendor: params.id_user
                            }
                        ] 
                    }
                });

                if (!propertyFound) {
                    reject({
                        msg: 'Property not found',
                        error: false
                    });
                    return;
                }

                resolve({
                    msg: 'Property found',
                    data: {
                        propertyFound
                    }
                });
            } catch (error: any) {
                reject({
                    msg: 'An error has occurred while getting property information',
                    error: true,
                    errorDetails: error
                });
            }
        });
    }

    public SetImage(params: PropertyImageSetting): Promise<ResolveResponse | RejectResponse> {
        return new Promise(async (resolve: (info: ResolveResponse) => void,  reject: (reason: RejectResponse) => void) => {
            try {
                const propertyFound = await PropertiesModel.findOne({
                    where: {
                        id_property: params.id_property
                    }
                });

                if (!propertyFound) {
                    reject({
                        msg: 'Property not found',
                        error: false
                    });
                    return;
                }

                propertyFound.image = params.imageName;

                await propertyFound.save();

                resolve({
                    msg: 'Image updated successfuly'
                }); 
            } catch (error: any) {
                reject({
                    msg: 'An error has occurred while setting property image',
                    error: true,
                    errorDetails: error
                });
            }
        });
    }

    public ChangePropertyPublishedStatus(id_property: string): Promise<ResolveResponse | RejectResponse> {
        return new Promise(async (resolve: (info: ResolveResponse) => void, reject: (reason: RejectResponse) => void) => {
            try {
                const propertyFound = await PropertiesModel.findOne({
                    where: {
                        id_property
                    }
                });

                if (!propertyFound) {
                    reject({
                        msg: 'Property not found',
                        error: false
                    });
                    return;
                }

                propertyFound.published = propertyFound.published ? 0 : 1;

                await propertyFound.save();

                resolve({
                    msg: 'Property status changed successfuly'
                });
            } catch (error: any) {
                reject({
                    msg: 'An error has occurred while changing property status',
                    error: true,
                    errorDetails: error
                });
            }
        });
    }
}