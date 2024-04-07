const db = require("../models");
const { urlcreateCustomer, urlpdateCustomer, urldeleteCustomer } = require("../sirvices/urlvalues");
const { handleUserlogin } = require("../sirvices/userlogin");
const ShowCustomer = async (req, res) => {
    try {
        let message = await urlreadUser(req.query);
        return res.status(200).json({
            errCode: message.errCode,
            message: message.errMessage,
            message
        })
    } catch (error) {
        return res.status(404).json({
            errCode: 4,
            error
        });
    }
}
//create customers
const CreateCustomers = async (req, res) => {
    try {
        let message = await urlcreateCustomer(req.body);
        return res.status(200).json({
            errCode: message.errCode,
            message: message.errMessage,
            message
        })
    } catch (error) {
        res.status(404).json({
            errCode: 4,
            error
        });
    }
}
//update
const updateCustomers = async (req, res) => {
    try {
        let message = await urlpdateCustomer(req)
        return res.status(200).json({
            errCode: message.errCode,
            message: message.errMessage,
            message
        })
    } catch (error) {
        return res.status(404).json({
            errCode: 4,
            error
        });
    }

}
//deleteCustomer
const deleteCustomers = async (req, res) => {
    try {
        let message = await urldeleteCustomer(req);
        return res.status(200).json({
            errCode: message.errCode,
            message: message.errMessage,
            message
        })
    } catch (error) {
        return res.status(404).json({
            errCode: 4,
            error
        });
    }
}
// login
const handlelogin = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        if (!email || !password) {
            return res.status(500).json({
                errCode: 1,
                message: 'error query to server !'
            })
        }
        let userData = await handleUserlogin(email, password);
        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage,
            user: userData.User ? userData.User : {}
        })
    } catch (error) {
        return res.status(404).json({
            errCode: 4,
            error
        });
    }


}
module.exports = {
    ShowCustomer,
    CreateCustomers,
    updateCustomers,
    deleteCustomers
}