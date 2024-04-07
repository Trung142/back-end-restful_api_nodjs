const poolmysql = require("../config/database");
const db = require("../models");
const { urlreadService, crudCreateService, crudUpdateService, crudDeleteService } = require("../sirvices/urlService");
const ShowServices = async (req, res) => {
    try {
        let message = await urlreadService(req.query);
        return res.status(200).json({
            errCode: message.errCode,
            message: message.errMessage,
            message
        })
    } catch (error) {
        res.status(404).json({
            errCode: 4,
            error
        })
    }
}
//create customers
const CreateServices = async (req, res) => {
    try {
        let message = await crudCreateService(req.body);
        return res.status(200).json({
            errCode: message.errCode,
            message: message.errMessage,
            message
        })
    } catch (error) {
        res.status(404).json({
            errCode: 4,
            error
        })
    }
}
//update Customers
const updateServices = async (req, res) => {
    try {
        let message = await crudUpdateService(req);
        return res.status(200).json({
            errCode: message.errCode,
            message: message.errMessage,
            message
        })
    } catch (error) {
        res.status(404).json({
            errCode: 4,
            error
        })
    }
}
//delete
const deleteServices = async (req, res) => {
    try {
        let message = await crudDeleteService(req);
        return res.status(200).json({
            errCode: message.errCode,
            message: message.errMessage,
            message
        })
    } catch (error) {
        res.status(404).json({
            errCode: 4,
            error
        })
    }
}
module.exports = {
    ShowServices,
    CreateServices,
    updateServices,
    deleteServices
}