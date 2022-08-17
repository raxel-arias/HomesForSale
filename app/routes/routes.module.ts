import { RouteDeclarator } from "../interfaces/routes.interface";

import { AuthRouter } from "./auth/auth.routes";
import { MessagesRouter } from "./messages/messages.routes";
import { MiscellaneousRouter } from "./miscellaneous/miscellaneous.routes";
import { PropertiesRouter } from "./properties/properties.routes";
import { AuthViewsRouter } from "./views/auth-views.routes";
import { MessagesViewsRouter } from "./views/message-views.routes";
import { PropertiesManagementViewsRouter } from "./views/properties-management-views.routes";
import { PropertiesViewRouter } from "./views/properties-views.routes";

export const RouteDeclarations: RouteDeclarator = {
    path: '',
    routers: [
        AuthViewsRouter,
        AuthRouter,
        PropertiesViewRouter,
        PropertiesManagementViewsRouter,
        PropertiesRouter,
        MessagesRouter,
        MessagesViewsRouter,
        MiscellaneousRouter
    ]
}