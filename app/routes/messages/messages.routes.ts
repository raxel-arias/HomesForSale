import { Router } from 'express';
import { JWT } from '../../handlers/Auth.handler';
import { SendMessageToVendor } from '../../middlewares/messages/messages.mw';
import { MessageValidator } from '../../validations/message.validator';

export const MessagesRouter: Router = Router();

const MessagesRouterChilds: Router = Router({mergeParams: true});

MessagesRouter.use('/messages', JWT.ValidateJWT, MessagesRouterChilds);

MessagesRouterChilds.post('/contact/:id_property', MessageValidator.SendMessage, SendMessageToVendor);