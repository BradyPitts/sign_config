require('dotenv').config({path: __dirname + '/../.env'});
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const authController = require('./controllers/authController');
const dataController = require('./controllers/dataController');
const path = require('path');



const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

const app = express();

app.use(express.json());

massive({
  connectionString: CONNECTION_STRING,
  ssl:{
    rejectUnauthorized: false
  }
}).then(db =>{
  app.set('db', db);
  console.log('DataBase connected')
})

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie:{
      maxAge: 1000 * 60 * 60 * 24 * 7 * 4 * 13
    },
  })
);

app.put('/auth/signup', authController.signUp);
app.post('/auth/login', authController.login);
app.delete('/auth/logout', authController.logout);
app.post('/auth/newPassword', authController.newPassword);

app.get('/api/data', dataController.getData);
app.put('/api/data', dataController.updateData);

app.use(express.static(`${__dirname}/../build`));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`))