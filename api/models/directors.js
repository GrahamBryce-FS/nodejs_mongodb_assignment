const mongoose = require("mongoose");

const directorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    movie: {
        // this might be wrong below
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true
    },
    director: {
        type: String,
        required: true
    }
});

// export model
module.exports = mongoose.model("Director", directorSchema);