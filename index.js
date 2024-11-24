const express = require('express')
const sqlite3 = require('sqlite3').verbose();
const path = require('node:path');
const app = express();
const database = new sqlite3.Database('./users.db');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

database.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);
app.post('/register', (req, res) => {
  const { register_email, register_user, register_pass } = req.body;

  const query = `INSERT INTO users (email, username, password) VALUES (?, ?, ?)`;
  database.run(query, [register_email, register_user, register_pass], (error) => {
      if (error) {
          if (error.message.includes('UNIQUE constraint failed: users.email')) {
              return res.send('E pasts jau tiek izmantots!');
          } else if (error.message.includes('UNIQUE constraint failed: users.username')) {
              return res.send('Lietotājvārds jau ir aizņemts!');
          }
      }
      else{
      return res.send('Jauns lietotājs veiksmīgi izveidots!');
      }
    });
});
app.post('/login', async(req, res) => {
  console.log(req.body);
  const { login_user, login_pass } = req.body;
  const query=`SELECT * FROM users WHERE username = ? AND password = ?`;
  database.get(query,[login_user,login_pass],(error,row)=>{
    if (error) {
      return res.send('kļūda');
    }
    if(!row){
      return res.send('Lietotājvārds vai parole nav ievadīti pareizi!');
    }else{
     return res.send('ir');
    }
  });
});

  app.listen(8000, () => {
    console.log('app listening on port 8000!')
});