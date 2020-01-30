const { getConnection } = require('../util/connection-util');

class BookDao {
    async getBooks() {
        const connection = await getConnection();
        const query = 'select * from books';

        return new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
                connection.destroy();
                if (err) {
                     reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

module.exports = BookDao;