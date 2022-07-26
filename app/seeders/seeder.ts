import {exit} from 'node:process';
import { DB } from '../config/connection';

import {
    CategoriesModel,
    UsersModel,
    LocationsModel,
    PropertiesModel
} from '../models/models.module';

import { CATEGORIES } from './data/categories.data';
import { generateUsersData } from './data/users.data';

import { User } from '../interfaces/models/models.interface';

const importData = async () => {
    try {
        await DB.authenticate();

        await DB.sync();

        const USERS: User[] = await generateUsersData();

        await Promise.all([
            CategoriesModel.bulkCreate(CATEGORIES),
            UsersModel.bulkCreate(USERS)
        ]);

        console.log('Generated Data to CATEGORIES Schema');
        console.log('Generated Data to USERS Schema');

        exit(0);
    } catch (error: any) {
        console.error(error);
        exit(1);
    }
}

const deleteData = async () => {
    const deleteTruncateConfig = {
        where: {},
        truncate: true
    }

    try {
        //If we need to delete certains Database Schemas
        //await Promise.all([
        //    await CategoriesModel.destroy(deleteTruncateConfig),
        //]);
        //console.log('Deleted Data from CATEGORIES Schema');

        await DB.sync({force: true});
        console.log('ALL DATABASE DATA HAS BEEN DELETED SUCCESSFULLY');

        exit(0);
    } catch (error: any) {
        console.error(error);
        exit(1);
    }
}

//Detect import glag

if (process.argv.some(flag => flag === '-i')) {
    importData();
}

if (process.argv.some(flag => flag === '-d')) {
    deleteData();
}