const express = require("express");
const app = express();
const { Musician, Band } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 
app.get('/musicians', async(req,res)=>{
    const allMusicos = await Musician.findAll();
    res.json(allMusicos);
});

app.get('/musicians/1', async(req,res)=>{
    const firstMusicos = await Musician.findOne({where:{id: 1}});
    res.json(firstMusicos);
});

app.get('/musicians/2', async(req,res)=>{
    const secondMusicos = await Musician.findOne({where:{id: 2}});
    res.json(secondMusicos);
});

app.get('/musicians/3', async(req,res)=>{
    const thirdMusicos = await Musician.findOne({where:{id:3}});
    res.json(thirdMusicos);
});


app.get('/bands', async (req,res)=>{
    const allBands = await Band.findAll();
    res.json(allBands);
});






module.exports = app;