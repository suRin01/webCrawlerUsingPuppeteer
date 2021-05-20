var DataTypes = require("sequelize").DataTypes;
var _comments = require("./comments");
var _data = require("./data");

function initModels(sequelize) {
  var comments = _comments(sequelize, DataTypes);
  var data = _data(sequelize, DataTypes);


  return {
    comments,
    data,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
