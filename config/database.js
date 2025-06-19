const {Sequelize}= require('sequelize');

const sequel = new Sequelize('Student-Details', 'root', 'H6&=3bo0!',{
    host : 'localhost',
    dialect: 'mysql'
});
module.exports = sequel;