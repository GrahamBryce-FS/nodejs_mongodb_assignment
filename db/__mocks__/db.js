const mongoose = require("mongoose");

const connect = async () => {
    console.log("mocked connection");
};

const saveMovie = async (newMovie) => {
    console.log("saving mocked movie");
    return Promise.resolve({
        _id: mongoose.Types.ObjectId(),
        movie: "a tree grows",
        director: "it sure does"
    });
};

const disconnect = async () => {
    console.log("mocked disconnecting");

}

module.exports = { connect, saveMovie, disconnect };
