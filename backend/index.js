require("dotenv").config()
const uri = process.env.MONGO_URL;

const express = require("express")
const app = express();

const cors = require("cors")
const mongoose = require("mongoose");
const path = require('path');


const cloudinary = require("./configs/cloudinaryConfig");
const upload = require("./configs/multerConfig");
const Image = require("./models/image")
const hello = require("./helper");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.listen(8080, async ()=>{
    console.log("app started")
    await mongoose.connect(uri)
    console.log("database connected")
})



app.get("/", (req,res)=>{
    res.send("app runing hai")
})

app.post("/api/upload",upload.single('image'), async (req,res)=>{
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'image-share' },
        (error, result) => (error ? reject(error) : resolve(result))
      ).end(req.file.buffer);
    });

    const imageUrl = result.secure_url;
    const code = hello();
    const newImage = await Image.create({ code, imageUrl });

    res.status(201).json({ code: newImage.code });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ message: 'Upload failed' });
  }
})

app.get("/api/image/:code", async(req,res)=>{
    let {code} = req.params;
   const image =  await Image.findOne({code : code});

   if(!image){
   return res.send("enter a  valid code")
   }

   res.status(200).json({ imageUrl: image.imageUrl });
   
})