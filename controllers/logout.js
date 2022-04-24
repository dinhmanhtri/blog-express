module.exports = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  })
}

// req.session.destroy() xóa tất cả dữ liệu liên quan session, session user id