'use strict';
const {
    Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Service extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Service.init({
        service_name: DataTypes.STRING,
        description: DataTypes.STRING,
        price: DataTypes.DECIMAL(10, 2),
    }, {
        sequelize,
        modelName: 'Service',
    });
    return Service;
};