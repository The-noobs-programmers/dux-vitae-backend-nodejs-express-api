const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    rut: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
    },
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
    },
    birthday: {
      type: Date,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
