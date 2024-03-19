'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Employee extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Employee.init({
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        phone: DataTypes.STRING,
        address: DataTypes.STRING,
        position: DataTypes.STRING,
        start_date: DataTypes.DATE,
        image: DataTypes.STRING,
        salary: DataTypes.DECIMAL(10, 2)
    }, {
        sequelize,
        modelName: 'Employee',
    });
    return User;
};