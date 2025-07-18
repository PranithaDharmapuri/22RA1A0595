import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { generateShortCode, validateURL, saveURLData } from "../utils/shortenerUtils";
import { log } from "../utils/logger";

const URLForm = ({ onResult }) => {
  const [urls, setUrls] = useState([{ longUrl: "", shortcode: "", validity: "" }]);
  const [errors, setErrors] = useState([]);

  const handleChange = (index, field, value) => {
    const copy = [...urls];
    copy[index][field] = value;
    setUrls(copy);
  };

  const addField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { longUrl: "", shortcode: "", validity: "" }]);
    }
  };

  const handleSubmit = () => {
    const results = [];
    const newErrors = [];

    urls.forEach((u, i) => {
      if (!validateURL(u.longUrl)) {
        newErrors[i] = "Invalid URL";
        return;
      }
      const code = u.shortcode || generateShortCode();
      const validityMinutes = parseInt(u.validity) || 30;
      const now = Date.now();
      const expiry = now + validityMinutes * 60000;

      results.push({
        original: u.longUrl,
        shortcode: code,
        createdAt: now,
        expiresAt: expiry,
        clicks: [],
      });

      log("Shortened URL created", { original: u.longUrl, code });
    });

    if (newErrors.length) {
      setErrors(newErrors);
      return;
    }

    saveURLData(results);
    onResult(results);
    setUrls([{ longUrl: "", shortcode: "", validity: "" }]);
    setErrors([]);
  };

  return (
    <Box>
      <Typography variant="h5">Shorten URLs</Typography>
      {urls.map((url, i) => (
        <Box key={i} mb={2}>
          <TextField
            label="Long URL"
            value={url.longUrl}
            onChange={(e) => handleChange(i, "longUrl", e.target.value)}
            fullWidth
            error={!!errors[i]}
            helperText={errors[i]}
            margin="normal"
          />
          <TextField
            label="Custom Shortcode (Optional)"
            value={url.shortcode}
            onChange={(e) => handleChange(i, "shortcode", e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Validity (Minutes)"
            value={url.validity}
            onChange={(e) => handleChange(i, "validity", e.target.value)}
            fullWidth
            margin="normal"
          />
        </Box>
      ))}
      <Button onClick={addField}>Add Another</Button>
      <Button variant="contained" onClick={handleSubmit} sx={{ ml: 2 }}>
        Shorten
      </Button>
    </Box>
  );
};

export default URLForm;
