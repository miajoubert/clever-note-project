'use strict';
const { Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
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
    },
    notebookId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    content: {
      allowNull: true,
      type: DataTypes.TEXT,
      defaultValue: "New note..."
    }
  }, {});

  Note.associate = function (models) {
    Note.belongsTo(models.User, { foreignKey: 'userId' });
    Note.belongsTo(models.Notebook, { foreignKey: 'notebookId' })
  };

  return Note;
};
