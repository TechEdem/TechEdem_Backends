const multer = require('multer');
const path = require('path')

const storage =   multer.diskStorage({  
  destination: function (req, file, callback) {  
    callback(null, './assets/movies');  
  },  
  filename: function(req, file, callback){
    callback(null,Date.now() + file.originalname )
  }
});   
const upload = multer({
    storage,
    limits: {
      fileSize: 1024 * 1024 * 100, // 100 MB limit (adjust as needed)
      files: 5, // Allow up to 5 files per request (adjust as needed)
    },
    fileFilter: (req, file, cb) => {
      const allowedMimes = ['image/jpeg', 'image/png', 'video/mp4'];
      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, MP4 files are allowed.'));
      }
    },
  });


 module.exports = upload;
