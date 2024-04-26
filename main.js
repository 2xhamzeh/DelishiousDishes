const express = require("express");
const app = express();
const userController = require("./controllers/userController");

app.get("/", (req,res)=>{
    res.send("Welcome to the home Page!");
});

app.get("/users/:id", userController.sendUserProfile);

app.post("/sign_up", homeController.userSignUpProcessor);

app.listen(3000);
