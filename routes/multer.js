const multer = require('multer')
const{v4:uuidv4}=require('uuid')
const path =require('path')
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "pinterest_clone",
    allowed_formats: ["jpg", "png", "jpeg"]
  },
  filename: function (req, file, cb) {
    const uniquename =uuidv4()
    cb(null, uniquename +path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })
module.exports=upload;