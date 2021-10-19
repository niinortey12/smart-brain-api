const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const Register = require('./controllers/Register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

const db = knex({
  // Enter your own database information here based on what you created
  client: 'pg',
  connection: {
    host : 'postgresql-angular-86034',
    user : 'postgres',
    port :'5433',
    password : '',
    database : 'smart-brain-api'
  }
});

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> { res.send('it is working!')})
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})
app.post('/Register', (req,res) => {Register.handleRegister(req,res, db, bcrypt)})
app.get('/profile/:id', (req, res,) => { profile.handleProfileGet(req, res, db )})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res,)})

app.listen(process.env.PORT || 3000, ()=> {
  console.log('app is running on port ${process.env.PORT}');
})
