const db = require("../models");
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const urlreadCustomer = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            if (data.page && data.limit) {
                let page = data.page;
                let limit = data.limit;
                let offset = (page - 1) * limit;
                const { count, rows } = await db.Customer.findAndCountAll({
                    offset: +offset,
                    limit: +limit,
                    attributes: ["id", "username", "email", "phone", "address", "image", "createdAt", "updatedAt"]
                });
                if (!rows) {
                    userData.errCode = 2;
                    userData.errMessage = 'not found!';
                    resolve(userData);
                } else {
                    let totalpage = Math.ceil(count / limit);
                    userData.errCode = 0;
                    userData.errMessage = 'ok';
                    userData.total = count;
                    userData.totalpage = totalpage;
                    userData.User = rows;
                    resolve(userData);
                }

            } else {
                const user = await db.Customer.findAll({
                    attributes: ["id", "username", "email", "phone", "address", "image", "createdAt", "updatedAt"]
                });
                if (!user) {
                    userData.errCode = 1;
                    userData.errMessage = 'not found!';
                    resolve(userData);
                } else {
                    userData.errCode = 0;
                    userData.errMessage = 'ok';
                    userData.User = user;
                    resolve(userData);
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}
const urlcreateCustomer = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            if (!data.email || !data.phone) {
                userData.errCode = 1;
                userData.errMessage = `not found !`;
                resolve(userData);
            } else {
                let isXit = await checkEmail(data.email);
                if (isXit) {
                    userData.errCode = 2;
                    userData.errMessage = `Email already exists! please create other email!`;
                    resolve(userData);
                } else {
                    let password = data.password && await hashpassword(data.password);
                    let user = await db.Customer.create({
                        username: data.username,
                        email: data.email,
                        password: password,
                        phone: data.phone,
                        address: data.address,
                        image: data.image
                    })
                    userData.errCode = 0;
                    userData.errMessage = 'ok';
                    userData.insertId = user.id
                    resolve(userData)
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}
let hashpassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashSync = await bcrypt.hashSync(password, salt);
            resolve(hashSync);
        } catch (error) {
            reject(error);
        }
    })
}
let checkEmail = (useremail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Customer.findOne({
                where: {
                    email: useremail
                }
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    })
}
//get read in orm sequelize
const urlpdateCustomer = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            if (!data.body.username || !data.body.email || !data.query.id) {
                userData.errCode = 1;
                userData.errMessage = `not found !`;
                resolve(userData);
            } else {

                let check = await checkId(data.query.id);
                if (check) {
                    let isXit = await checkEmail(data.body.email);
                    if (isXit) {
                        userData.errCode = 3;
                        userData.errMessage = `Email already exists! please create other email!`;
                        resolve(userData);
                    } else {
                        let user = await db.Customer.findOne({
                            where: {
                                id: data.query.id
                            },
                            raw: true
                        })
                        if (user) {
                            let password = hashpassword(data.body.address);
                            let row = await db.Customer.update(
                                {
                                    username: data.body.username,
                                    email: data.body.email,
                                    password: data.body.password ? password : user.password,
                                    phone: data.body.phone,
                                    address: data.body.address
                                },
                                {
                                    where: {
                                        id: data.query.id
                                    }
                                })
                            userData.errCode = 0;
                            userData.errMessage = 'ok';
                            userData.User = row;
                            resolve(userData);
                        } else {
                            userData.errCode = 3;
                            userData.errMessage = `error !`
                            resolve(userData);
                        }
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `your id ist's exit in your sytems! please try other id !`
                    resolve(userData);
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}
//delete sequelize 
const urldeleteCustomer = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            if (data.query.id) {
                let check = await checkId(data.query.id);
                if (check) {
                    let user = await db.Customer.destroy({
                        where: {
                            id: data.query.id
                        }
                    })
                    userData.errCode = 0;
                    userData.errMessage = 'ok';
                    userData.User = user;
                    resolve(userData);
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `your id ist's exit in your sytems! please try other id !`;
                    resolve(userData);
                }

            } else {
                userData.errCode = 1;
                userData.errMessage = `not found !`;
                resolve(userData);
            }
        } catch (error) {
            reject(error);
        }
    })
}
const checkId = (userid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Customer.findOne({
                where: {
                    id: userid
                }
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error)
        }

    })
}
module.exports = {
    urlcreateCustomer,
    urlpdateCustomer,
    urldeleteCustomer,
    urlreadCustomer
}