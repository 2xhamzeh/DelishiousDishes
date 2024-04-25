const express = require("express");
const app = express();

app.get("/", (req,res)=>{
    res.send("Welcome to the home Page!");
});

app.listen(3000);