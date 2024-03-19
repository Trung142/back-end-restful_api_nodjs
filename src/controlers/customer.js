const poolmysql = require("../config/database")
const ShowCustomer = async (req, res) => {
    try {
        const [row, files] = await poolmysql.execute('select * from Customers');
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
        const [data] = await poolmysql.execute('select * from Customers limit ? offset ?', [limit, offset])
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
const CreateCustomers = async (req, res) => {
    try {
        let { first_name, last_name, phone, email, address } = req.body;
        let sql = 'insert into Customers(first_name,last_name,phone_number,email,address) values(?,?,?,?,?)';
        if (!first_name || !phone) {
            return res.status(200).json({
                message: "dont's input values !"
            })
        }
        const [row, files] = await poolmysql.query(sql, [first_name, last_name, phone, email, address]);
        return res.status(200).json({
            message: 'ok ',
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
const updateCustomers = async (req, res) => {
    try {
        let { first_name, last_name, phone, email, address } = req.body;
        let userid = req.query.id;
        console.log(userid)
        if (!last_name || !phone || !userid) {
            return res.status(200).json({
                message: 'not input values update !'
            })
        }
        let sql = `update Customers set first_name = ?, last_name = ?, phone_number = ?, email = ?, address = ? where customer_id = ?`;
        const [row, files] = await poolmysql.query(sql, [first_name, last_name, phone, email, address, userid]);
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
const deleteCustomers = async (req, res) => {
    try {
        let userid = req.query.id;
        if (!userid) {
            return res.status(200).json({
                message: 'id null'
            })
        }
        const [row, files] = await poolmysql.query(`delete from Customers where customer_id = ?`, [userid]);
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
    ShowCustomer,
    CreateCustomers,
    updateCustomers,
    deleteCustomers
}