"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.user.hasMany(models.user_team, {
        sourceKey: "id",
        foreignKey: "userId",
      });
      models.user.hasMany(models.team, {
        sourceKey: "id",
        foreignKey: "userId",
      });

      // define association here
    }
  }
  user.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      birthday: DataTypes.INTEGER,
      user_region: DataTypes.STRING,
      user_position: DataTypes.STRING,
      user_status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
