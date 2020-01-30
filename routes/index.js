var express = require('express');
var router = express.Router();
const moment = require('moment');

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

router.post('/auth', async function (req, res, next) {
  try {
    const user = await authenticate(req.body);
    if (user) {
      res.redirect('/home');
    } else {
      res.redirect('/?invalid=1');
    }
  } catch(err) {
    next(err);
  }
});

router.get('/home', async function (req, res, next) {
  try {
    const books = await bookService.getBooks();
    res.render('home', {
      books,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
