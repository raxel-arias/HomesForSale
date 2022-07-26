import { User } from "../interfaces/models/models.interface";
import Auth from '../handlers/Auth.handler';

const PRE_USERS: User[] = [
    {
        name: 'RaxelDev',
        email: 'raxel@dev.com',
        password: 'raxelito',
        active: 1
    },
    {
        name: 'AdminTesting',
        email: 'admin@testing.com',
        password: 'admin123',
        active: 1
    }
];

export const generateUsersData = (): Promise<User[]> => {
    return new Promise(async (resolve: (data: User[]) => void, reject: (data: User[]) => void) => {
        let usersList: User[] = [];

        PRE_USERS.forEach(async (user: User) => {
            const hashedPassword = await Auth.GenHash(user.password);

            user.password = hashedPassword;

            usersList.push(user);
        });

        resolve(usersList);
    });
}