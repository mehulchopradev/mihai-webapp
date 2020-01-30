const BookDao = require('../dao/book-dao');

exports.getBooks = async function () {
    const bookDao = new BookDao();
    return await bookDao.getBooks();
}