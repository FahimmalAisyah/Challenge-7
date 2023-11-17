module.exports = {
  async up(queryInterface, Sequelize) {
    const names = ['CUSTOMER', 'ADMIN'];
    const timestamp = new Date();
    const records = names.map((name) => {
      return {
        name,
        createdAt: timestamp,
        updatedAt: timestamp,
      };
    });

    await queryInterface.bulkInsert('Roles', records, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
