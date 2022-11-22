var express = require('express');
var path = require('path');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var login = require('./routes/login');
var register = require('./routes/register');
var router = express.Router();
;
var mongoose = require('mongoose');
var mailer = require('express-mailer');


mongoose
.connect("mmongodb+srv://nikhil:8TQ5ebLBzQ5taO8E@documentmanagement.wtare.mongodb.net/documentmanagement?retryWrites=true&w=majority", {
useUnifiedTopology: true,
useNewUrlParser: true,
})
.then(() =>console.log('DB Connected!'))
.catch(err => {
console.log(err);
});

var app = express();

app.use(cors());
app.use(bodyParser.json({limit:'50mb',extended:true}));
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser())
app.get('/', (req, res) => res.send('Hello World!'))

app.use('/login', login);
app.use('/register', register);




module.exports = app;
