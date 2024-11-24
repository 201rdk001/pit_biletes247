var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect("events");
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render("login", { layout: false });
});

/* POST login auth. */
router.post('/login', function(req, res, next) {
  // TODO
  res.send("login response <script>setTimeout(() => { window.location.pathname = '/' }, 3000);</script>");
});

/* GET logout. */
router.get('/logout', function(req, res, next) {
  // TODO
  res.send("logout response <script>setTimeout(() => { window.location.pathname = '/login' }, 3000);</script>");
});

module.exports = router;
