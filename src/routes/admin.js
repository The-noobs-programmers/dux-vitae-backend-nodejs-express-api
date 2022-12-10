const express = require("express");
const adminSchema = require("../models/admin");

const router = express.Router();

//Create admin
router.post("/admins", (req, res) => {
  const admin = adminSchema(req.body);
  admin
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Get all admins
router.get("/admins", (req, res) => {
  adminSchema
    .find()
    .then((data) => {
      const newData = data.map((item) => {
        const { _id, rut, name, lastName, email, password, role } = item;
        return { _id, rut, name, lastName, email, password, role };
      });
      res.json(newData);
    })
    .catch((error) => res.status(400).json({ message: error.message }));
});

//Get an admin by id
router.get("/admins/:id", (req, res) => {
  const { id } = req.params;
  adminSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Get an admin by rut
router.get("/admins/:rut", (req, res) => {
  const { rut } = req.params;
  adminSchema
    .findById(rut)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Update an admin with id
router.put("/admins/:id", (req, res) => {
  const { id } = req.params;
  const { rut, name, lastName, email, password } = req.body;
  adminSchema
    .updateOne({ _id: id }, { $set: { rut, name, lastName, email, password } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Delete a client with id
router.delete("/admins/:id", (req, res) => {
  const { id } = req.params;
  adminSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
