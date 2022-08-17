import { CategoriesModel } from "./Categories.model";
import { PropertiesModel } from "./Properties.model";
import { UsersModel } from "./Users.model";
import { LocationsModel } from "./Locations.model";
import { MessagesModel } from './Messages.model';

PropertiesModel.belongsTo(CategoriesModel, {
    //property id fk(id_category) in Properties schema
    foreignKey: 'category_type'
});

PropertiesModel.hasOne(LocationsModel, {
    //property id in Locations schema
    foreignKey: 'property'
});

PropertiesModel.belongsTo(UsersModel, {
    //property vendor = id_user in Users schema
    foreignKey: 'vendor'
});

MessagesModel.belongsTo(UsersModel, {
    //property vendor = id_user in Users schema
    foreignKey: 'id_user'
});

PropertiesModel.hasMany(MessagesModel, {
    //property id_property in Messages schema
    foreignKey: 'id_property'
});

MessagesModel.belongsTo(PropertiesModel, {
    //property id_property in Properties schema
    foreignKey: 'id_property'
});

export {
    CategoriesModel,
    PropertiesModel,
    LocationsModel,
    UsersModel,
    MessagesModel
}