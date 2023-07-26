<<<<<<< HEAD
const mongoose = require('mongoose')
const QuestionSchema =  mongoose.Schema({
    fullname: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    message: {
        type: String,
        require: true,
    }
})
=======
const mongoose = require('mongoose')
const QuestionSchema =  mongoose.Schema({
    fullname: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    message: {
        type: String,
        require: true,
    }
})
>>>>>>> 4c2ddcdf8224fe1c92c13903ef42de2758d8537f
module.exports = mongoose.model('Question', QuestionSchema)