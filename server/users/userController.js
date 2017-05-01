var userModel = require('./userModel');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var q = require('q');
var jwt = require('jsonwebtoken');
process.env.SECRET_KEY = 'mykey';


 // encryption Code
encryption = {};
encryption.stringToHash = function (PasswordString){
    var deferred = q.defer();
    var round = 10;
    bcrypt.genSalt(round, function(err, salt){
        if(err) {
            deferred.reject(err);
        }
        bcrypt.hash(PasswordString, salt, function(){ },
        function (err, hashedPassword){
            if(err){
                deferred.reject(err);
            }
            deferred.resolve(hashedPassword);
        });
    });
    return deferred.promise;
}

encryption.verifyHash = function(realPassword, hashString){
    var deferred = q.defer();
    bcrypt.compare(realPassword, hashString, function(err, result){
        if(err) {
            deferred.reject(err);
        }
        deferred.resolve(result);
    });
    return deferred.promise;
}




function getUsers(req, res){
    userModel.UserSchema.find(function(err, data){
        if(err) throw err;
        res.json(data);
    })
}

// Signup Code
function signup(req, res){
    var newUser = new userModel.UserSchema({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cpassword: req.body.cpassword,
        url: req.body.url,        
        date: new Date()
    });

    req.checkBody('firstname', 'firstname is required').notEmpty();
    req.checkBody('lastname', 'lastname is required').notEmpty();
    req.checkBody('username', 'username is required').notEmpty();
    req.checkBody('email', 'email is required').isEmail();
    req.checkBody('password', 'password is required').notEmpty();
    req.checkBody('cpassword', 'Password not Match').equals(req.body.password);
    req.checkBody('url', 'image not uploaded').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        console.log(errors);
    } else {
        console.log('No');
        console.log('##### newUser ######', newUser);

        encryption.stringToHash(newUser.password).then(function(passwordHash){
                newUser.password = passwordHash;
                newUser.save(function(err, data){
                    if(err) throw err;
                    console.log('@@@@@2 User Added 2####', newUser);
                    res.send('Signup Successful');
                })
        })
    }
}

// Signin Code
function signin(req, res){
    username = req.body.username;
    password = req.body.password;
    var query = { username: username };
    var user = {
        username: username,
        password: password
    }
    var token = jwt.sign(user, process.env.SECRET_KEY, {
        expiresIn: 500
    })
    userModel.UserSchema.findOne(query, function(err, user){
        if(!err) {
            if (!user){
                console.log('@@@@@@ Signin user not Exist @@@@@@@@')
            } else {
                encryption.verifyHash(password, user.password)
                    .then(function(success){
                        if(success){
                                var data = {
                                    _id: user._id,
                                    firstname: user.firstname,
                                    lastname: user.lastname,
                                    uesrname: user.username,
                                    email: user.email,
                                    password: user.password,
                                    url: user.url,
                                    date: user.date,
                                    token: token
                                }
                                // user.token = token;
                                console.log('@@@@@@@ USER.TOKEN @@@@@@@', data);
                                res.json(data);
                        } else {
                            console.log('Invalid Password');
                            res.send(400);
                        }
                    })
            }
        }
    })
}

function signout(req, res){
//     req.logout();
//     res.send('You are logged out');
}
exports.getUsers = getUsers;
exports.signup = signup;
exports.signin = signin;
exports.signout = signout;