const { where } = require("sequelize");
const db = require("../models");

let urlreadProduct = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            if (data.page && data.limit) {
                let page = data.page;
                let limit = data.limit;
                let offset = (page - 1) * limit;
                const { count, rows } = await db.Product.findAndCountAll({
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
                    delete rows.password;
                    resolve(userData);
                }

            } else {
                const user = await db.Product.findAll();
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

let crudCreateProduct = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            if (data.product_name && data.price) {
                let user = await db.Product.create({
                    product_name: data.product_name,
                    description: data.description,
                    price: data.price,
                    aquantity: data.aquantity
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
            let user = await db.Product.findOne({
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

let crudUpdateProduct = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            if (data.body.product_name && data.body.price && data.query.id) {
                let checkid = await Checkid(data.query.id);
                if (checkid) {
                    let row = await db.Product.update(
                        {
                            product_name: data.body.product_name,
                            description: data.body.description,
                            price: data.body.price,
                            aquantity: data.body.aquantity
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

let crudDeleteProduct = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            if (data.query.id) {
                let chekid = Checkid(data.query.id);
                if (chekid) {
                    let user = await db.Product.destroy({
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
    urlreadProduct,
    crudCreateProduct,
    crudUpdateProduct,
    crudDeleteProduct
}