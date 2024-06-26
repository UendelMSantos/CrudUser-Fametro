'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  static associate(models) {
      this.belongsTo(models.User, {foreignKey: 'user_id', as: 'user' });
    }
  }
  Address.init({
    street: DataTypes.STRING,
    number: DataTypes.STRING,
    district: DataTypes.STRING,
    city: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};