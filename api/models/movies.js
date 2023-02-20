const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    movie: String,
    director: String
});

// export model
module.exports = mongoose.model("Movie", movieSchema);