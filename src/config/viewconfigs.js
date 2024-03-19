const express = require('express');
const path = require('path');
const viewengins = (app) => {
    app.use(express.static(path.join('./src', 'publics')))
    app.set('views', path.join('./src', 'views')) // call folder views is folder name.
    app.set("view engine", "ejs");
}
module.exports = viewengins;