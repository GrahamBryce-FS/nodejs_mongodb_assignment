const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const movieRoutes = require("../api/routes/movies");
const directorRoutes = require("../api/routes/directors");

app.use(morgan("dev"))

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    
    if(req.method === "OPTIONS"){
        res.header("Access-Control_Allow_Methods", "POST,PUT,GET,PATCH,DELETE");
    }
    next();
});


app.get("/", (req,res,next)=>{
    res.status(201).json({
        message:"service is up!!!",
        method: req.method
    });
});

app.use("/directors", directorRoutes);
app.use("/movies", movieRoutes);

app.use((req,res,next)=>{
    const error = new Error("NOT FOUND!!");
    error.status = 404;
    next(error)
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500).json({
        error:{
            message: error.message,
            status: error.status,
        },
    });
});

mongoose.connect(process.env.mongoDBURL, (err)=>{
    if(err){
        console.error("Error: ", err.message);
    }
    else{
        console.log("MONGO CONNECTED")
    }
});
module.exports = app;