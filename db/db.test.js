const {connect, saveMovie, disconnect} = require("./db");
const Movie = require("../api/models/movies");
const mongoose = require("mongoose");



jest.mock('./db')
beforeAll(async ()=>{
    return await connect();
});

describe("Post Movie", ()=>{
    test("As i User i want to post a Movie", async ()=>{
        const movie = new Movie({
            _id: mongoose.Types.ObjectId(),
            movie: "a tree grows",
            director: "it sure does"
        })
        const newMovie = await saveMovie(movie);
        // expect(newMovie._id).toEquals("12");
        expect(newMovie.movie).toEqual("a tree grows");
        expect(newMovie.director).toEqual("it sure does");

        
    });
    afterAll(async ()=>{
        return await disconnect();
    })
});
