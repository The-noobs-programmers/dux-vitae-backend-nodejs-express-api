const express = require("express");
const userSchema = require("../models/client");

const router = express.Router();

//Create client
router.post("/clients", (req, res) => {
  const client = userSchema(req.body);
  client
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Get all clients
router.get("/clients", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Get a client
router.get("/clients/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Update a client with id
router.put("/clients/:id", (req, res) => {
  const { id } = req.params;
  const { rut, name, lastName, email, password } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: { rut, name, lastName, email, password } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Delete a client with id
router.delete("/clients/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
