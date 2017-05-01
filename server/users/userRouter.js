var express = require('express');
var userController = require('./userController');
var passport = require('passport');
var router = express.Router();

router.get('/', userController.getUsers);
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/signout', userController.signout);
module.exports = router;