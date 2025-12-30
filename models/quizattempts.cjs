'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class quizAttempts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  quizAttempts.init({
    score: DataTypes.INTEGER,
    passed: DataTypes.BOOLEAN,
    answers: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'quizAttempts',
  });
  return quizAttempts;
};