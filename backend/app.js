const express = require("express");
//création d'appli express
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

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
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));


app.use(bodyParser.json());

app.post("/api/sauces", (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: "Objet créé !",
  });
});

app.use("/api/sauces", (req, res, next) => {
  res.status(200).json(sauces);
  next();
});

/* Export avec module.exports = app; pour l'utiliser 
dans d'autres fichiers avec 
const app = require('./app');
*/
module.exports = app; 