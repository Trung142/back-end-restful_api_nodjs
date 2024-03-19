const db = require("../models");
const { urlcreateUser, urlpdateUser, urldeleteUser } = require("../sirvices/urluser");
const { handleUserlogin } = require("../sirvices/userlogin");

//show
const ShowUser = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            let offset = (page - 1) * limit;
            const { count, rows } = await db.User.findAndCountAll({
                offset: +offset,
                limit: +limit
            });
            let totalpage = Math.ceil(count / limit);
            return res.status(201).json({
                message: 'ok',
                total: count,
                totalpage: totalpage,
                data: rows
            })
        }
        const user = await db.User.findAll();
        if (!user) {
            return res.status(200).json('Not found!');
        }
        return res.status(201).json({
            message: 'ok',
            data: user
        })

    } catch (error) {
        return res.status(500).json('loi server');
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
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'error query to server !'
        })
    }
    let userData = await handleUserlogin(email, password);
    console.log(userData);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.User ? userData.User : {}
    })

}
module.exports = {
    ShowUser,
    createUser,
    updateUser,
    deleteUser,
    handlelogin
}