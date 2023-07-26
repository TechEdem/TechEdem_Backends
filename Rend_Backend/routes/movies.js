const express = require("express")
const router = express.Router()
const ErrorResponse = require('../utils/errorResponse')
const  Movies = require('../models/movies');
const upload = require('../middleware/movieMulter')
const cloudinary = require('../utils/Cloudinary');
const fs = require('fs');




router.get('/', async(req, res, next)=>{
    try {
        const movies = await Movies.find();
        if(!movies){
            return next(new ErrorResponse(`Movies not found with id of ${req.params.id}`, 404));
        }
        res.status(200).json({
            success: true,
            data: movies,
        })
    } catch (err) {
        res.status(400).json({success: false})
    }
});



router.get('/:id', async(req, res, next)=>{
    try {
        const movie = await Movies.findById(req.params.id)
        if(!movie){
            return next(new ErrorResponse(`Movie not found with id of ${req.params.id}`, 404));
        }
        res.status(200).json({
            success: true,
            data: movie,
        })
    } catch (err) {
        next(new ErrorResponse(`Movie not found with id of ${req.params.id}`, 404))
    }
});

router.get('/search/:key', async(req, res, next)=>{
    let result = await Movies.find({"$or":[
        {"title": {"$regex": req.params.key, "$options": "i"}},
        {"genre": {"$regex": req.params.key, "$options": "i"}},
        {"duration": {"$regex": req.params.key, "$options": "i"}},
        {"release": {"$regex": req.params.key, "$options": "i"}},
    ]});
    res.status(200).json({
        success: true,
        data: result
    });
});



router.post('/create', upload.fields([{ name: 'trailer', maxCount: 1 },{name: 'movie', maxCount: 1}]),async(req, res, next)=>{
    
    try {

        const trailerFile = req.files['trailer'][0];
        const movieFile = req.files['movie'][0];

         // Upload movie file to Cloudinary
         const trailerResult = await cloudinary.uploader.upload(trailerFile.path);
         // Upload movie file to Cloudinary
         const movieResult = await cloudinary.uploader.upload(movieFile.path);
        
        
        let movies = new Movies({
            title: req.body.title,
            synopsis: req.body.synopsis,
            genre: req.body.genre,
            duration: req.body.duration,
            release: req.body.release,
            language: req.body.language,
            trailer: trailerResult.secure_url,
            movie: movieResult.secure_url,
        })
        const newMovie = await movies.save();
        res.status(201).json({
            success: true,
            data: newMovie,
        });
      } catch (err) {
        res.status(400).json({ message: err.message });
        console.log(err);
      }
    });


// 
router.put('/update/:id', async(req, res, next)=>{
    const {title, synopsis, genre, duration, release, language} = req.body;
    try {
        const  update = await Movies.findByIdAndUpdate(
            req.params.id, 
        {
            title,
            synopsis,
            genre,
            duration,
            release,
            language,
        },  
        
        {
            new: true,
            runValidators: true
        });

        if(!update){
            return next(new ErrorResponse(`Movies not found with id of ${req.params.id}`, 404));
        }
        res.status(200).json({
            success: true,
            data: update,
        })
    } catch (err) {
        next(new ErrorResponse(`Movies not found with id of ${req.params.id}`, 404));
    }
});



router.delete('/delete/:id', async(req, res, next)=>{
    try{ 
     const del = await Movies.findByIdAndDelete(req.params.id, req.body)
 
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