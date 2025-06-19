
const{DataTypes}= require('sequelize');
const sequel = require('../config/database');


const Details= sequel.define('Student_Details', {
    ID : {type: DataTypes.INTEGER, primaryKey: true, allowNull: false},
    Name : {type: DataTypes.STRING, allowNull: false},
    Age : {type: DataTypes.INTEGER, allowNull: false},
    Grade : {type: DataTypes.STRING, allowNull: false}
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Details;