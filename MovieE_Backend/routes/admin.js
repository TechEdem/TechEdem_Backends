const express = require("express")
const router = express.Router()
const  Admin = require('../models/admin');
const ErrorResponse = require('../utils/errorResponse')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = require('../middleware/adminMulter')
const cloudinary = require('../utils/Cloudinary');
const fs = require('fs');





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
            data: user,
        })
    } catch (err) {
        next(new ErrorResponse(`No Admin found with id of ${req.params.id}`, 404))
    }
});



router.post('/register', upload.single('image'), async(req, res, next)=>{
    
    try {
        const {path} = req.file;
        const result = await cloudinary.uploader.upload(path);
        let admin = new Admin({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            gender: req.body.gender,
            dob: req.body.dob,
            digitalAddress: req.body.digitalAddress,
            streetAddress: req.body.streetAddress,
            city: req.body.city,
            mobileNumber: req.body.mobileNumber,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            secretcode: bcrypt.hashSync(req.body.secretcode, 10),
            image: result.secure_url,
            
        })
        const Savedusers = await admin.save( );
        fs.unlinkSync(path);
        res.status(201).json({
            success: true,
            data: Savedusers,
        })   
    } catch (error) {
        res.status(400).json({success: false})
        console.log(error);
    }

});



router.post('/login', async(req, res, next)=>{
    try {
        const admin = await Admin.findOne({email: req.body.email})
        const secret = process.env.secret

        if(!admin){
            res.status(400).json({success: false, message: 'The admin not found'})
        }

        if((admin&&bcrypt.compareSync(req.body.password, admin.password))&&(admin&&bcrypt.compareSync(req.body.secretcode, admin.secretcode))){
            const token = jwt.sign(
                {
                    adminId: admin.id
                },
                secret,
                {expiresIn:"12h"}
            )
        
            res.status(201).json({
                admin:admin.email,
                token: token,
                success: true,
                message: 'Admin Authenticated',
            }) 
        }
        else{
            res.status(400).json({success: false, message: 'Password or Admin Code is wrong'})
        }

        res.status(201).json({
            success: true,
            data: user,
        })
    } catch (error) {
        next(new ErrorResponse(`The Admin is not authorized`))
    }
        
   
})



router.put('/update/:id', upload.single('image'), async(req, res, next)=>{
    let admin = await Admin.findById(req.params.id).exec();

    await cloudinary.uploader.destroy(admin.cloudinary_id);

    let result
    if (req.file){
        result = await cloudinary.uploader.upload(req.file.path)
    }

    const  update = {
        firstname: req.body.firstname || admin.firstname,
            lastname: req.body.lastname || admin.lastname,
            gender: req.body.gender || admin.gender,
            dob: req.body.dob || admin.dob,
            digitalAddress: req.body.digitalAddress || admin.digitalAddress,
            streetAddress: req.body.streetAddress || admin.streetAddress,
            city: req.body.city || admin.city,
            mobileNumber: req.body.mobileNumber|| admin.mobileNumber,
            email: req.body.email || admin.email,
            password: req.body.password || admin.password,
            secretcode: req.body.secretcode || admin.secretcode,
            image: result?.secure_url || admin.image,
            cloudinary_id: result?.public_id || admin.cloudinary_id,
        } 
        
        admin =  await Admin.findByIdAndUpdate(req.params.id, update, {new: true});
        if(req.file){
            fs.unlinkSync(req.file.path); 
        }
        res.status(201).json({
            success: true,
            message: "Your profile is successfully updated",
        });  
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