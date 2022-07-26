import sequelize, { Model } from 'sequelize';
import { DB } from '../config/connection';

import { User } from '../interfaces/models/models.interface';

export const UsersModel = DB.define<User & Model<User, User>>('users', {
    id_user: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: sequelize.STRING(40),
    email: sequelize.STRING(60),
    password: sequelize.STRING,
    active: {
        type: sequelize.INTEGER,
        defaultValue: 0
    },
    activationToken: {
        type: sequelize.STRING,
        allowNull: true
    },
    recoveryToken: {
        type: sequelize.STRING,
        allowNull: true
    },
    tokenExp: {
        type: sequelize.STRING,
        allowNull: true
    }
});