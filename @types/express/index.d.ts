import { JWTData } from "../../app/interfaces/auth.interface";
import { Request } from "express";
import { User } from "../../app/interfaces/models/models.interface";

declare module 'express-serve-static-core' {
    interface Request {
        flash: any,
        user: User
    }

    interface Response {
        locals: {
            isPublic?: boolean
        }
    }
}

