import sequelize, { Model } from 'sequelize';
import { DB } from '../config/connection';

import { Category } from '../interfaces/models/models.interface';

export const CategoriesModel = DB.define<Category & Model<Category, Category>>('categories', {
    id_category: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize.STRING(60),
        allowNull: false,
        unique: true
    }
});