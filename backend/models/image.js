const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
     imageUrl: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user', 
    default: null 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Image = mongoose.model("imageDetail", imageSchema);

module.exports = Image