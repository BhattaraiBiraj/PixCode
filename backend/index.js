require("dotenv").config()
const uri = process.env.MONGO_URL;
const secret = process.env.SECRET;

const express = require("express")
const app = express();

const cors = require("cors")
const mongoose = require("mongoose");
const path = require('path');
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")


const cloudinary = require("./configs/cloudinaryConfig");
const upload = require("./configs/multerConfig");
const Image = require("./models/image")
const User = require("./models/user")
const hello = require("./helper");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, username: user.username },
    secret,
    { expiresIn: '4d' }
  );
};

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ msg: "Invalid or expired token" });
    }
    req.userId = decoded.userId;
    next();
  });
}

app.listen(8080, async () => {
  console.log("app started")
  await mongoose.connect(uri)
  console.log("database connected")
})


app.get("/", (req, res) => {
  res.send("app runing hai")
})

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });

  if (user) {
    return res.json({ msg: "user already exist" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  let result = await User.create({ username, password: hashedPassword })
   const token = generateToken(result); 
  res.json({ msg: "registered sucessfully", token })
})

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (!user) {
    return res.json({ msg: "Invalid username or password" });
  }

  const isValidPassword = await bcrypt.compare(password, user.password)
  if (!isValidPassword) {
    return res.json({ msg: "Invalid username or password" });
  }

  const token = generateToken(user);
  res.json({ msg: "Login successful", token });

})
app.post("/api/upload", upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
     const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    let userId = null;
     if (token) {
      try {
        const decoded = jwt.verify(token, secret);
        userId = decoded.userId;
      } catch (err) {
        userId = null; 
      }
    }
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'image-share' },
        (error, result) => (error ? reject(error) : resolve(result))
      ).end(req.file.buffer);
    });

    const imageUrl = result.secure_url;
    const code = hello();
    const newImage = await Image.create({ code, imageUrl, user: userId });

    res.status(201).json({ code: newImage.code });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ message: 'Upload failed' });
  }
})

app.get("/api/image/:code", async (req, res) => {
  let { code } = req.params;
  code = code.trim();
  const image = await Image.findOne({ code: code });

  if (!image) {
    return res.json({ err: "Enter a  valid code" })
  }

  res.status(200).json({ imageUrl: image.imageUrl, msg: 'Image Found' });

})

app.get("/api/history", verifyToken, async (req, res) => {
  try {
    const uploads = await Image.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(uploads);
  } catch (err) {
    console.error("HISTORY ERROR:", err);
    res.status(500).json({ msg: "Failed to fetch history" });
  }
});