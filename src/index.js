const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const clientRoutes = require("./routes/client");

const app = express();
const port = process.env.PORT || 9000;

mongoose.set("strictQuery", false);

//Middlewares
app.use(express.json()); //Para poder usar json
app.use("/api", clientRoutes);

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
