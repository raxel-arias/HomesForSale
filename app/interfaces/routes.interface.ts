import {Router} from 'express';

export interface RouteDeclarator {
    path: string,
    routers: Router[]
}