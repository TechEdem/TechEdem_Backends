const express = require("express")
const router = express.Router()
const  Key = require('../models/keys');
const ErrorResponse = require('../utils/errorResponse')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.get('/', async(req, res, next)=>{
    try {
        const keys = await Key.find();
        if(!keys){
            return next(new ErrorResponse(`No key was found`, 404));
        }
        res.status(200).json({
            success: true,
            data: keys,
        })
    } catch (err) {
        res.status(400).json({success: false, message: 'No key found'});  
    }
});


router.get('/:id', async(req, res, next)=>{
    try {
        const key = await Key.findById(req.params.id).select('-password');
        if(!key){
            return next(new ErrorResponse(`Key not found with id of ${req.params.id}`, 404));
        }
        res.status(200).json({
            success: true,
            data: key,
        });
    } catch (err) {
        next(new ErrorResponse(`Key not found with id of ${req.params.id}`, 404))
    }
});


router.post('/register', async(req, res, next)=>{
    try {
            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            const newKey = new Key({
                email: req.body.email,
                password: hashedPassword,
            });
            const savedKey = await newKey.save();
            res.status(201).json({
                success: true,
                data: savedKey,
            });   
    } 
    catch (error) {
        res.status(400).json({success: false, message: error.message})
    }
});


router.post('/login', async(req, res, next)=>{
    try {
        const key = await Key.findOne({email: req.body.email})
        const secret = process.env.secret
        if(!key){
            res.status(400).json({success: false, message: 'Key Authentication Failed'})
        }
        if(bcrypt.compareSync(req.body.password, key.password)){
            const token = jwt.sign(
                {
                    keyId: key.id
                },
                secret,
                {expiresIn:"1d"}
            );
            res.status(201).json({
                token: token,
                success: true,
                message: 'Key Authenticated',
            });
        }
        else{
            res.status(400).json({success: false, message: 'Key is wrong'})
        }
        res.status(201).json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(new ErrorResponse(`Invalid Key`))
    }
});

router.put('/update/:id', async(req, res, next)=>{

    try {
        const  update = await Key.findByIdAndUpdate(
            req.params.id, 
        {
            password: req.body.password,
        },  
        {
            new: true,
            runValidators: true
        });
        if(!update){
            return next(new ErrorResponse(`Key not found with id of ${req.params.id}`, 404));
        }
        res.status(200).json({
            success: true,
            data: update,
        });
    } catch (err) {
        next(new ErrorResponse(`Key not found with id of ${req.params.id}`, 404));
    }
});

router.delete('/delete/:id', async(req, res, next)=>{
    try{ 
     const del = await Key.findByIdAndDelete(req.params.id, req.body)
 
     if(!del){
         res.status(400).json({success: false})
     }
     res.status(200).json({
         success: true,
         data: {}
     })
     } catch (err) {
         res.status(400).json({success: false})
     }
 });

module.exports = router