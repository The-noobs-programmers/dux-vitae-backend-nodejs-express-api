const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema(
  {
    nutritionistRut: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    state: {
      type: Boolean,
    },
    client: {
      rut: {
        type: String,
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
      description: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("appointments", appointmentSchema);
