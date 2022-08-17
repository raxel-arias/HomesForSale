import { NextFunction, Request, Response } from "express";

import { WEB_SERVER } from "../server/server";
import { RouteDeclarations } from "./routes.module";

export default class Routes {
    public constructor() {
        this.EnableCors();
        this.LoadRoutes();
        this.Enable404();
    }

    private LoadRoutes(): void {
        RouteDeclarations.routers.forEach(route => {
            WEB_SERVER.use(RouteDeclarations.path, route);
        });
    }

    private EnableCors(): void {
        WEB_SERVER.use('*', (req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
            res.header("Access-Control-Allow-Headers", "X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    
            next();
        });
    }

    private Enable404(): void {
        WEB_SERVER.use('*', (req: Request, res: Response) => {
            res.redirect('/error/404');
        });
    }
}