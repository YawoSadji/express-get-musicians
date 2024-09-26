const express = require("express");
const app = express();
const db = require('../db/connection');
const bandRouter = require('../routes/band');
const router = require('../routes/musician');
const Band = require('../models/index');
const Musician = require('../models/index');
//TODO: Create a GET /musicians route to return all musicians 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/musicians', router);

app.use('/bands', bandRouter);


module.exports = app;