const poolmysql = require("../config/database");
const { urlreadProduct, crudCreateProduct, crudUpdateProduct, crudDeleteProduct } = require("../sirvices/urlProduct");
// bảng sản phẩm
const ShowProducts = async (req, res) => {
    try {
        let message = await urlreadProduct(req.query);
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
const CreateProducts = async (req, res) => {
    try {
        let message = await crudCreateProduct(req.body);
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
const updateProducts = async (req, res) => {
    try {
        let message = await crudUpdateProduct(req);
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
const deleteProducts = async (req, res) => {
    try {
        let message = await crudDeleteProduct(req);
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
    ShowProducts,
    CreateProducts,
    updateProducts,
    deleteProducts
}