const express = require("express");
const bcrypt = require("bcrypt");
const adminSchema = require("../models/admin");

const router = express.Router();

//Create admin
router.post("/admins", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  const admin = new adminSchema({
    rut: req.body.rut,
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: password,
    role: req.body.role,
  });
  await admin
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
router.get("/admins/findAdminByRut/:rut", (req, res) => {
  const { rut } = req.params;
  adminSchema
    .find({ rut: rut })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error.message }));
});

// //Update an admin with id
// router.put("/admins/:id", async (req, res) => {
//   const { id } = req.params;
//   const salt = await bcrypt.genSalt(10);
//   const passwordEncrypted = await bcrypt.hash(req.body.password, salt);
//   const admin = new adminSchema({
//     rut: req.body.rut,
//     name: req.body.name,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     password: passwordEncrypted,
//   });

//   await admin
//     .updateOne({ _id: id }, { $set: { rut, name, lastName, email, password } })
//     .then((data) => res.json(data))
//     .catch((error) => res.json({ message: error }));
// });

//Delete a client with id
router.delete("/admins/:id", (req, res) => {
  const { id } = req.params;
  adminSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
