const express = require("express")
const router = express.Router()
const  Admin = require('../models/admins');
const ErrorResponse = require('../utils/errorResponse')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.get('/', async(req, res, next)=>{
    try {
        const admins = await Admin.find().select('-password');
        if(!admins){
            return next(new ErrorResponse(`No Admin was found`, 404));
        }
        res.status(200).json({
            success: true,
            data: admins,
        })
    } catch (err) {
        res.status(400).json({success: false})
        
    }
});


router.get('/:id', async(req, res, next)=>{
    try {
        const admin = await Admin.findById(req.params.id).select('-password');
        if(!admin){
            return next(new ErrorResponse(`Admin not found with id of ${req.params.id}`, 404));
        }
        res.status(200).json({
            success: true,
            data: admin,
        })
    } catch (err) {
        next(new ErrorResponse(`Admin not found with id of ${req.params.id}`, 404))
    }
});


router.post('/register', async(req, res, next)=>{
    try {
        const admin = await Admin.findOne({email: req.body.email});
        if(admin){
            return next(new ErrorResponse(`Admin with email ${req.body.email} already exists`, 400));
        }
        else{
            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            const hashedCode = bcrypt.hashSync(req.body.secretcode, 10);
            const newAdmin = new Admin({
                fullname: req.body.fullname,
                email: req.body.email,
                password: hashedPassword,
                secretcode: hashedCode,
            });
            const savedAdmin = await newAdmin.save();
            res.status(201).json({
                success: true,
                data: savedAdmin,
            });
        }   
    } 
    catch (error) {
        res.status(400).json({success: false, message: error.message})
    }

});


router.post('/login', async(req, res, next)=>{
    try {
        const admin = await Admin.findOne({email: req.body.email})
        const secret = process.env.secret

        if(!admin){
            res.status(400).json({success: false, message: 'The Admin not found'})
        }

        if((admin&&bcrypt.compareSync(req.body.password, admin.password))&&(admin&&bcrypt.compareSync(req.body.secretcode, admin.secretcode))){
            const token = jwt.sign(
                {
                    adminId: admin.id
                },
                secret,
                {expiresIn:"1h"}
            )
            res.status(201).json({
                user:admin.email,
                token: token,
                success: true,
                message: 'Admin Authenticated',
            }) 
        }
        else{
            res.status(400).json({success: false, message: 'Password or AdminCode is wrong'})
        }

        res.status(201).json({
            success: true,
            data: user,
        })
    } catch (error) {
        next(new ErrorResponse(`The Admin is not authorized`))
    }      
   
});


router.put('/update/:id', async(req, res, next)=>{

    try {
        const  update = await Admin.findByIdAndUpdate(
            req.params.id, 
        {
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password,
            secretcode: req.body.secretcode,
        },  
        
        {
            new: true,
            runValidators: true
        });

        if(!update){
            return next(new ErrorResponse(`Admin not found with id of ${req.params.id}`, 404));
        }
        res.status(200).json({
            success: true,
            data: update,
        })
    } catch (err) {
        next(new ErrorResponse(`Admin not found with id of ${req.params.id}`, 404));
    }
});


router.delete('/delete/:id', async(req, res, next)=>{
    try{ 
     const del = await Admin.findByIdAndDelete(req.params.id, req.body)
 
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
 
 })



module.exports = router