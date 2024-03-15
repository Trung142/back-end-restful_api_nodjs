const { json } = require("body-parser");
const poolmysql = require("../configs/database")
//show
const ShowUser = async (req, res) => {
    try {
        let sql = 'select * from Acount';
        const [row, files] = await poolmysql.execute(sql);
        let page = req.query.page;
        let limit = req.query.limit;
        let total = row.length;
        let total_page = Math.ceil(total / limit);
        if (!page || !limit) {
            return res.status(200).json({
                message: 'ok',
                page: page,
                per_page: limit,
                total: total,
                total_page: total_page,
                data: row
            })
        }
        else {
            if (page < 1) {
                page = 1;
            } if (page > total_page) {
                page = total_page;
            }
            let offset = (page - 1) * limit; //so phan tu bo qua
            const [data, files] = await poolmysql.execute(`select * from Acount LIMIT ? OFFSET ?`, [limit, offset]);
            return res.status(200).json({
                message: 'ok',
                page: page,
                per_page: limit,
                total: total,
                total_page: total_page,
                data: data
            })
        }

    } catch (error) {
        return res.status(500).json('loi server');
    }
}
//create
const createUser = async (req, res) => {
    try {
        const values = [
            req.body.name,
            req.body.email,
            req.body.password
        ]
        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(200).json({
                message: 'hay nhap gia tri'
            })
        }
        let sql = `insert into Acount(name,email,password) values(?)`;
        const [row, files] = await poolmysql.query(sql, [values]);
        return res.status(200).json({
            message: 'ok',
            data: row,
            createAt: Date()
        })
    } catch (error) {
        return res.status(500).json('loi server');
    }

}
//update
const updateUser = async (req, res) => {
    try {
        let sql = 'update Acount set name = ?, email = ?, password = ? where id = ?';
        if (!req.body.name || !req.body.email || !req.body.password || !req.params.id) {
            return res.status(200).json({
                message: 'error require server to database'
            })
        }
        const [row, files] = await poolmysql.query(sql, [req.body.name, req.body.email, req.body.password, req.params.id]);
        return res.status(200).json({
            message: 'ok',
            data: row,
            updateAT: Date()
        })
    } catch (error) {
        return res.status(500).json('loi server');
    }

}
//deleteUser
const deleteUser = async (req, res) => {
    try {
        let userid = req.params.id;
        if (!userid) {
            return res.status(200).json({
                message: "error require server to database!"
            })
        }
        let sql = 'delete from Acount where id = ?';
        const [row, files] = await poolmysql.execute(sql, [userid]);
        return res.status(200).json({
            message: 'ok',
            data: row
        })
    } catch (error) {
        return res.status(500).json(error, 'error server');
    }
}
// login
const handlelogin = async (req, res) => {
    try {

        if (!req.body.name || !req.body.password) {
            return res.status(200).json({
                message: 'error query to server !'
            })
        } else {
            let sql = 'select * from Acount where name = ? and password = ?';
            const [row, files] = await poolmysql.query(sql, [req.body.name, req.body.password]);
            if (row == '') {
                return res.status(400).json({
                    message: "Missing password or username"
                })
            }
            return res.status(200).json({
                message: 'ok',
                data: row,
                updateAT: Date()
            })
        }

    } catch (error) {
        return res.status(500).json('loi server', error);
    }
}
module.exports = {
    ShowUser,
    createUser,
    updateUser,
    deleteUser,
    handlelogin
}