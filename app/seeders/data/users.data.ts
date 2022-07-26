import { User } from '../../interfaces/models/models.interface';
import Auth from '../../handlers/Auth.handler';

const PRE_USERS: User[] = [
    {
        name: 'RaxelDev',
        email: 'raxel@dev.com',
        password: 'testing123',
        active: 1
    },
    {
        name: 'AdminDev',
        email: 'admin@email.com',
        password: 'admin123',
        active: 1
    }
];

export const generateUsersData = (): Promise<User[]> => {
    return new Promise(async (resolve: (data: User[]) => void, reject: (data: User[]) => void) => {
       if (!PRE_USERS.length) {
        reject([]);
        return;
       } 
        
        let usersList: User[] = [];

        for await (let user of PRE_USERS) {
            const hashedPassword = await Auth.GenHash(user.password);

            user.password = hashedPassword;

            usersList.push(user);
        }

        resolve(usersList);
    });
}