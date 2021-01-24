const express = require("express");
//création d'appli express
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");
const path = require('path');
//CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

mongoose
  .connect(
    "mongodb+srv://patrick-junta:Wealthy77mon@cluster0.4bgvw.gcp.mongodb.net/P6?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, }
  ) //(node:14896) DeprecationWarning: collection.ensureIndex is deprecated.Use createIndexes instead. //useCreateIndex:true,ajouté
  .then(() => console.log("Connexion à MongoDB réussie !")) //output {}
  .catch(() => console.log("Connexion à MongoDB échouée !")); // output undefined

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);



module.exports = app;
