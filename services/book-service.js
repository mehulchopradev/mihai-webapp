const BookDao = require('../dao/book-dao');

exports.getBooks = async function () {
    const bookDao = new BookDao();
    return await bookDao.getBooks();
}

exports.updateNoOfCopies = async function (bookId, book) {
    const bookDao = new BookDao();
    return await bookDao.updateNoOfCopies(bookId, book.no_of_copies);
}