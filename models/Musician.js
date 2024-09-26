const db = require('../db/connection');
const Sequelize = require('sequelize');

const Musician = db.define('musician', {
    name: Sequelize.STRING,
    instrument : Sequelize.STRING
});

module.exports = Musician;