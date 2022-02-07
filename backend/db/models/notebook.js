'use strict';
const { Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define('Notebook', {
    title: {
      allowNull: false,
      type: DataTypes.STRING(30),
      validate: {
        len: [1, 30]
      }
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});

  Notebook.associate = function (models) {
    Notebook.belongsTo(models.User, { foreignKey: 'userId' });
    Notebook.hasMany(models.Note, { foreignKey: 'notebookId' });
  };

  return Notebook;
};
