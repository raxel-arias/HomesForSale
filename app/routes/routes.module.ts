import { RouteDeclarator } from "../interfaces/routes.interface";

import { AuthRouter } from "./auth/auth.routes";
import { PropertiesRouter } from "./properties/properties.routes";
import { AuthViewsRouter } from "./views/auth-views.routes";
import { PropertiesManagementViewsRouter } from "./views/properties-management-views.routes";
import { PropertiesViewRouter } from "./views/properties-views.routes";

export const RouteDeclarations: RouteDeclarator = {
    path: '',
    routers: [
        AuthViewsRouter,
        AuthRouter,
        PropertiesViewRouter,
        PropertiesManagementViewsRouter,
        PropertiesRouter
    ]
}