import { useEffect, useState } from "react";
import { shortenUrl } from "../service/api";
import "../styles/UrlForm.css";

const UrlForm = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  
  useEffect(() => {
    document.body.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleSubmit = async () => {
    try {
      const res = await shortenUrl(longUrl);
      setShortUrl(res.data.shortUrl);
    } catch (error) {
      alert("Error shortening URL");
    }
  };

  return (
    <div className="container">
      {/* 🌗 Theme Toggle */}
      <button
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>

      <h1 className="title">Short Url Services</h1>
        <br />
      <div className="input-group">
        <input
          type="text"
          placeholder="Paste URL to shorten"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button onClick={handleSubmit}>Cut</button>
      </div>

      {shortUrl && (
        <div className="result">
          <p>Your short URL</p>
          <a href={shortUrl} target="_blank" rel="noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
