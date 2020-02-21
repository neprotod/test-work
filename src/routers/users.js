const {Router} = require('express');
const route = Router();
const userValidation = require('../validation/users');

const controllerUsers = require('../controllers/users');
const {authentication} = require('../middlewares/auth');

// get user be id
route.get('/:id', authentication, controllerUsers.getUserById);

// update user
route.put('/:id', authentication, userValidation.updateUser, controllerUsers.updateUser);

module.exports = route;
