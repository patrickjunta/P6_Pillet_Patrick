const Sauce = require("../models/Sauce");
const fs = require("fs");

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => {
      res.status(201).json({
        message: "Sauce updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

/*
- Ne peut pas aimer/disliker deux fois la même chose
 Rechercher la sauce avec son id pour lui attribuer le like findOne() OK
 récupérer l'idSSauce OK
 Condition if(like=1){ etc..}
 push de mongoose 
 après condition modifier la sauce avec les likes updateOne
*/

exports.likeSauce = (req, res, next) => {
  const reqBody = req.body;
  const reqParamsId = req.params.id;
  const sauceObject = req.body.sauce;
  let sauceLikeObject = req.body.like;
  let sauceLikes = Sauce.likes;
  let sauceDisikes = Sauce.dislikes;
  const sauceUserIdObject = req.body.userId;
  let sauceUsersLikedObject = [];
  let sauceUsersDislikedObject = [];
  const reqParams = req.params;

  console.log("sauceLikeObject " + "req.body.like: " + sauceLikeObject);
  console.log("sauceUserIdObject " + "l'userId :" + sauceUserIdObject);
  console.log("sauceObject = req.body.sauce : " + sauceObject);
  console.log("reqParamsId l'id de la sauce: " + reqParamsId);

  if (req.body.like == 1) {
    console.log("cas n1 : " + req.body.like);
    Sauce.updateOne(
      { _id: req.params.id }, //ajouter en premier temps l'id
      { $inc: { likes: 1 }, $push: { usersLiked: sauceUserIdObject } } 
      // UpadateOne ne prend que 2 paramêtres, 
      //le premier ciblle l'objet avec l'id et le 2eme pour modifier(tout mettre à changer ici)
      // ajouter ce qu'il faut changer

      //ex { $inc: { quantity: -2, "metrics.orders": 1 } }
      //ex { $push: { scores: { $each: [ 90, 92, 85 ] } } }
      //ex { $pull: { fruits: { $in: [ "apples", "oranges" ] }, vegetables: "carrots" } }, (pour retirer l'userId)
    )
      .then(() => {
        res.status(201).json({
          message: "Like incremented successfully!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  }

  if(sauceLikeObject === -1){
    Sauce.updateOne(
      { _id: req.params.id }, //ajouter en premier temps l'id
      { $inc: { dislikes: 1 }, $push: { usersDisliked: sauceUserIdObject } } 
      //ex { $pull: { fruits: { $in: [ "apples", "oranges" ] }, vegetables: "carrots" } }, (pour retirer l'userId)
    )
      .then(() => {
        res.status(201).json({
          message: "Dislike incremented successfully!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
   }
};
