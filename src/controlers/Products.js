const poolmysql = require("../config/database")
// bảng sản phẩm
const ShowProducts = async (req, res) => {
    try {
        const [row, files] = await poolmysql.execute('select * from Products');
        let page = req.query.page;
        let limit = req.query.limit;
        let total = row.length;
        let total_page = Math.ceil(total / limit);
        if (!page || !limit) {
            return res.status(200).json({
                message: 'ok',
                total: total,
                total_page: total_page,
                data: row
            })
        }
        if (page < 1) {
            page = 1;
        }
        if (page > total_page) {
            page = total_page;
        }
        const offset = (page - 1) * limit;
        const [data] = await poolmysql.execute('select * from Products limit ? offset ?', [limit, offset])
        return res.status(200).json({
            message: 'ok',
            page: page,
            per_page: limit,
            total: total,
            total_page: total_page,
            data: data
        })

    } catch (error) {
        return res.status(500).json({
            message: 'error server!',
            error: error
        })
    }

}
//create customers
const CreateProducts = async (req, res) => {
    try {
        let { product_name, description, price, quatily } = req.body;
        let sql = 'insert into Products(product_name,description,price,quantity_in_stock) values(?,?,?,?)';
        if (!product_name || !description || !price) {
            return res.status(200).json({
                message: 'not input values update !'
            })
        }
        const [row, files] = await poolmysql.query(sql, [product_name, description, price, quatily]);
        return res.status(200).json({
            message: 'ok',
            data: row,
            CreateAT: Date()
        })
    } catch (error) {
        return res.status(500).json({
            message: 'error server !',
            error: error
        })
    }

}
//update Customers
const updateProducts = async (req, res) => {
    try {
        let { first_name, last_name, phone, email, address, position, start_date, salary } = req.body;
        let userid = req.query.id;
        if (!last_name || !phone || !userid) {
            return res.status(200).json({
                message: 'not input values update !'
            })
        }
        let sql = `update Products
        set first_name = ?, last_name = ?, phone_number = ?, email = ?, address = ?, position = ?,start_date = ?,salary = ? where employee_id = ?`;
        const [row, files] = await poolmysql.query(sql, [first_name, last_name, phone, email, address, position, start_date, salary, userid]);
        return res.status(200).json({
            message: 'ok',
            data: row,
            updateAt: Date()
        })
    } catch (error) {
        return res.status(500).json({
            message: 'error server !',
            error: error
        })
    }
}
//delete
const deleteProducts = async (req, res) => {
    try {
        let userid = req.query.id;
        if (!userid) {
            return res.status(200).json({
                message: 'id null'
            })
        }
        const [row, files] = await poolmysql.query(`delete from Products where product_id = ?`, [userid]);
        return res.status(200).json({
            message: 'ok',
            data: row,
            deleteAt: Date()
        })
    } catch (error) {
        return res.status(500).json({
            message: 'error server !',
            error: error
        })
    }
}
module.exports = {
    ShowProducts,
    CreateProducts,
    updateProducts,
    deleteProducts
}