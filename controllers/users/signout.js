module.exports = (req, res) => {
  let session = req.session;
  session.destroy();
  res.redirect("/");
  res.send("signout");
};
