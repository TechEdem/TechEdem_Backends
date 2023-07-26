const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
    title:{
        type: String,
        require: [true, 'Please add a title'],
        unique: true,
        trim: true,
        maxlength: [50, "Title can not be more than 50 characters"]

    },
    slug: String,

    synopsis:{
        type: String,
        require: [true, 'Please add a description'],
    },
    genre:{
        type: String,
        require: true,
    },
    duration:{
        type: String,
        require: true
    },
    release:{
        type: String,
        require: true
    },
    language:{
        type: String,
        require: true
    },
    image :
    {
        type: String
    },
    trailer :
    {
        type: String
    },
    movie:
    {
        type: String
    },
    cloudinary_id: {
        type: String,
    }

}) ;

module.exports = mongoose.model('movies', MovieSchema)