import Inventory from './Inventory.js';
import Cart from './Cart.js';
import sequelize from '../config.js';
import pkg from 'sequelize';
const { DataTypes } = pkg;

export { Inventory, Cart };

Cart.belongsTo(Inventory, { foreignKey: 'Item' });
Inventory.hasMany(Cart, { foreignKey: 'Item' });

Cart.belongsTo(Inventory, { foreignKey: 'UID' });
Inventory.hasMany(Cart, { foreignKey: 'UID' });
