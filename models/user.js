const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user_name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
  },
  { timestamp: true, versionKey: false }
);

module.exports = mongoose.model("UserActivation", userSchema);