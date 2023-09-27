const page_not_found = (req, res) => {
  res.status(404).render("404");
};

module.exports = {
  page_not_found,
};
