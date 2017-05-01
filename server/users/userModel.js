var mongoose = require('mongoose');
// User Schema
var UserSchema = new mongoose.Schema({
    firstname:{ type: String },
    lastname:{ type: String },
    username: { type:String },
    email: { type: String},
    password: { type: String},
    url: { type: String },
    date: { type: Date }
});

var loginSchema = new mongoose.Schema({
    token: { type:String },
    userID: { type: String }
});

UserSchema = mongoose.model("users", UserSchema);
loginSchema = mongoose.model("login", loginSchema);
exports.UserSchema = UserSchema;
exports.loginSchema = loginSchema;