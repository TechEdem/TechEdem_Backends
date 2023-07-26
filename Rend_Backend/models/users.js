const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    firstname:{
        type: String,
        require: true
    },
    slug: String,

    lastname:{
        type: String,
        require: true,
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
    mobileNumber:{
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
    image :
    {
        type: String
    }
});

UserSchema.virtual('id').get(function (){
    return this._id.toHexString();
});

UserSchema.set('toJSON',{
    virtuals: true,
})
module.exports = mongoose.model('users', UserSchema);
exports.UserSchema = UserSchema;