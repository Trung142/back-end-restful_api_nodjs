const poolmysql = require("../config/database")
//bảng lịch hẹn 
const showapoin = async (req, res) => {
    try {
        let sql = `select c.first_name ,s.service_name,s.price  ,a2.status  from Appointments a2 
        inner join Customers c on a2.customer_id = c.customer_id 
        inner join Services s on a2.customer_id = c.customer_id 
        WHERE c.customer_id  = ?`
        const userid = req.params.id
        if (!userid) {
            return res.status(200).json({
                message: 'ok',
            })
        }
        const [row, files] = await poolmysql.execute(sql, [userid]);
        return res.status(201).json({
            message: 'ok',
            data: row
        })
    } catch (error) {
        return res.status(500).json({
            message: 'error server!',
            error: error
        })
    }
}
const ShowAppointment = async (req, res) => {
    try {
        const [row, files] = await poolmysql.execute('select * from Appointments');
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
        const [data] = await poolmysql.execute('select * from Appointments limit ? offset ?', [limit, offset])
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
const CreateAppointment = async (req, res) => {
    try {
        let { customer_id, employee_id, service_id, appointment_date, start_time, end_time, status } = req.body;

        let sql = 'insert into Appointments(customer_id, employee_id, service_id, appointment_date, start_time, end_time, status) values(?,?,?,?,?,?,?)';
        if (!customer_id || !employee_id || !service_id) {
            return res.status(200).json({
                message: "dont's input values !"
            })
        }
        const [row, files] = await poolmysql.query(sql, [customer_id, employee_id, service_id, appointment_date, start_time, end_time, status]);
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
const updateAppointment = async (req, res) => {
    try {
        let { customer_id, employee_id, service_id, appointment_date, start_time, end_time, status } = req.body;
        let userid = req.query.id;
        if (!customer_id || !customer_id || !service_id || !userid) {
            return res.status(200).json({
                message: 'not input values update !'
            })
        }
        let sql = `update Appointments 
        set customer_id = ?, employee_id = ?, service_id = ?, appointment_date = ?, start_time = ?, end_time = ?, status = ? where appointment_id = ?`;
        const [row, files] = await poolmysql.query(sql, [customer_id, employee_id, service_id, appointment_date, start_time, end_time, status, userid]);
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
const deleteAppointment = async (req, res) => {
    try {
        let userid = req.query.id;
        if (!userid) {
            return res.status(200).json({
                message: 'id null'
            })
        }
        const [row, files] = await poolmysql.query(`delete from Appointments where appointment_id = ?`, [userid]);
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
    ShowAppointment,
    CreateAppointment,
    updateAppointment,
    deleteAppointment,
    showapoin
}