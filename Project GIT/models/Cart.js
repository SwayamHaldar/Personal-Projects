
import { DataTypes } from 'sequelize';
import sequel from '../config.js';
import Inventory from './Inventory.js';

const Cart = sequel.define('Cart', {
    Item: {
        type: DataTypes.STRING, allowNull: false, primaryKey: true,
        references: { model: Inventory, key: 'Item' }

    },
    Quantity: { type: DataTypes.INTEGER, allownull: true },
    UID: { type: DataTypes.INTEGER, allownull: false },
    TotalCount: { type: DataTypes.INTEGER, allownull: true },
    TotalCost: { type: DataTypes.INTEGER, allownull: true }
}, {
    freezeTableName: true,
    timestamps: false,
    indexes: [{
        unique: true,
        fields: ['Item', 'UID']
    }]
});

export default Cart;
