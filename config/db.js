const mysql = require('mysql2');

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'module_b'
});

module.exports = db;
