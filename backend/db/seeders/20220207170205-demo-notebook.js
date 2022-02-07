'use strict';

const user = require("../models/notebook");

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**  Add seed commands here.  **/

    return queryInterface.bulkInsert('Notebooks', [
      {
        title: "My Notebook",
        userId: 1,
      },
      {
        title: "New Notebook",
        userId: 1,
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    /**  Add commands to revert seed here.  **/

    return queryInterface.bulkDelete('Notebooks', null, {});
  }
};
