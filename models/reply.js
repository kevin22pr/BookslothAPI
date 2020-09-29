'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reply.belongsTo(models.Message, {
        foreignKey: 'message_id'
      })
    }
  };
  Reply.init({
    message_id: DataTypes.INTEGER,
    message: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    photo: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Reply',
  });
  return Reply;
};