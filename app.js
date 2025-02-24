const express = require("express");
const app = express();
const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const User = require("./models/user");
const userRoutes = require("./routes/users");
const verifyToken = require("./midddleware/authMiddleware");

mongoose.connect('mongodb://localhost:27017/my_DB')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(express.json()); 

app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("hehe");
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});