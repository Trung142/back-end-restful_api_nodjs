const db = require("../models");
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const urlcreateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            if (!data.email || !data.password) {
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
                    let password = await hashpassword(data.password);
                    await db.User.create({
                        username: data.name,
                        email: data.email,
                        password: password,
                        image: data.image
                    })
                    userData.errCode = 0;
                    userData.errMessage = 'ok';
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
            let user = await db.User.findOne({
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
const urlpdateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            if (!data.body.name || !data.body.email || !data.body.password || !data.query.id) {
                userData.errCode = 1;
                userData.errMessage = `not found !`;
                resolve(userData);
            } else {
                let check = await checkId(data.query.id);
                if (check) {
                    let row = await db.User.update(
                        {
                            username: data.body.name,
                            email: data.body.email,
                            password: data.body.password,
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
const urldeleteUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            if (data.query.id) {
                let check = await checkId(data.query.id);
                if (check) {
                    let user = await db.User.destroy({
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
            let user = await db.User.findOne({
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
    urlcreateUser,
    urlpdateUser,
    urldeleteUser
}