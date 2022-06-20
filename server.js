// Dependencies
require('dotenv').config();
const { PORT = 3001, DATABASE_URL } = process.env
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

// Database Connection
mongoose.connect(DATABASE_URL);

mongoose.connection
    .on("open", ()=> console.log("MongoDB Connected"))
    .on("close", () => console.log("Connection Closed"))
    .on("error", ()=> console.log(error))

    // Model Schema
const PeopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String
});

const People = mongoose.model("People", PeopleSchema)

// Middleware
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

//ROUTES
app.get("/", (req, res) => {
    res.send("Hello World")
})

// IDUCS

//Index
app.get("/people", async (req, res) => {
    try {
        //get all people from database
        res.json(await People.find({}));
    }  catch (error) {
        // send error to user only if error
        res.status(400).json(error)
    }
})

//Delete
app.delete("/people/:id", async (req, res) => {
    try{
        res.json(await People.findByIdAndDelete(req.params.id))
    } catch{
        res.status(400).json(error)
    }
})

//Update
app.put("/people/:id", async(req,res)=>{
    try{
        res.json(await People.findByIdAndUpdate(req.params.id, req.body, {new: true}))
    } catch {
        res.status(400).json(error)
    }
})
//Create
app.post("/people", async (req, res)=> {
    try {
        res.json(await People.create(req.body));
    } catch (error) {
        res.status(400).json(error)
    }
})

// Show
app.get("/people/:id", async (req, res) => {
    try{
        res.json(await People.findById(req.params.id))
    }catch{
        res.status(400).json(error)
    }
})

// Listener
app.listen(PORT, ()=> console.log(`Listening on port ${PORT}...`))
