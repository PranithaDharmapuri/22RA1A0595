import React from "react";
import { getURLData } from "../utils/shortenerUtils";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";

const URLStats = () => {
  const urls = getURLData();

  return (
    <Box>
      <Typography variant="h5">URL Statistics</Typography>
      {urls.map((u, i) => (
        <Card key={i} sx={{ mt: 2 }}>
          <CardContent>
            <Typography>Short URL: <Link to={`/${u.shortcode}`}>http://localhost:3000/{u.shortcode}</Link></Typography>
            <Typography>Original: {u.original}</Typography>
            <Typography>Created At: {new Date(u.createdAt).toLocaleString()}</Typography>
            <Typography>Expires At: {new Date(u.expiresAt).toLocaleString()}</Typography>
            <Typography>Total Clicks: {u.clicks.length}</Typography>
            {u.clicks.map((c, idx) => (
              <Typography key={idx} fontSize={14}>
                Clicked at {new Date(c.time).toLocaleString()} from {c.source} ({c.geo})
              </Typography>
            ))}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default URLStats;
