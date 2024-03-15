// const pool = dp.createPool({
//     host: 'localhost',
//     port: 3307 || 3306,
//     user: 'root',
//     password: '123456',
//     database: 'trung142',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
// });
// app.use(bodyParser.urlencoded({ extended: true }))
// // parse application/json
// app.use(bodyParser.json())
// app.use(router);
// // log in
// app.post('/login', (req, res) => {
//     const sql = "select * from Acount where name = ? and password = ?";
//     pool.query(sql, [req.body.name, req.body.password], (err, data) => {
//         console.log(res.data);
//         if (err) {
//             return res.json("error");
//         } if (data.length > 0) {
//             return res.json("success");

//         } else {
//             return res.json("file");
//         }
//     })
// })

// // listUser
// app.get("/listUser", (req, res) => {
//     const sql = "select * from Acount";
//     pool.query(sql, (err, data) => {
//         if (err) {
//             return res.json("error");
//         } if (data.length > 0) {
//             return res.json(data);
//         }
//         return res.json("not list User!")
//     })
// })
// // Insert
// app.post("/addUser", (req, res) => {
//     const sql = "INSERT INTO Acount (`name`,`email`,password) VALUES (?)";
//     const values = [
//         req.body.name,
//         req.body.email,
//         req.body.password
//     ]
//     pool.query(sql, [values], (err, data) => {
//         if (err) {
//             return res.json("error");
//         } else {
//             return res.json(data);
//         }
//     })
// })
// // updates
// app.delete("/delete/:id", (req, res) => {
//     const sql = "delete from Acount where id = ?";
//     let id = req.params.id
//     pool.query(sql, [id], (err, data) => {
//         if (err) {
//             return res.json({ mesages: "delete user error" });
//         }
//         return res.json(data);
//     })
// })
// //edit
// app.put("/edit/:id", (req, res) => {
//     const sql = `update Acount set email = ?,name = ?,password = ? where id = ?`
//     let id = req.params.id;
//     pool.query(sql, [req.body.email, req.body.name, req.body.password, id], (err, data) => {
//         if (err) {
//             return res.json("error");
//         }
//         return res.json(data);
//     })
// })const pool = dp.createPool({
//     host: 'localhost',
//     port: 3307 || 3306,
//     user: 'root',
//     password: '123456',
//     database: 'trung142',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
// });
// app.use(bodyParser.urlencoded({ extended: true }))
// // parse application/json
// app.use(bodyParser.json())
// app.use(router);
// // log in
// app.post('/login', (req, res) => {
//     const sql = "select * from Acount where name = ? and password = ?";
//     pool.query(sql, [req.body.name, req.body.password], (err, data) => {
//         console.log(res.data);
//         if (err) {
//             return res.json("error");
//         } if (data.length > 0) {
//             return res.json("success");

//         } else {
//             return res.json("file");
//         }
//     })
// })

// // listUser
// app.get("/listUser", (req, res) => {
//     const sql = "select * from Acount";
//     pool.query(sql, (err, data) => {
//         if (err) {
//             return res.json("error");
//         } if (data.length > 0) {
//             return res.json(data);
//         }
//         return res.json("not list User!")
//     })
// })
// // Insert
// app.post("/addUser", (req, res) => {
//     const sql = "INSERT INTO Acount (`name`,`email`,password) VALUES (?)";
//     const values = [
//         req.body.name,
//         req.body.email,
//         req.body.password
//     ]
//     pool.query(sql, [values], (err, data) => {
//         if (err) {
//             return res.json("error");
//         } else {
//             return res.json(data);
//         }
//     })
// })
// // updates
// app.delete("/delete/:id", (req, res) => {
//     const sql = "delete from Acount where id = ?";
//     let id = req.params.id
//     pool.query(sql, [id], (err, data) => {
//         if (err) {
//             return res.json({ mesages: "delete user error" });
//         }
//         return res.json(data);
//     })
// })
// //edit
// app.put("/edit/:id", (req, res) => {
//     const sql = `update Acount set email = ?,name = ?,password = ? where id = ?`
//     let id = req.params.id;
//     pool.query(sql, [req.body.email, req.body.name, req.body.password, id], (err, data) => {
//         if (err) {
//             return res.json("error");
//         }
//         return res.json(data);
//     })
// })