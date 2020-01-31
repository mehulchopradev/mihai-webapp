var express = require('express');
const { wss } = require('../app'); 
var router = express.Router();
const moment = require('moment');
const passport = require('passport');

const {createUser, authenticate} = require('../services/user-service');
const bookService = require('../services/book-service');

/* GET home page. */
router.get('/', function(req, res, next) {
  const date = moment().format('DD-MM-YYYY');
  const { invalid } = req.query;
  res.render('index', {
    currentDate: { date },
    invalid
  });
});

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', async function (req, res, next) {
  try {
    const result = await createUser(req.body);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

/* router.post('/auth', async function (req, res, next) {
  try {
    const user = await authenticate(req.body);
    if (user) {
      req.session.username = req.body.username;
      res.redirect('/home');
    } else {
      res.redirect('/?invalid=1');
    }
  } catch(err) {
    next(err);
  }
}); */

router.post('/auth', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/?invalid=1'
}));

router.get('/home', async function (req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }

  try {
    const books = await bookService.getBooks();
    res.render('home', {
      books,
      // username: req.session.username
      username: req.user.username
    });
  } catch (err) {
    next(err);
  }
});

router.put('/books/:bookId', async function (req, res, next) {
  const book = req.body;
  const bookId = req.params.bookId
  try {
    await bookService.updateNoOfCopies(parseInt(bookId), book);
    // broadcast the updated table html data to all the web socket clients
    const books = await bookService.getBooks();
    let htmlString = '';
    books.forEach(book => {
      htmlString += `<tr><td>${book.title}</td><td>${book.pages}</td><td>${book.price}</td><td>${book.no_of_copies}</td></tr>`;
    });
    wss.clients.forEach(client => {
      client.send(htmlString);
    });

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
