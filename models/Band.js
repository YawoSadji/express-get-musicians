const Sequelize = require('sequelize');
const db = require('../db/connection');

const Band = db.define('band', {
    name: Sequelize.STRING,
    genre: Sequelize.STRING
});

module.exports = Band;