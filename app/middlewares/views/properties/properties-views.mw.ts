import { Request, Response } from "express";
import { User } from '../../../interfaces/models/models.interface';

export const ShowIndexView = async (req: Request, res: Response): Promise<void> => {
    const user: User = <User>req.user;

    res.render('private/index', {
        title: 'Index',
        subtitle: 'Hi',
        user
    });
}
