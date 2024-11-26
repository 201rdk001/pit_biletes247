var express = require('express');
var router = express.Router();

// Auth check
router.use((req, res, next) => {
  const user = req.session.user;

  if (!user) {
      next(403);
      return;
  }

  if (user.name && user.surname) {
      res.locals.name = `${user.name} ${user.surname}`;
  }
  else {
      res.locals.name = user.username;
  }
  
  next();
});

/* Get profile page. */
router.get('/', function (req, res) {
  res.render('profile');
});

module.exports = router;
