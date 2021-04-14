const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require('body-parser');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex ({
    client: 'pg',
    connection: {
      host : 'postgresql-closed-08366',
      user : 'postgres',
      password : 'a1b2c3d4e5f6',
      database : 'smart-brain'
    }
  });


const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("it is working!");
});


app.post("/signin", (req, res) => {signin.handleSignin(req, res, db, bcrypt)});

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageUrl', (req, res) => {image.handleApiCall(req, res)});

app.listen(process.env.PORT || 2999, () => {
  console.log( $`app is running on port 2999 ${process.env.PORT}`);
})

