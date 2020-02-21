const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const config = require('../../config');

module.exports = {
  /**
     * Logout user
     *
     * @param {*} req
     * @param {*} res
     */
  async logout(req, res) {},
  /**
     * Login user
     *
     * @param {*} req
     * @param {*} res
     */
  async login(req, res) {
    const auth = req.header('authorization');
    console.log(auth);
    if (auth) {
      return res.status(400).json({errors: ['You\'re already auth']});
    }
    const user = await User.getUserByEmail(req.body.email);

    if (_.isEmpty(user)) {
      res.status(400).json({errors: ['Not user with this email']});
    }

    // Test password
    const test = await bcrypt.compare(req.body.password, user['password']);

    if (!test) {
      res.status(400).json({errors: ['Password wrong']});
    }

    // Everything is ok, create token
    // Create signature
    const token = jwt.sign({id: user.id.toString()}, config.jwt_secret, {expiresIn: config.jwt_expire});
    res.set('X-Auth-Token', token);

    res.status(200).json({token});
  },
  /**
     * Save user
     *
     * @param {*} req
     * @param {*} res
     */
  async register(req, res) {
    try {
      const user = await User.saveUser(req.body);
      const result = {
        'user': user,
      };
      res.status(201).json(result);
    } catch (e) {
      console.error(e);
      res.status(500).json({errors: ['Something wrong']});
    }
  },
};
