import { DataTypes, QueryInterface } from 'sequelize';
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface, Sequelize:typeof DataTypes) {
    await queryInterface.createTable('UserInteractions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      page_number: {
        type: Sequelize.STRING
      },
      title_words_limit: {
        type: Sequelize.STRING
      },
      filter_type: {
        type: Sequelize.STRING
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
  async down(queryInterface:QueryInterface, Sequelize:any) {
    await queryInterface.dropTable('UserInteractions');
  }
};
