const {Router} = require('express');
const userValidation = require('../validation/users');
const route = Router();

const controller = require('../controllers/auth');
const {authentication} = require('../middlewares/auth');

route.get('/logout', authentication, controller.logout);

route.post('/register', userValidation.saveUser, controller.register);
route.post('/login', userValidation.loginUser, controller.login);


module.exports = route;
