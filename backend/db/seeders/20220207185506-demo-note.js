'use strict';
const bcrypt = require('bcryptjs');

const user = require("../models/note");

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**  Add seed commands here.  **/

    return queryInterface.bulkInsert('Notes', [
      {
        title: "New Note",
        userId: 1,
        notebookId: 1,
        content: "I'm trying out Clevernote!"
      },
      {
        title: "Notebook note",
        userId: 1,
        notebookId: 1,
        content: "I'm trying out Clevernote Notebooks!"
      },
      {
        title: "Another notebook note",
        userId: 1,
        notebookId: 1,
        content: "So many notes!"
      },
      {
        title: "More notebook notes",
        userId: 1,
        notebookId: 2,
        content: "So many notes!"
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    /**  Add commands to revert seed here.  **/

    return queryInterface.bulkDelete('Notes', null, {});
  }
};
