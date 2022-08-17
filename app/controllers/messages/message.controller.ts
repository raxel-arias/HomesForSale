import { MessagesModel } from "../../models/Messages.model";
import { PropertiesModel } from "../../models/Properties.model";
import { UsersModel } from '../../models/Users.model';
import { NewMessage, GetMessagesInfo } from '../../interfaces/controllers/message.interface';
import { ResolveResponse, RejectResponse } from "../../interfaces/response.interface";

export class MessageController {
    constructor() {}

    public SendMessageToVendor(data: NewMessage): Promise<ResolveResponse | RejectResponse> {
        return new Promise(async (resolve: (info: ResolveResponse) => void, reject: (reason: RejectResponse) => void) => {
            try {
                const messageCreated = await MessagesModel.create(data);

                resolve({
                    msg: 'Message sent to the vendor',
                    data: {
                        messageCreated
                    }
                });
            } catch (error: any) {
                reject({
                    msg: 'An error has occurred during message creation',
                    error: true,
                    errorDetails: error
                });
            }
        });
    }

    public GetMessagesFromProperty(data: GetMessagesInfo): Promise<ResolveResponse | RejectResponse> {
        return new Promise(async (resolve: (info: ResolveResponse) => void, reject: (reason: RejectResponse) => void) => {
            try {
                const propertyFound = await PropertiesModel.findOne({
                    where: {
                        ...data
                    }
                });

                if (!propertyFound) {
                    reject({
                        msg: 'Property not found',
                        error: false
                    });

                    return;
                }

                const messagesList = await MessagesModel.findAll({
                    where: {
                        ...data
                    },
                    include: [
                        {
                            model: UsersModel, as: 'user',
                            attributes: [
                                'id_user',
                                'name',
                                'email'
                            ]
                        }
                    ],
                    order: [
                        ['createdAt', 'DESC']
                    ]
                });

                resolve({
                    msg: 'Messages list obtained',
                    data: {
                        messagesList
                    }
                });
            } catch (error: any) {
                reject({
                    msg: 'An error has occurred while getting messages',
                    error: true,
                    errorDetails: error
                });
            }
        });
    }
}