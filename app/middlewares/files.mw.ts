import multer from 'multer';
import fs from 'fs';
import path from 'path';
import Auth from '../handlers/Auth.handler';
import { Express, Request } from 'express';

//Test
const storage: multer.StorageEngine = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) => {
        callback(null, path.join(__dirname, '../../server/uploads'));
    },
    filename: (req: Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) => {
        callback(null, Auth.GenToken() + path.extname(file.originalname));
    }
});

const fileStorage: multer.StorageEngine = multer.diskStorage({
    destination: async (req: Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) => {
        const id_user: string = req.user.id_user!.toString();
        const {id_property} = req.params;

        const PATH: string = path.join(__dirname, '../../server', id_user, 'uploads');

        if (!fs.existsSync(PATH)) {
            fs.mkdirSync(PATH, {recursive: true});
        } else {
            const files: string[] = fs.readdirSync(PATH);

            files.map((file: string) => {
                fs.unlink(path.join(PATH, file), err => {
                    if (err) throw err;
                });
            })
        }

        callback(null, PATH);
    },
    filename: (req: Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) => {
        callback(null, Auth.GenToken() + path.extname(file.originalname));
    }
});

export const uploader = multer({storage: fileStorage});