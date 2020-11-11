"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.user_team.hasMany(models.team, {
        sourceKey: "team_content_Id",
        foreignKey: "id",
      });
      models.user_team.hasMany(models.user, {
        sourceKey: "userId",
        foreignKey: "id",
      });
      // define association here
    }
  }
  user_team.init(
    {
      userId: DataTypes.INTEGER,
      team_content_Id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "user_team",
    }
  );
  return user_team;
};
