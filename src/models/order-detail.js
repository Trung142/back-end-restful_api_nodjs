'use strict';
const {
    Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order_Detail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Order_Detail.init({
        order_id: DataTypes.INTEGER,
        product_id: DataTypes.INTEGER,
        price: DataTypes.DECIMAL(10, 2),
        quantity: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Order_Detail',
    });
    return Order_Detail;
};