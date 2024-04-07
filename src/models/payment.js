'use strict';
const {
    Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Payment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Payment.init({
        appointment_id: DataTypes.INTEGER,
        payment_date: DataTypes.DATE,
        amount: DataTypes.DECIMAL(10, 2),
        payment_method: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Payment',
    });
    return Payment;
};