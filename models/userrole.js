'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.belongsToMany(models.Role, { through: UserRole, foreignKey: 'userId', onDelete: 'cascade' });
      models.Role.belongsToMany(models.User, { through: UserRole, foreignKey: 'roleId', onDelete: 'cascade' });
    }
  }
  UserRole.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'UserRole',
  });
  return UserRole;
};