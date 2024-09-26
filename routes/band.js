const express = require('express');
const bandRouter = express.Router();
const Band = require('../models/index');
const Musician = require('../models/index');

bandRouter.get('/', async(req,res)=>{
    const allBands = await Band.findAll({include: [{model: Musician}]});
    res.json(allBands);
});

bandRouter.get('/:id', async(req,res)=>{
    const BandId = req.params.id;
    const foundBand = await Band.findByPk(BandId, 
        {include: [{model: Musician}]});
    res.json(foundBand);
});

//bandRouter.post('/', async(req,res)=>{
//     await Band.create(req.body);
//     const allBands = await Band.findAll();
//     res.json(allBands);
// });

//bandRouter.put('/:id', async(req,res)=>{
//     await Band.update(req.body, {where: {id: req.params.id}});
//     const allBands = await Band.findAll();
//     res.json(allBands);
// });

//bandRouter.delete('/:id', async(req,res)=>{
//     await Band.destroy({where: {id: req.params.id}});
//     const allBands = await Band.findAll();
//     res.json(allBands);
// });


module.exports = bandRouter;