const express = require('express');
const router = express.Router();
const Musician = require('../models/index');
const {check, validationResult} = require('express-validator');
router.get('/', async(req,res)=>{
    const allMusicos = await Musician.findAll();
    res.json(allMusicos);
});

router.get('/:id', async(req,res)=>{
    const musicianId = req.params.id;
    const foundMusician = await Musician.findByPk(musicianId);
    res.json(foundMusician);
});

router.post('/', [
    check('name').not().isEmpty().trim(),
    check('instrument').not().isEmpty().trim(),
    check('name').isLength({min: 2, max:20}),
    check('instrument').isLength({min: 2, max:20}),

], async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        ////setting statuscode to 400 
        //if not it returns a 200 here.
        res.status(400).json({error: errors.array()});
    }else{
    await Musician.create(req.body);
    const allMusicos = await Musician.findAll();
    res.json(allMusicos);
    }
});

router.put('/:id',  [
    check('name').not().isEmpty().trim(),
    check('instrument').not().isEmpty().trim(),
    check('name').isLength({min: 2, max:20}),
    check('instrument').isLength({min: 2, max:20}),
],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({error: errors.array()});
    }else{
    await Musician.update(req.body, {where: {id: req.params.id}});
    const allMusicos = await Musician.findAll();
    res.json(allMusicos);
    }
});

router.delete('/:id', async(req,res)=>{
    await Musician.destroy({where: {id: req.params.id}});
    const allMusicos = await Musician.findAll();
    res.json(allMusicos);
});


module.exports = router;