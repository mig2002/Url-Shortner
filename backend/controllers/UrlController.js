const Url = require("../models/Url");
const { nanoid } = require("nanoid");

// CREATE SHORT URL
exports.createShortUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;
    const shortCode = nanoid(7);

    const url = new Url({ longUrl, shortCode });
    await url.save();

    res.json({
      shortUrl: `http://localhost:5000/${shortCode}`
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// REDIRECT
exports.redirectUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.code });
    if (!url) return res.status(404).send("Not Found");

    url.clicks++;
    await url.save();

    res.redirect(url.longUrl);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
