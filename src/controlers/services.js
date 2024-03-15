const poolmysql = require("../configs/database")
const ShowServices = async (req, res) => {
    try {
        const [row, files] = await poolmysql.execute('select * from Services');
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
        const [data] = await poolmysql.execute('select * from Services limit ? offset ?', [limit, offset])
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
const CreateServices = async (req, res) => {
    try {
        let { service_name, description, price } = req.body;
        let sql = 'insert into Services(service_name,description,price) values(?,?,?)';
        if (!service_name || !price) {
            return res.status(200).json({
                message: "dont's input values !"
            })
        }
        const [row, files] = await poolmysql.query(sql, [service_name, description, price]);
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
const updateServices = async (req, res) => {
    try {
        let { service_name, description, price } = req.body;
        let userid = req.query.id;
        if (!service_name || !price || !userid) {
            return res.status(200).json({
                message: 'not input values update !'
            })
        }
        let sql = `update Services 
        set service_name = ?,description = ?,price = ? where service_id = ?`;
        const [row, files] = await poolmysql.query(sql, [service_name, description, price, userid]);
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
const deleteServices = async (req, res) => {
    try {
        let userid = req.query.id;
        console.log(userid);
        if (!userid) {
            return res.status(200).json({
                message: 'id null'
            })
        }
        const [row, files] = await poolmysql.query(`delete from Services where service_id = ?`, [userid]);
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
    ShowServices,
    CreateServices,
    updateServices,
    deleteServices
}