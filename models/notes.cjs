'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Notes.init({
    title: DataTypes.STRING,
    file_id: DataTypes.STRING,
    bucket_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Notes',
  });
  return Notes;
};