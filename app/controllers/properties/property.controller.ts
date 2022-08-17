import { Op, QueryTypes } from "sequelize";
import { LocationsModel, PropertiesModel, UsersModel, CategoriesModel, MessagesModel } from "../../models/models.module";
import { LocationController } from "../locations/locations.controller";
import { ResolveResponse, RejectResponse } from "../../interfaces/response.interface";
import { PropertyCreation, PropertyFinding, PropertyImageSetting, PropertyModification, SearchParams } from "../../interfaces/controllers/property.interface";
import { Pagination } from '../../interfaces/controllers/pagination.interface';
import { GeneratePagination } from "../../utils/pagination.utils";
export class PropertyController {
    constructor() {}

    public GetPropertiesCounter(id_user: number): Promise<number> {
        return new Promise(async (resolve, reject) => {
            try {
                const count = await PropertiesModel.count({
                    where: {
                        vendor: id_user
                    }
                });

                resolve(count);
            } catch (error: any) {
                reject(0);
            }
        });
    }

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

    public UpdateProperty(propertyModification: PropertyModification): Promise<ResolveResponse | RejectResponse> {
        return new Promise(async (resolve: (info: ResolveResponse) => void, reject: (reason: RejectResponse) => void) => {
            try {
                const propertyFound = await PropertiesModel.findOne({
                    where: {
                        id_property: propertyModification.id_property
                    }
                });

                if (!propertyFound) {
                    reject({
                        msg: 'Property not found',
                        error: false
                    });
                    return;
                }

                const {data: {locationFound}} = <ResolveResponse> await new LocationController().GetLocation(propertyModification.id_property!);

                let {id_property, location, ...propertyObj} = propertyModification;
                
                //First arg = originalData, Second arg = New data to fill,
                Object.assign(propertyFound, propertyObj);
                Object.assign(locationFound, location);

                //Also we can use objectFoundModel.set(newData) if we want to update

                await propertyFound.save();
                await locationFound.save();

                resolve({
                    msg: 'Property updated successfully'
                });

            } catch (error: any) {
                reject({
                    msg: 'An error has occurred during property modification',
                    error: true,
                    errorDetails: error
                });
            }
        });
    }

    public GetProperties(id_user: number, pagination: Pagination): Promise<ResolveResponse | RejectResponse> {
        return new Promise(async (resolve: (info: ResolveResponse) => void, reject: (reason: RejectResponse) => void) => {
            try {
                const paginationConfig = GeneratePagination(pagination.page, pagination.limit);

                // let query = `
                // SELECT
                //     user.id_user as id_vendor,
                //     user.name as vendor_name,
                //     prop.*,
                //     cat.name as cat_name,
                //     (COUNT(msg.id_property)) as messages
                // FROM properties prop
                // INNER JOIN categories cat on cat.id_category = prop.category_type
                // INNER JOIN users user on user.id_user = prop.vendor
                // LEFT OUTER JOIN messages msg on msg.id_property = prop.id_property
                // WHERE prop.vendor = ${id_user}
                // GROUP BY prop.id_property
                // ORDER BY msg.createdAt DESC, prop.updatedAt DESC
                // LIMIT ${paginationConfig.offset}, ${paginationConfig.limit}
                // `
                // const propertiesList = await PropertiesModel.sequelize?.query(query, {type: QueryTypes.SELECT});

                const propertiesList = await PropertiesModel.findAll({
                    ...paginationConfig,
                    where: {
                        vendor: id_user
                    },
                    include: [
                        {model: CategoriesModel, as: 'category'},
                        {
                            model: MessagesModel, 
                            as: 'messages', 
                            order: ['createdAt', 'DESC']
                        }
                    ],
                    order: [
                        ['updatedAt', 'DESC']
                    ]
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

    public GetPublicProperties(): Promise<ResolveResponse | RejectResponse> {
        return new Promise(async (resolve: (info: ResolveResponse) => void, reject: (reason: RejectResponse) => void) => {
            try {
                const propertiesList = await PropertiesModel.findAll({
                    where: {
                        published: 1
                    },
                    include: [{model: CategoriesModel, as: 'category'}]
                });

                resolve({
                    msg: 'Showing public properties',
                    data: {
                        propertiesList
                    }
                });
            } catch (error: any) {
                reject({
                    msg: 'An error has occurred while getting public properties',
                    error: true,
                    errorDetails: error
                });
            }
        });
    }

    public GetPublicProperty(id_property: string): Promise<ResolveResponse | RejectResponse> {
        return new Promise(async (resolve: (info: ResolveResponse) => void, reject: (reason: RejectResponse) => void) => {
            try {
                const propertyFound = await PropertiesModel.findOne({
                    where: {
                        id_property,
                        published: 1
                    },
                    include: [
                        CategoriesModel,
                        {
                            model: UsersModel,
                            attributes: [
                                'id_user',
                                'name',
                                'email'
                            ]
                        }
                    ]
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
                    msg: 'An error has occurred while getting public property information',
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

    public DeleteProperty(id_property: string): Promise<ResolveResponse | RejectResponse> {
        return new Promise(async (resolve: (info: ResolveResponse) => void, reject: (reason: RejectResponse) => void) => {
            try {
                const propertyDeleted = await PropertiesModel.destroy({
                    where: {
                        id_property
                    }
                });

                if (!propertyDeleted) {
                    reject({
                        msg: 'Property not found',
                        error: false
                    });

                    return;
                }

                resolve({
                    msg: 'Property Deleted'
                });
            } catch (error: any) {
                reject({
                    msg: 'An error has occurred while deleting property',
                    error: true,
                    errorDetails: error
                });
            }
        });
    }
}