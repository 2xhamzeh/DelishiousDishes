const express = require("express");
const app = express();
const userController = require("./controllers/userController");
const errorController = require("./controllers/errorController");

app.use(express.static('public'));

app.get("/", (req,res)=>{
    res.send("Welcome to the home Page!");
});

app.get("/users/:id", userController.sendUserProfile);

app.post("/sign_up", userController.userSignUpProcessor);


app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(3000);
