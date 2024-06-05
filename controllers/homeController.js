module.exports = {
  // return index.html
  homePage: (req, res) => {
    res.render("index", { name: "You" });
  },
  // return contact page
  contactPage: (req, res) => {
    res.render("contact", {
      email: "info@us.com",
      phone: "0123456789",
    });
  },
};
