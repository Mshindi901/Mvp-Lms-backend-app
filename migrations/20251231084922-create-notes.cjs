'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lessona_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Lessons',
          key: 'id'
        },
        allowNull: false
      },
      title: {
        type: Sequelize.STRING
      },
      file_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      bucket_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Notes');
  }
};