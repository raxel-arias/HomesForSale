import { Request, Response } from 'express';
import { User } from '../../interfaces/models/models.interface';

export const Redirect = (req: Request, res: Response): void => {
    res.redirect('/app/index');
}

export const Show404View = (req: Request, res: Response): void => {
    const user: User = <User> req.user;

    res.render('public-view/404', {
        title: 'Not found',
        subtitle: '404',
        index: true,
        user
    });
}