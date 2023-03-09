'use strict';
const {
  Model
} = require('sequelize');
const { generateToken } = require('../middlewares/authMiddleware');
const PROTECTED_ATTRIBUTES = ['password'];

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toJSON() {
      // hide protected fields
      const attributes = { ...this.get() };
      // eslint-disable-next-line no-restricted-syntax
      for (const a of PROTECTED_ATTRIBUTES) {
        delete attributes[a];
      }
      return attributes;
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your email address',
      },
      unique: {
        args: true,
        msg: 'Email already exists',
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address',
        },
      },
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.prototype.newToken = async function newToken() {
    const token = generateToken(this)

    return {
      accessToken: token,
    };
  };

  User.prototype.hasMenu = async function hasMenu(menu) {
    if (!menu || menu === 'undefined') {
      return false;
    }
    const menus = await this.getMenus();
    return !!menus.map(({ name }) => name)
        .includes(menu.name);
  };

  return User;
};