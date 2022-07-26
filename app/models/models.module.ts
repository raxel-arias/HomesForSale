import { CategoriesModel } from "./Categories.model";
import { PropertiesModel } from "./Properties.model";
import { UsersModel } from "./Users.model";
import { LocationsModel } from "./Locations.model";

PropertiesModel.belongsTo(CategoriesModel, {
    //property id fk(id_category) in Properties schema
    foreignKey: 'category_type'
});

PropertiesModel.hasOne(LocationsModel, {
    //property id in Locations schema
    foreignKey: 'property'
});

PropertiesModel.belongsTo(UsersModel, {
    foreignKey: 'vendor'
});

export {
    CategoriesModel,
    PropertiesModel,
    LocationsModel,
    UsersModel
}