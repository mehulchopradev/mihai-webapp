const mysql = require('mysql');

exports.getConnection = function () {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'mihai_libapp_db'
    });

    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(connection);
            }
        });
    });
}