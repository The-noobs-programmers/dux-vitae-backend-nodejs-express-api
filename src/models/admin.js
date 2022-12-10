const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  rut: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "admin",
  },
});

module.exports = mongoose.model("Admin", adminSchema);
