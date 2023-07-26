const multer = require('multer');
const path = require('path')

const storage =   multer.diskStorage({  
  destination: function (req, file, callback) {  
    callback(null, './assets/admin');  
  },  
  filename: function(req, file, callback){
    callback(null,Date.now() + file.originalname )
  }
});   
const upload = multer({ storage : storage,})


 module.exports = upload;