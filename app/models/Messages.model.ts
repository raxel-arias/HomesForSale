import sequelize, { Model } from 'sequelize';
import { DB } from '../config/connection';

import { Message } from '../interfaces/models/models.interface';

export const MessagesModel = DB.define<Message & Model<Message, Message>>('messages', {
    id_property: {
        type: sequelize.DataTypes.UUID,
        allowNull: false
    },
    id_user: {
        type: sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    message: {
        type: sequelize.DataTypes.TEXT,
        allowNull: false
    }
},{
    timestamps: true
});