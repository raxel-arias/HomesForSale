import sequelize, {Model} from 'sequelize';
import {DB} from '../config/connection';

import { Property } from '../interfaces/models/models.interface';

export const PropertiesModel = DB.define<Property & Model<Property, Property>>('properties', {
    id_property: {
        type: sequelize.DataTypes.UUID,
        defaultValue: sequelize.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: sequelize.STRING(60),
        allowNull: false,
    },
    description: {
        type: sequelize.TEXT,
        allowNull: true
    },
    image: {
        type: sequelize.STRING,
        allowNull: true
    },
    price: {
        type: sequelize.DOUBLE,
        allowNull: false
    },
    bedrooms: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    bathrooms: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    parkings: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    published: {
        type: sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    category_type: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    vendor: {
        type: sequelize.INTEGER,
        allowNull: false
    }
},{
    timestamps: true
});