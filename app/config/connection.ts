import { Sequelize } from "sequelize";

import { DBConfig } from "./db.config";

export const DB: Sequelize = new Sequelize(DBConfig.NAME, DBConfig.USER, DBConfig.PASSWORD, {
    host: DBConfig.HOST,
    dialect: 'mysql',
    operatorsAliases: {},
    define: {timestamps: false},
    pool: DBConfig.POOL
});