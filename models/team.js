"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.team.hasMany(models.user_team, {
        sourceKey: "id",
        foreignKey: "team_content_Id",
      });
      models.team.hasMany(models.user, {
        sourceKey: "userId",
        foreignKey: "id",
      });
      // define association here
    }
  }
  team.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      team_region: DataTypes.STRING,
      team_position: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "team",
    }
  );
  return team;
};
