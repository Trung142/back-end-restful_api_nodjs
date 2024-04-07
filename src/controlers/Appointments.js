const poolmysql = require("../config/database");
const db = require("../models");

//bảng lịch hẹn 
const showapoin = async (req, res) => {
    try {
        let sql = `select a2.id, c.username,c.phone,c.email,s.service_name,u.username as employee_name,s.price,a2.status,DATE(a2.appoinment_date),a2.start_time from Appointments a2
        inner join Customers c on a2.customer_id = c.id 
        inner join Services s on a2.service_id= s.id 
        inner join Users u on a2.employee_id = u.id 
 		where a2.id =?`
        const userid = req.query.id
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
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            let offset = (page - 1) * limit;
            const { count, rows } = await db.Appointment.findAndCountAll({
                offset: +offset,
                limit: +limit
            });
            let totalpage = Math.ceil(count / limit);
            delete rows.password;
            return res.status(201).json({
                message: 'ok',
                total: count,
                totalpage: totalpage,
                data: rows
            })
        }
        const user = await db.Appointment.findAll({
            raw: true
        });
        if (!user) {
            return res.status(200).json('Not found!');
        }
        delete user.password;
        return res.status(201).json({
            message: 'ok',
            data: user
        })

    } catch (error) {
        return res.status(500).json('loi server');
    }
}
//create customers
const CreateAppointment = async (req, res) => {
    try {
        let { customer_id, employee_id, service_id, date, start_time } = req.body;
        if (!customer_id || !employee_id || !service_id) {
            return res.status(200).json({
                message: "dont's input values !"
            })
        }
        const row = await db.Appointment.create({
            customer_id: customer_id,
            employee_id: employee_id,
            service_id: service_id,
            appoinment_date: date,
            start_time: start_time
        });
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
        let sql = `update Appointment
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
        const [row, files] = await poolmysql.query(`delete from Appointment where appointment_id = ?`, [userid]);
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