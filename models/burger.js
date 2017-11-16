// Sequelize Burger model
module.exports = function(sequelize, DataTypes) {
  let Burger = sequelize.define('Burger', {
    burger_name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
/*
  Burger.associate = function(models) {
    Burger.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: false
      }
    });
  };
*/
  return Burger;
};