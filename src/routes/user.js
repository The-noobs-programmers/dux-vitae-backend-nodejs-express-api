const express = require("express");
const bcrypt = require("bcrypt");
const userSchema = require("../models/user");

const router = express.Router();

//Create user
router.post("/users", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  const user = new userSchema({
    rut: req.body.rut,
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: password,
    role: req.body.role,
    birthday: req.body.birthday,
    gender: req.body.gender,
    description: req.body.description,
    phone: req.body.phone,
  });
  await user
    .save()
    .then((data) => res.json(data))
    .catch((error) =>
      res.status(400).json({ message: "Rut o email no validos" })
    );
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
router.put("/users/:id", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  const { id } = req.params;
  const {
    rut,
    name,
    lastName,
    email,
    role,
    birthday,
    gender,
    description,
    phone,
  } = req.body;
  await userSchema
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

//CLIENT AND NUTRITIONIST

//Create user with role CLIENT
router.post("/users/addClient", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  const user = new userSchema({
    rut: req.body.rut,
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: password,
    role: "client",
    birthday: req.body.birthday,
    gender: req.body.gender,
    description: req.body.description,
    phone: req.body.phone,
  });
  await user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error.message }));
});

//Creat user with role nutritionist
router.post("/users/addNutritionist", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  const user = new userSchema({
    rut: req.body.rut,
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: password,
    role: "nutritionist",
    birthday: req.body.birthday,
    gender: req.body.gender,
    description: req.body.description,
    phone: req.body.phone,
  });
  await user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error.message }));
});

//Get all users by role
router.get("/users/findUsersByRole/:role", (req, res) => {
  const { role } = req.params;
  userSchema
    .find({ role: role })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error.message }));
});

//Get all users by rut
router.get("/users/findUsersByRut/:rut", (req, res) => {
  const { rut } = req.params;
  userSchema
    .find({ rut: rut })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error.message }));
});

//Update an user with id
router.put("/users/updateByRut/:rut", async (req, res) => {
  const { rut } = req.params;
  const { name, lastName, role, birthday, gender, description, phone } =
    req.body;
  await userSchema
    .updateOne(
      { rut: rut },
      {
        $set: {
          name,
          lastName,
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

//Delete an user with rut
router.delete("/users/deleteByRut/:rut", (req, res) => {
  try {
    const { rut } = req.params;
    userSchema
      .deleteOne({ rut: rut })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  } catch (error) {
    res.status(400);
  }
});

//Update an user client with rut
router.put("/users/updateClientByRut/:rut", async (req, res) => {
  try {
    const { rut } = req.params;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const { name, lastName, email } = req.body;

    await userSchema
      .updateOne(
        { rut: rut },
        {
          $set: {
            name,
            lastName,
            email,
            password,
          },
        }
      )
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  } catch (error) {
    res.status(400);
  }
});

module.exports = router;
