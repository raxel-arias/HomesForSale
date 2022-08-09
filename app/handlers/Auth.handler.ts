import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { AuthController } from '../controllers/auth/auth.controller';
import { JWTData } from '../interfaces/auth.interface';
import { User } from '../interfaces/models/models.interface';

import dotenv from 'dotenv';
import { ResolveResponse } from '../interfaces/response.interface';
dotenv.config();

export default class Auth {
    constructor() {}

    public static GenHash(data: string): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                const hashedData: string = bcrypt.hashSync(data, bcrypt.genSaltSync(10));

                resolve(hashedData);
            } catch (error) {
                reject(error);
            }
        });
    }

    public static CompareHash(data: string, hashed: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const isValid: boolean = bcrypt.compareSync(data, hashed);
                
                resolve(isValid);
            } catch (error) {
                reject(error);
            }
        });
    }

    public static GenToken(): string {
        return crypto.randomBytes(20).toString('hex');
    }

}

export class JWT {
    constructor() {}

    public static GenJWT(data: JWTData): Promise<string> {
        return new Promise( async (resolve, reject) => {
            try {
                const token: string = jwt.sign(
                    data,
                    process.env.JWT_SECRET!,
                    {
                        expiresIn: '7d'
                    }
                );
    
                resolve(token);

            } catch (error: any) {
                reject(error);
            }
        });
    }

    public static async ValidateJWT(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {_homesforsale} = req.cookies;

            if (!_homesforsale) {
                if (!res.locals.isPublic) return res.redirect('/auth-view/login');

                return next();
            }

            const {id_user}: JWTData = <JWTData>jwt.verify(_homesforsale, <string>process.env.JWT_SECRET);

            let {data: {user}}: ResolveResponse = await new AuthController().GetUserData(Number(id_user));
            
            req.user = user;

            next();
        } catch (error: any) {
            if (error.msg) {
                req.flash('req-error', error);
            }
            res.clearCookie('_homesforsale').redirect('/auth-view/login');
        }
    }
}