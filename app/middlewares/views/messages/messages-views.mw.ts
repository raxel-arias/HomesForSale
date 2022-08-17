import { Request, Response } from 'express';
import { MessageController } from '../../../controllers/messages/message.controller';
import { formatDate } from '../../../utils/dates.utils';
import { Message, Property, User } from '../../../interfaces/models/models.interface';
import { ResolveResponse } from '../../../interfaces/response.interface';

export const ShowMessagesView = async (req: Request, res: Response): Promise<void> => {
    const user: User = <User> req.user;
    const property: Property = <Property> res.locals.property;

    try {
        const messagesList: Message[] = <Message[]>(<ResolveResponse> await new MessageController().GetMessagesFromProperty({id_property: property.id_property!})).data.messagesList;
        
        res.render('management/messages', {
            user,
            title: 'Messages',
            subtitle: `Messages to ${property.title}`,
            messagesList,

            formatDate
        });
    } catch (error: any) {
        req.flash('req-error', error);

        res.redirect('/me');
    }
}