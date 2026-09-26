const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : true
    },
    password : {
        type : String,
    },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User