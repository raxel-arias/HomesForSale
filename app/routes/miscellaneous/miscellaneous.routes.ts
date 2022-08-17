import { Router } from 'express';
import { JWT } from '../../handlers/Auth.handler';
import { Redirect, Show404View } from '../../middlewares/miscellaneous/miscellaneous.mw';
import { SetViewAsPublic } from '../../middlewares/views/auth/auth-views.mw';

export const MiscellaneousRouter: Router = Router();

const MiscellaneousRouterChilds: Router = Router({mergeParams: true});

MiscellaneousRouter.use('/', MiscellaneousRouterChilds);

MiscellaneousRouterChilds.get('/', Redirect);
MiscellaneousRouterChilds.get('/app', Redirect);
MiscellaneousRouterChilds.get('/error/404', SetViewAsPublic, JWT.ValidateJWT, Show404View);