const Sequelize = require('sequelize');
const DataTypes = require('sequelize')
const sequelize = new Sequelize('mydb',null,null,{dialect:'sqlite',storage:'database.db'});
const User = require("../models/user")(sequelize,DataTypes);
const Category = require('../models/category')(sequelize,DataTypes)
const Service = require('../models/service')(sequelize,DataTypes);


    Service.belongsTo(Category, {foreignKey:"category_id"});

    Category.hasMany(Service, {foreignKey:"category_id"});



module.exports = {
    User, Category, Service 
}
