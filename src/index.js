const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const loginRoutes = require("./routes/login");
const appointmentRoutes = require("./routes/appointment");
const dashboardRoutes = require("./routes/dashboard");

const app = express();
const port = process.env.PORT || 9000;

mongoose.set("strictQuery", false);

//Middlewares
app.use(express.json()); //Para poder usar json
app.use(express.urlencoded({ extended: false }));
//Middleware para permitir direcciones http, header, métodos
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "*");
  response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  app.use(
    cors({
      origin: "*",
    })
  );
  next();
});
app.use("/api", adminRoutes);
app.use("/api", userRoutes);
app.use("/api", loginRoutes);
app.use("/api", appointmentRoutes);
app.use("/api", dashboardRoutes);

//routes
app.get("/", (req, res) => {
  res.send("holita");
});

//MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));

//Escucha desde una puerta especifica
app.listen(port, () => console.log("Server listening on port ", port));
