'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
class Service extends Model {
  // static associate(models) {
  //   Service.belongsTo(models.Category);
  // }
}

Service.init({
  name: DataTypes.STRING,
  price: DataTypes.DECIMAL,
  image: DataTypes.STRING,
  category_id: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'Service',
});
return Service
}