var express = require('express');
var router = express.Router();
router.use(require('../auth'));

/* Get profile page. */
router.get('/', function (req, res) {
  res.render('profile');
});

module.exports = router;
