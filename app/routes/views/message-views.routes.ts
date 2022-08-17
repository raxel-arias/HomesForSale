import { Router } from 'express';
import { JWT } from '../../handlers/Auth.handler';
import { ValidatePropertyExistence } from '../../middlewares/properties/properties.mw';
import { ShowMessagesView } from '../../middlewares/views/messages/messages-views.mw';

export const MessagesViewsRouter: Router = Router();

const MessagesViewsRouterChilds: Router = Router({mergeParams: true});

MessagesViewsRouter.use('/contacts', JWT.ValidateJWT, MessagesViewsRouterChilds);

MessagesViewsRouterChilds.get('/messages/:id_property', ValidatePropertyExistence, ShowMessagesView);