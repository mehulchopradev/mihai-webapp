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

    async updateNoOfCopies(bookId, noOfCopies) {
        const connection = await getConnection();
        const query = 'update books set no_of_copies=? where id=?';
        return new Promise((resolve, reject) => {
            connection.query(query, [noOfCopies, bookId], (err, results) => {
                connection.destroy();
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }
}

module.exports = BookDao;