const { getConnection } = require('../util/connection-util');

class UserDao {
    async insertUser(username, password, gender) {
        const user = {
            username,
            password,
            gender
        };

        const connection = await getConnection();
        return new Promise((resolve, reject) => {
            connection.query('insert into users set ?', user, (err, results, fields) => {
                console.log(results); // insertId, affectedRows
                console.log(fields);

                connection.destroy();
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    async getUserByUsernameAndPassword(username, password) {
        const connection = await getConnection();
        const query = 'select username from users where username = ? and password = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [username, password], (err, results, fields) => {
                connection.destroy();
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(results.length ? {username: results[0].username} : null);
                }
            });
        });
    }

    async getUserByUsername(username) {
        const connection = await getConnection();
        const query = 'select * from users where username = ?';
        return new Promise((resolve, reject) => {
            connection.query(query, [username], (err, results, fields) => {
                connection.destroy();
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(results.length ? results[0] : null);
                }
            });
        });
    }
}

module.exports = UserDao;