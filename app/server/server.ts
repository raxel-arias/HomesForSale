import express, { Application, NextFunction, Request, Response } from 'express';

import cors from 'cors';
import cookies from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';
import csrf from 'csurf';

import path from 'path';

import { DB } from '../config/connection';
import Routes from '../routes/Routes';

export let WEB_SERVER: Application;

export default class Server {
    public constructor() {
        this.WebService();
    }

    private async WebService(): Promise<void> {
        WEB_SERVER = express();

        await this.ConnectDB();
        this.LoadViews();
        this.LoadStaticFiles();
        this.LoadMiddlewares();
        this.LoadRoutes();
        this.StartServer();
    }

    private async LoadModels(): Promise<void> {
        // await import('../models/Users.model');
    }

    private ConnectDB(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.LoadModels();
                const response = await DB.sync();

                console.warn('*************\nDB Loaded\n*************');
                resolve();
            } catch (error: any) {
                console.error(error);
            }
        });
    }

    private LoadViews(): void {
        
        //Load views folder
        WEB_SERVER.set('views', path.join(__dirname, '../views'));
        
        //Set view engine 
        WEB_SERVER.set('view engine', 'pug');
    }

    private LoadStaticFiles(): void {
        WEB_SERVER.use(express.static(path.join(__dirname, '../public')));
    }

    private LoadMiddlewares(): void {
        WEB_SERVER.use(cors());
        
        WEB_SERVER.use(express.urlencoded({extended: true}));
        WEB_SERVER.use(express.json());

        WEB_SERVER.use(cookies());
        WEB_SERVER.use(session({
            secret: 'supersecret',
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 60000
            }
        }));
        WEB_SERVER.use(csrf({cookie: true}));
        WEB_SERVER.use(flash());

        //Functions 
        WEB_SERVER.use((req: Request, res: Response, next: NextFunction) => {
            next();
        });
    }

    private LoadAuthConfiguration(): void {

    }

    private LoadRoutes(): void {
        const routes: Routes = new Routes();
    }

    private StartServer(): void {
        const PORT: any = process.env.PORT || 3200;
        const HOST: string = process.env.HOST || '0.0.0.0';    

        WEB_SERVER.listen(PORT, HOST, () => {
            console.log(`SERVER STARTED --> ${HOST}:${PORT}`);
        });
    }
}