module.exports = (req, res, next) => {
  const { longUrl } = req.body;
  const regex = /^(http|https):\/\/[^ "]+$/;

  if (!regex.test(longUrl)) {
    return res.status(400).json({ error: "Invalid URL" });
  }
  next();
};
