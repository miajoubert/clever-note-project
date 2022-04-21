'use strict';

const user = require("../models/reminder");

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**  Add seed commands here.  **/

    return queryInterface.bulkInsert('Reminders', [
      {
        title: "Reminder 1",
        userId: 1,
        noteId: 1,
        time: new Date(),
      },
      {
        title: "Reminder 1",
        userId: 1,
        noteId: 1,
        time: new Date('2022-05-17T17:24:00'),
      },
      {
        title: "Reminder New 2",
        userId: 1,
        noteId: 2,
        time: new Date('2022-04-21T12:20:00'),
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    /**  Add commands to revert seed here.  **/

    return queryInterface.bulkDelete('Reminders', null, {});
  }
};
