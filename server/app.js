var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();
// var connect = mongoose.connect('mongodb://localhost/nodeblog');
var connect = mongoose.connect('mongodb://test:test@ds127341.mlab.com:27341/appblog');
var router = require('./posts/postRouter');
var user = require('./users/userRouter');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(expressValidator());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

var port = process.env.PORT || 3000;

app.get('/', function(req, res){
    res.send('Its working');
})

app.use('/router', router);
app.use('/user', user);

app.listen(port);
console.log('App is working');