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

const optionCors = {
  origin: "*",
  methods: [ "POST", "GET", "OPTIONS", "DELETE"],
  allowedHeaders: ['Content-Type'],
  "Access-Control-Allow-Origin": "*"

}

app.use(express.json());
app.use(cors({
  origin: '*'
}));

app.get('/', (req, res) => {
    res.send("it is working!");
});

// app.options('*', cors(optionCors));
app.post("/signin", (req, res) => {signin.handleSignin(req, res, db, bcrypt)});

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});


app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageUrl', (req, res) => {image.handleApiCall(req, res)});

app.listen(process.env.PORT || 2999, () => {
  console.log(`app is running on port 2999 ${process.env.PORT}`);
})

