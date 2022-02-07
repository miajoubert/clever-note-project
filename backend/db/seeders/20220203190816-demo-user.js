'use strict';
const bcrypt = require('bcryptjs');

const user = require("../models/user");

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**  Add seed commands here.  **/

    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.com',
        username: 'Demo',
        hashedPassword: bcrypt.hashSync('Pass@1')
      },
      {
        email: 'jack@hill.com',
        username: 'JackHill',
        hashedPassword: bcrypt.hashSync('Pass@1')
      },
      {
        email: 'mary@poppins.com',
        username: 'SpoonfulOfSugar',
        hashedPassword: bcrypt.hashSync('Pass@1')
      },
      {
        email: 'jack@pirateslife.com',
        username: 'CaptainSparrow',
        hashedPassword: bcrypt.hashSync('Pass@1')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /**  Add commands to revert seed here.  **/

    return queryInterface.bulkDelete('Users', null, {});
  }
};
