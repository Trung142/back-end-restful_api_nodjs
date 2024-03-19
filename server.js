const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const middleware = require("./src/copoment/middleware");
const OrmConnetion = require("./src/config/ormSequelize");
const app = express();
app.use(cors());
app.use(express.json());
//params
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const dotenv = require('dotenv').config();
const port = dotenv.parsed.PORT || 8081
OrmConnetion();
//require('dotenv').config();
middleware(app);
app.listen(port, () => {
    console.log("listent........!");
})