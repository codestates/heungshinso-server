var DataTypes = require("sequelize").DataTypes;
var _team = require("./team");
var _user = require("./user");
var _user_team = require("./user_team");

function initModels(sequelize) {
  var team = _team(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var user_team = _user_team(sequelize, DataTypes);

  team.belongsTo(user, { foreignKey: "userId"});
  user.hasMany(team, { foreignKey: "userId"});
  user_team.belongsTo(team, { foreignKey: "team_content_Id"});
  team.hasMany(user_team, { foreignKey: "team_content_Id"});
  user_team.belongsTo(user, { foreignKey: "userId"});
  user.hasMany(user_team, { foreignKey: "userId"});

  return {
    team,
    user,
    user_team,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
