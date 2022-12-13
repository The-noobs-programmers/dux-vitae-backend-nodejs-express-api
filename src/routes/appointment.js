const express = require("express");
const appointmentSchema = require("../models/appointment");

const router = express.Router();

//Create appointment
router.post("/appointments", async (req, res) => {
  const appointment = new appointmentSchema({
    nutritionistRut: req.body.nutritionistRut,
    title: req.body.title,
    description: req.body.description,
    state: req.body.state,
    client: {
      rut: req.body.client.rut,
      name: req.body.client.name,
      lastName: req.body.client.lastName,
      email: req.body.client.email,
      description: req.body.client.description,
    },
  });
  await appointment
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Get all appointment
router.get("/appointments", (req, res) => {
  appointmentSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error.message }));
});

//Get an user by id
router.get("/appointments/:id", (req, res) => {
  const { id } = req.params;
  appointmentSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Update an user with id
router.put("/appointments/:id", async (req, res) => {
  const { id } = req.params;
  const { nutritionistRut, title, description, state } = req.body;
  await appointmentSchema
    .updateOne(
      { _id: id },
      {
        $set: {
          nutritionistRut,
          title,
          description,
          state,
          "client.rut": req.body.client.rut,
          "client.name": req.body.client.name,
          "client.lastName": req.body.client.lastName,
          "client.email": req.body.client.email,
          "client.description": req.body.client.description,
        },
      }
    )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Delete an user with id
router.delete("/appointments/:id", (req, res) => {
  const { id } = req.params;
  appointmentSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Get an appointment by nutritionistRUT
router.get(
  "/appointments/findByNutritionistRut/:nutritionistRut",
  (req, res) => {
    const { nutritionistRut } = req.params;
    appointmentSchema
      .find({ nutritionistRut: nutritionistRut })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  }
);

//Change state of an appointment
router.put("/appointments/updateAppointmentState/:id", async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;
  await appointmentSchema
    .updateOne(
      { _id: id },
      {
        $set: {
          state,
        },
      }
    )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
