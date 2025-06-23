import { DataTypes } from 'sequelize';
import sequel  from '../config.js';

const Inventory = sequel.define('Inventory', {
    UID: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    Item: { type: DataTypes.STRING, allowNull: false, foreignKey: true },
    Cost: { type: DataTypes.INTEGER, allowNull: false },
    Type: { type: DataTypes.STRING, allowNull: false },
    Count: { type: DataTypes.INTEGER, allowNull: false }
}, {
    freezeTableName: true,
    timestamps: false
});


export default Inventory;