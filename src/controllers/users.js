const User = require('../models/users');

module.exports = {
  /**
     * Update user
     *
     * @param {*} req
     * @param {*} res
     */
  async updateUser(req, res) {

  },
  /**
     * Get one user by id
     *
     * @param {*} req
     * @param {*} res
     */
  async getUserById(req, res) {
    const id = req.params.id;

    const user = await User.getUserById(id);
    res.status(200).json(user);
  },
};
