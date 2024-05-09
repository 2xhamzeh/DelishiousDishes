exports.sendUserProfile = (req, res) => {

    // this code is to be replaced once we have user profiles and a data base
    // instead of sending a text we should send a page that displays the users' profile
    let id = req.params.id;
    res.send(`This is the profile for the user with the ID ${id}`);
}

exports.userSignUpProcessor =(req, res) => {
  // this code is to be replaced once we have user profiles and a data base
  // instead of sending a text we should send a page that displays the users' profile
  console.log(req.body);
  res.send("Sign-up Successful!");
};

// passing content from the controller to the view and displaying it with a view template
exports.respondWithName = (req, res) => {
    let paramsName = req.params.myName;
    res.render("index", { name: paramsName });
};

exports.respondWithContactInfo = (req, res) => {
  res.render("contact", {email: "cuisinefire@gmail.com", phone: "01734450128"});
}
