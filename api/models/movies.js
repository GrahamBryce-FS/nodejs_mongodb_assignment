const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    movie: {type: String, required: true},
    director: {type: String, required: true}
});

// export model
module.exports = mongoose.model("Movie", movieSchema);