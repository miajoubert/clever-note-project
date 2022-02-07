'use strict';
const { Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Reminder = sequelize.define('Reminder', {
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
    noteId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    time: {
      allowNull: false,
      type: DataTypes.DATE
    },
  }, {});

  Reminder.associate = function (models) {
    Reminder.belongsTo(models.User, { foreignKey: 'userId' });
    Reminder.belongsTo(models.Note, { foreignKey: 'noteId' });
  };

  return Reminder;
};
