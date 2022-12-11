const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const userSchema = require("../models/user");

const router = express.Router();

const schemaLogin = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

// LOGIN
router.post("/login", async (req, res) => {
  // Validaciones de login
  const { error } = schemaLogin.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  // Validaciond e existencia
  const user = await userSchema.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

  // Validacion de password en la base de datos
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({ error: "Constraseña invalida" });

  res.json({
    error: null,
    data: "Succesfull login",
    status: 200,
    rut: user.rut,
    role: user.role,
    name: user.name,
    lastName: user.lastName,
    email: user.email,
  });
});

module.exports = router;
