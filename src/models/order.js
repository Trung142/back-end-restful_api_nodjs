'use strict';
const {
    Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Order.init({
        customer_id: DataTypes.INTEGER,
        order_date: DataTypes.DATE,
        total_amount: DataTypes.DECIMAL(10, 2),
        status: DataTypes.ENUM('pending', 'shipped', 'delivered')
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};