var express = require('express');
var asyncHn = require('express-async-handler');
var router = express.Router();
var database = require('../database');
var { loadUser, saveUser } = require('../models/user');

const msgTable = {
  general:             { msgType: "error", msgLogin: "Servera kļūda.", msgRegister: "Servera kļūda." },
  invalid_credentials: { msgType: "error", msgLogin: "Lietotājvārds vai parole nav ievadīti pareizi!" },
  email_taken:         { msgType: "error", msgRegister: "E-pasts jau tiek izmantots!" },
  username_taken:      { msgType: "error", msgRegister: "Lietotājvārds jau ir aizņemts!" },
  user_created:        { msgType: "info",  msgRegister: "Jauns lietotājs veiksmīgi izveidots!" }
}

/* GET home page. */
router.get('/', function (req, res) {
  res.redirect("login#register");
});

// TODO: add auth and session middleware

/* GET login page. */
router.get('/login', function (req, res) {
  res.render("login", { layout: false, ...msgTable[req.query.msg] });
});

/* POST login auth. */
router.post('/login', asyncHn(async function (req, res) {
  try {
    const user = await loadUser(req.app.db, req.body.username);
    if (user?.password === req.body.password) {
      res.redirect('events');
    }
    else {
      res.redirect('login?msg=invalid_credentials');
    }
  } catch (error) {
    res.redirect('login?msg=login_server_error');
    res.send(error);
  }
}));

/* GET logout. */
router.get('/logout', function (req, res) {
  // TODO
  res.send("logout response <script>setTimeout(() => { window.location.pathname = '/login' }, 3000);</script>");
});

router.post('/register', asyncHn(async function (req, res) {
  let newUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    send_announcements_email: false,
    send_announcements_phone: false,
    is_organizer: false,
    is_admin: false
  };

  await saveUser(req.app.db, newUser).then(
    _ => { res.redirect("login?msg=user_created#register"); },
    error => {
      if (error.message.includes('UNIQUE constraint failed: users.email')) {
        res.redirect("login?msg=email_taken#register");
      }
      else if (error.message.includes('UNIQUE constraint failed: users.username')) {
        res.redirect("login?msg=username_taken#register");
      }
    }
  );
}));

module.exports = router;
