const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('data', {
    idx: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    source: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    source_url: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: "url_UNIQUE"
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    author: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    main_text: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'data',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idx" },
        ]
      },
      {
        name: "idx_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idx" },
        ]
      },
      {
        name: "url_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "source_url" },
        ]
      },
    ]
  });
};
