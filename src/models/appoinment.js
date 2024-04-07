'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Appointment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Appointment.init({
        customer_id: DataTypes.INTEGER,
        employee_id: DataTypes.INTEGER,
        service_id: DataTypes.INTEGER,
        appoinment_date: DataTypes.DATE,
        start_time: DataTypes.TIME,
        end_time: DataTypes.TIME,
        status: DataTypes.ENUM('confirmed', 'canceled', 'completed')
    }, {
        sequelize,
        modelName: 'Appointment',
    });
    return Appointment;
};