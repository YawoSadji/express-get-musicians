const express = require('express');
const router = express.Router();
const Musician = require('../models/index');

router.get('/', async(req,res)=>{
    const allMusicos = await Musician.findAll();
    res.json(allMusicos);
});

router.get('/:id', async(req,res)=>{
    const musicianId = req.params.id;
    const foundMusician = await Musician.findByPk(musicianId);
    res.json(foundMusician);
});

router.post('/', async(req,res)=>{
    await Musician.create(req.body);
    const allMusicos = await Musician.findAll();
    res.json(allMusicos);
});

router.put('/:id', async(req,res)=>{
    await Musician.update(req.body, {where: {id: req.params.id}});
    const allMusicos = await Musician.findAll();
    res.json(allMusicos);
});

router.delete('/:id', async(req,res)=>{
    await Musician.destroy({where: {id: req.params.id}});
    const allMusicos = await Musician.findAll();
    res.json(allMusicos);
});


module.exports = router;