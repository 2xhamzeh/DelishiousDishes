const express = require("express");
const app = express();
const userController = require("./controllers/userController");
const layouts = require("express-ejs-layouts");

app.get("/", (req,res)=>{
    res.send("Welcome to the home Page!");
});

app.get("/users/:id", userController.sendUserProfile);
app.post("/sign_up", userController.userSignUpProcessor);
app.get("/name/:myName", userController.respondWithName);

app.use(layouts);
app.set("view engine", "ejs");

app.listen(3000);
