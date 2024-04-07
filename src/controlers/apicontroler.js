const db = require("../models");
const { urlcreateUser, urlpdateUser, urldeleteUser, urlreadUser } = require("../sirvices/urluser");
const { handleUserlogin } = require("../sirvices/userlogin");

//show
const ShowUser = async (req, res) => {
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
//create
const createUser = async (req, res) => {
    try {
        let message = await urlcreateUser(req.body);
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
const updateUser = async (req, res) => {
    try {
        let message = await urlpdateUser(req)
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
//deleteUser
const deleteUser = async (req, res) => {
    try {
        let message = await urldeleteUser(req);
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
    ShowUser,
    createUser,
    updateUser,
    deleteUser,
    handlelogin
}