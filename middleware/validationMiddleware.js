module.exports = (req, res) => {
  if (
    req.files === null ||
    req.body.title === null ||
    req.body.title === null
  ) {
    return res.redirect("/posts/new");
  }
  next();
};
