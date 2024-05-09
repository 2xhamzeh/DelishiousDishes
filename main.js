const express = require("express");
const app = express();
const userController = require("./controllers/userController");
const errorController = require("./controllers/errorController");

app.use(express.static('public'));
const layouts = require("express-ejs-layouts");

app.get("/", (req,res)=>{
    res.send("Welcome to the home Page!");
});

app.get("/users/:id", userController.sendUserProfile);

app.post("/sign_up", userController.userSignUpProcessor);
app.get("/name/:myName", userController.respondWithName);
app.get("/contact", userController.respondWithContactInfo);

app.use(layouts);
app.set("view engine", "ejs");


app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(3000);
