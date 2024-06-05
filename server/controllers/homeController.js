module.exports = {
  // return index.html (for now redirect to frontend)
  homePage: (req, res) => {
    res.redirect("http://localhost:5173/");
  },
};
