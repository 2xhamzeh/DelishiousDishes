// return index.html
exports.homePage = (req, res) => {
  res.render("index", { name: "You" });
};

// return contact page
exports.contactPage = (req, res) => {
  res.render("contact", {
    email: "info@us.com",
    phone: "0123456789",
  });
};
