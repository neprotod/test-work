const jwt = require('jsonwebtoken');
const User = require('../models/users');
const config = require('../../config');

module.exports = {
  async authentication(req, res, next) {
    const auth = req.header('authorization');
    if (!auth) {
      return res.status(401).json({errors: ['Only authorization user']});
    }

    if (!auth.includes('Bearer')) {
      return res.status(401).json({errors: ['No token']});
    }
    try {
      const token = auth.split(' ')[1];
      const decoded = jwt.verify(token, config.jwt_secret);

      const test = await User.getUserById(decoded.id, token);

      if (!test) {
        return res.status(401).json({errors: ['Please authorization']});
      }

      req.token = token;
      req.user = test;
      next();
    } catch (e) {
      console.error(e);
      return res.status(401).json({errors: ['Authorization is expired']});
    }
  },
};
