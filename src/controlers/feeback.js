const poolmysql = require("../configs/database")
//bảng phàn hồi
const ShowFeedbacks = async (req, res) => {
    try {
        const [row, files] = await poolmysql.execute('select * from Feedbacks');
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
        const [data] = await poolmysql.execute('select * from Feedbacks limit ? offset ?', [limit, offset])
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
const CreateFeedbacks = async (req, res) => {
    try {
        let { first_name, last_name, phone, email, address, position, start_date, salary } = req.body;
        let values = [
            req.body.first_name,
            req.body.last_name,
            req.body.phone,
            req.body.email,
            req.body.address,
            req.body.position,
            req.body.start_date,
            req.body.salary
        ]
        let sql = 'insert into Feedbacks(first_name, last_name, phone_number, email, address, position, start_date, salary) values(?,?,?,?,?,?,?,?)';
        if (!last_name || !phone) {
            return res.status(200).json({
                message: "dont's input values !"
            })
        }
        const [row, files] = await poolmysql.query(sql, [first_name, last_name, phone, email, address, position, start_date, salary]);
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
const updateFeedbacks = async (req, res) => {
    try {
        let { first_name, last_name, phone, email, address, position, start_date, salary } = req.body;
        let userid = req.query.id;
        if (!last_name || !phone || !userid) {
            return res.status(200).json({
                message: 'not input values update !'
            })
        }
        let sql = `update Feedbacks 
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
const deleteFeedbacks = async (req, res) => {
    try {
        let userid = req.query.id;
        if (!userid) {
            return res.status(200).json({
                message: 'id null'
            })
        }
        const [row, files] = await poolmysql.query(`delete from Feedbacks where feedback_id = ?`, [userid]);
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
    ShowFeedbacks,
    CreateFeedbacks,
    updateFeedbacks,
    deleteFeedbacks
}