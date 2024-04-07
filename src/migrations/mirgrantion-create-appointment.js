'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Appointments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            customer_id: {
                type: Sequelize.INTEGER
            },
            employee_id: {
                type: Sequelize.INTEGER
            },
            service_id: {
                type: Sequelize.INTEGER
            },
            appoinment_date: {
                type: Sequelize.DATE
            },
            start_time: {
                type: Sequelize.TIME
            },
            end_time: {
                type: Sequelize.TIME
            },
            status: {
                type: Sequelize.ENUM('confirmed', 'canceled', 'completed')
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
        await queryInterface.dropTable('Appointments');
    }
};