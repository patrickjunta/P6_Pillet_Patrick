const mongoose = require("mongoose");
//const uniqueValidator = require("mongoose-unique-validator");

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },//, unique: true
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: false }, // changement de required: true en false
  dislikes: { type: Number, required: false },
  usersLiked: { type: Array, required: false },
  usersDisliked: { type: Array, required: false } // changement de type: [String] en Array
});

//sauceSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Sauce", sauceSchema);
