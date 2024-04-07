'use strict';
const {
    Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Feedback extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Feedback.init({
        appointment_id: DataTypes.INTEGER,
        rating: DataTypes.INTEGER,
        comment: DataTypes.TEXT,
        feedback_date: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Feedback',
    });
    return Feedback;
};