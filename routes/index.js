var express = require('express');
var router = express.Router();
const moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  const date = moment().format('DD-MM-YYYY');
  res.render('index', {
    currentDate: { date }
  });
});

module.exports = router;
