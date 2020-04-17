const mysql = require('mysql')

const connection = mysql.createConnection({
    host: '127.0.0.1' || 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'briefn8'
})

connection.connect((err) => {
    if (err) throw err
    console.log('the connection was established successfully:)');

})

module.exports = connection;