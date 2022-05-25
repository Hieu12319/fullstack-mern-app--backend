// Dependencies
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();

//ROUTES
app.get("/", (req, res) => {
    res.send("Hello World")
})

// Listener
app.listen(PORT, ()=> console.log(`Listening on port ${PORT}...`))
