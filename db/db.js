const mongoose = require('mongoose');
require('dotenv').config();

const connect = async () => {
    return await mongoose.connect(process.env.mongoDBURL);
};

const saveMovie = async (newMovie) => {
    console.log("saving real movie");
    return await newMovie.save();
};

const disconnect = async () => {
    console.log("real disconnecting");
    await mongoose.connection.close;
}

module.exports = { connect, saveMovie, disconnect };
