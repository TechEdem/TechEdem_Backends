const mongoose = require('mongoose')
const AdminSchema = new mongoose.Schema({
    firstname:{
        type: String,
        require: [true, 'Please add a title']
    },
    slug: String,

    lastname:{
        type: String,
        require: [true, 'Please add a description'],
    },
    gender:{
        type: String,
        require: true
    },
    dob:{
        type: String,
        require: true
    },
    digitalAddress:{
        type: String,
        require: true
    },
    streetAddress:{
        type: String,
        require: true
    },
    city:{
        type: String,
        require: true
    },
    zipCode:{
        type: String,
        require: true
    },
    mobileNumber:{
        type: String,
        require: true
    },
    telephoneNumber:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    secretcode:{
        type: String,
        require: true
    },
    image :
    {
        type: String,
    },
    cloudinary_id: {
        type: String,
    }
});
module.exports = mongoose.model('admin', AdminSchema);
exports.AdminSchema = AdminSchema;