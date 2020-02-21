const {Router} = require('express');
const route = Router();

const auth = require('./auth');
const users = require('./users');

route.use('/users', users);
route.use('/auth', auth);

module.exports = route;
