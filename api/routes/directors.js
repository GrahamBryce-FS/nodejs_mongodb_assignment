const express = require("express");
const router = express.Router();
const Director= require("../models/movies");
const mongoose = require("mongoose");
const messages = require("../../messages/messages");
const { director_deleted, director_update, director_saved, already_exists } = require("../../messages/messages");

router.get("/",(req,res,next)=>{
    allDirectors = Director.find({})
    .select("director _id")
    .populate("movie", "movie director")
    .exec()
    .then(result => {
        res.status(200).json(result)
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
    Director.find({
        movie: req.body.movie,
        director: req.body.director
    })
    .then(result => {
        console.log(result);
        if(result.length > 0){
            return res.status(400).json({
                message: already_exists
            })
        }
        const newDirector = new Director({
            _id: mongoose.Types.ObjectId(),
            movie: req.body.movie,
            director: req.body.director
        });
        newDirector.save()
        .then(result=>{
            console.log(result);
            res.status(200).json({
                        message: director_saved,
                        director:{
                            director: result.director,
                            movie: result.movie,
                            id: result._id}
            })
        })
        .catch(err =>{
            console.error(err.message);
            res.status(500).json({
                error:{
                    message: err.message
                }
            });
        })
    })
    .catch(err => {
        console.error(err.message);
        res.status(500).json({
            error:{
                message: "unable to save directors work with the title of "+ req.body.movie
            }
        })
    });
});

router.get("/:directorId",(req,res,next)=>{
    const directorId = req.params.directorId;
    Director.findById(directorId)
    .select("director _id")
    .populate("movie", "movie director")
    .exec()
    .then(director=>{
        if(!director){
            console.log(director);
            return res.status(404).json({
                message: messages.director_not_found
            })
        }
        res.status(201).json({
            director: director
        });
        console.log(director);
    })
    .catch(err => {
        res.status(500).json({
            error: {
                message: err.message,
            }
        })
    });
});

router.patch("/:directorId",(req,res,next)=>{
    const directorId = req.params.directorId;
    const updatedDirector = {
        movie: req.body.movie,
        director: req.body.director
    };
    Director.updateOne({
        _id: directorId
    }, {
        $set: updatedDirector
    })
    .select("director _id")
    .populate("movie", "movie director")
    .exec()
    .then(result => {
        res.modifiedCount;
        res.status(200).json({
            message: director_update,
            director: {
                director: result.director,
                movie: result.movie,
                id: result._id
            },
            metadata:{
                host: req.hostname,
                method:req.method
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

router.delete("/:directorId",(req,res,next)=>{
    const directorId = req.params.directorId;
    Director.deleteOne({
        _id: directorId
    })
    .then(result =>{
        if(!director){
            console.log(director);
            return res.status(404).json({
                message: messages.director_not_found
            })
        };
        res.status(200).json({
            message: director_deleted,
            url:"http://localhost:3000/directors/"+directorId
        })
    })
    .catch(err => {
        res.status(500).json({
            error: {
                message: err.message,
            }
        })
    });
});

module.exports = router;