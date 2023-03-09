'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleMenu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Menu.belongsToMany(models.Role, { through: RoleMenu, foreignKey: 'menuId', onDelete: 'cascade' });
      models.Role.belongsToMany(models.User, { through: RoleMenu, foreignKey: 'roleId', onDelete: 'cascade' });
    }
  }
  RoleMenu.init({
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    menuId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'RoleMenu',
  });
  return RoleMenu;
};