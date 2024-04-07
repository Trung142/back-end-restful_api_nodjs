const { where } = require("sequelize");
const db = require("../models");

let urlreadService = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            if (data.page && data.limit) {
                let page = data.page;
                let limit = data.limit;
                let offset = (page - 1) * limit;
                const { count, rows } = await db.Service.findAndCountAll({
                    offset: +offset,
                    limit: +limit,
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
                const user = await db.Service.findAll();
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

let crudCreateService = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            if (data.service_name && data.price) {
                let user = await db.Service.create({
                    service_name: data.service_name,
                    description: data.description,
                    price: data.price,
                })
                userData.errCode = 0;
                userData.errMessage = 'ok';
                userData.insertId = user.id
                resolve(userData)
            } else {
                userData.errCode = 1;
                userData.errMessage = `not found !`;
                resolve(userData);
            }
        } catch (error) {
            reject(error)
        }
    })
}

let Checkid = (insertId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Service.findOne({
                where: {
                    id: insertId
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

let crudUpdateService = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            if (data.body.service_name && data.body.price && data.query.id) {
                let checkid = await Checkid(data.query.id);
                if (checkid) {
                    let row = await db.Service.update(
                        {
                            service_name: data.body.service_name,
                            description: data.body.description,
                            price: data.body.price,
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

let crudDeleteService = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            if (data.query.id) {
                let chekid = Checkid(data.query.id);
                if (chekid) {
                    let user = await db.Service.destroy({
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
module.exports = {
    urlreadService,
    crudCreateService,
    crudUpdateService,
    crudDeleteService
}