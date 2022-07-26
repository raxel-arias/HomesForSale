import sequelize, { Model } from 'sequelize';
import { DB } from '../config/connection';

import { Location } from '../interfaces/models/models.interface';

export const LocationsModel = DB.define<Location & Model<Location, Location>>('locations', {
    property: {
        type: sequelize.DataTypes.UUID,
        primaryKey: true
    },
    address: {
        type: sequelize.STRING,
        allowNull: false
    },
    latitude: {
        type: sequelize.STRING(80),
        allowNull: false
    },
    longitude: {
        type: sequelize.STRING(80),
        allowNull: false
    }
});