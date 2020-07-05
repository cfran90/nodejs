'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('groups_permissions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      group_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'groups', key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      permission_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'permissions', key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: (queryInterface) => {
      return queryInterface.dropTable('groups_permissions');
  }
};
