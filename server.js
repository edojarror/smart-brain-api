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
      connectionString : process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
  });

const app = express();
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next()
// });

app.use(express.json());
// app.use(cors());

app.get('/', (req, res) => {
    res.send("it is working!");
});


app.post("/signin", (req, res) => {signin.handleSignin(req, res, db, bcrypt)});
app.options('/register',cors(), (req, res) => {register.handleRegister(req, res, db, bcrypt, next)});
app.post('/register',cors(), (req, res) => {register.handleRegister(req, res, db, bcrypt, next)});


app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageUrl', (req, res) => {image.handleApiCall(req, res)});

app.listen(process.env.PORT || 2999, () => {
  console.log(`app is running on port 2999 ${process.env.PORT}`);
})

