const _ = require('lodash');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const util = require('util');
const shortId = require('short-id');

const stat = util.promisify(fs.stat);
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

module.exports = {
  /**
     * Path file for all users
     * @type {string}
     */
  path: path.join(__dirname, '../db/user.js'),

  /**
     * Update user
     *
     * @param  {number} id   user id
     * @param  {Object} userParams user fields to update
     * @return {Object}      user
     */
  async updateUserById(id, userParams) {
    const allUsers = this.getAllUsers();

    const newUsers = allUsers.map((item) => {
      if (item.id === id) {
        item = {...item, ...userParams};
      }

      return item;
    });
    await this.saveInFile(newUsers);

    return true;
  },
  /**
     * Delete user by id
     *
     * @param  {number} id   user id
     * @param  {Object} userParams user fields to update
     * @return {Object}      user
     */
  async deleteUserById(id) {
    const allUsers = this.getAllUsers();
    const newUsers = allUsers.fill((item) => item.id != id);

    await this.saveInFile(newUsers);
    return true;
  },
  /**
     * Save user
     *
     * @param  {Object} user user to save
     * @return {Object}      user
     */
  async saveUser(user) {
    user.id = shortId.generate();
    user.password = user['password'] = await bcrypt.hash(user.password, 8);
    const allUser = await this.getAllUsers();
    allUser.push(user);

    await this.saveInFile(allUser);

    return user;
  },

  async saveInFile(allUser) {
    try {
      await writeFile(this.path, JSON.stringify(allUser, null, '  '));
    } catch (e) {
      console.error(e);
    }

    return true;
  },

  /**
    * Get all users from file
    *
    * @return {Array} all users
    */
  async getAllUsers() {
    try {
      await stat(this.path);
    } catch (e) {
      // We don't have file, return empty array
      return [];
    }
    const allUsers = await readFile(this.path, 'utf8');

    // If empty file
    if (!allUsers) {
      return [];
    }

    return JSON.parse(allUsers);
  },

  /**
   *
   * @param  {any} id id users, we must pass this parametr in the type with which you want compare
   * @return {Object} user
   */
  async getUserById(id) {
    const allUser = await this.getAllUsers();

    return allUser.find((elem)=>{
      if (elem.id === id) {
        return elem;
      }
    });
  },
  /**
   *
   * @param  {any} email email users,
   * @return {Object} user
   */
  async getUserByEmail(email) {
    const allUser = await this.getAllUsers();

    return allUser.find((elem)=>{
      if (elem.email === email) {
        return elem;
      }
    });
  },
};
