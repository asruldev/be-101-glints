const model = require("../models");

const { Role } = model;

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    await Role.bulkCreate([
      { name: "Super Admin" },
      { name: "Admin" },
      { name: "Authenticated" },
    ]);

  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await Role.destroy();
  },
};