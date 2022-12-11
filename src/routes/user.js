const express = require("express");
const userSchema = require("../models/user");

const router = express.Router();

//Create user
router.post("/users", (req, res) => {
  const user = userSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Get all users
router.get("/users", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error.message }));
});

//Get an user by id
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Update an user with id
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const {
    rut,
    name,
    lastName,
    email,
    password,
    role,
    birthday,
    gender,
    description,
    phone,
  } = req.body;
  userSchema
    .updateOne(
      { _id: id },
      {
        $set: {
          rut,
          name,
          lastName,
          email,
          password,
          role,
          birthday,
          gender,
          description,
          phone,
        },
      }
    )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Delete an user with id
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//******************************************************************************************************** */

//CLIENT

//Create user with role CLIENT
router.post("/users/clients", (req, res) => {
  const user = new userSchema({
    rut: req.body.rut,
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    role: "client",
    birthday: req.body.birthday,
    gender: req.body.gender,
    description: req.body.description,
    phone: req.body.phone,
  });
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Get all CLIENTS
// router.get("/users/clients", (req, res) => {
//   userSchema
//     .find({ role: "client" })
//     .then((data) => res.json(data))
//     .catch((error) => res.json({ message: error.message }));
// });

module.exports = router;
