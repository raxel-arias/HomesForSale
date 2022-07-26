import { exit } from 'node:process';
import { DB } from '../config/connection';

import {
    CategoriesModel,
    UsersModel,
    LocationsModel,
    PropertiesModel
} from '../models/models.module';

import { CATEGORIES } from './categories.data';
import { generateUsersData } from './users.data';

import { User } from '../interfaces/models/models.interface';

const generateData = async () => {
    try {
        await DB.authenticate();

        await DB.sync();

        //Generating USERS DATA
        const USERS: User[] = await generateUsersData();        

        await Promise.all([
            CategoriesModel.bulkCreate(CATEGORIES),
            UsersModel.bulkCreate(USERS)
        ]); 
        
        console.log('Generated Data to CATEGORIES Schema');
        console.log('Generated Data to USERS Schema');

        exit(0);
    } catch (error: any) {
        console.log(error);
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

        //Erase all Database DATA
        await DB.sync({force: true});
        console.log('All DATABASE DATA ERASED SUCCESSFULLY');

        exit(0);
    } catch (error: any) {
        console.log(error);
        exit(1);
    }
}

//Detect Import flag
if (process.argv.some(flag => flag === '-i')) {    
    generateData();
}

if (process.argv.some(flag => flag === '-d')) {
    deleteData();
}