const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Movie = require("../models/movies")

router.get("/", (req,res,next)=>{
    allMovies = Movie.find({})
    .then(result =>{
        res.status(200).json(result);
    })
    .catch(err =>{
        res.status(500).json({
            error:{
                message: err.message
            }
        })
    });
});

router.post("/",(req,res,next)=>{
    const newMovie = new Movie({
        // this is a method
        _id: mongoose.Types.ObjectId(),
        movie: req.body.movie,
        director: req.body.director
    });
    newMovie.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message:"Movie saved",
            movie:{
                movie: result.movie,
                director: result.director,
                id: result._id,
                metadata:{
                    method:req.method,
                    host: req.hostname
                },
            },
        });
    })
    .catch(err =>{
        console.error(err.message);
        res.status(500).json({
            error:{
                message: err.message
            }
        });
    })
});

router.get("/:movieId",(req,res,next)=>{
    const movieId = req.params.movieId;
    Movie.findById(movieId)
    .then(result =>{
        res.status(200).json({
            message: "Got by Movie Id",
            movie:{
                movie: result.movie,
                director: result.director,
                id: result._id
            },
            metadata:{
                host: req.hostname,
                method: req.method
            }
        })
    })
    .catch(err =>{
        res.status(500).json({
            error:{
                message: err.message
            }
        })
    });
});

router.patch("/:movieId",(req,res,next)=>{
    const movieId = req.params.movieId;
    const updatedMovie = {
        movie: req.body.movie,
        director: req.body.director
    };
    Movie.updateOne({
        _id: movieId
    }, {
        $set: updatedMovie
    }).then(result => {
        res.modifiedCount;
        res.status(200).json({
            message: "Updated Movie",
            movie: { 
                movie: result.movie, 
                director: result.director, 
                id: result._id
            },
            metadata:{
                host: req.hostname,
                method: req.method
            }
        })
    })
    .catch(err =>{
        res.status(500).json({
            error:{
                message: err.message
            }
        })
    });
});

router.delete("/:movieId",(req,res,next)  =>{
    const movieId = req.params.movieId;
    Movie.deleteOne({
        _id: movieId
    }, {
        $delete: mongoose.Movie
    })
    .then(result =>{
        res.status(200).json({
            message: "Deleted Movie",
            movie:{
                movie: result.movie,
                director: result.director,
                id: result._id
            },
            metadata:{
                host: req.hostname,
                method: req.method
            }
        });
    })
    .catch(err =>{
        res.status(500).json({
            error:{
                message: err.message
            }
        });
    });
});

module.exports = router;