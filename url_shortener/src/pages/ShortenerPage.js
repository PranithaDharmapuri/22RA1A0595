import React, { useState } from "react";
import URLForm from "../components/URLForm";
import { Box, Typography, Link } from "@mui/material";

const ShortenerPage = () => {
  const [results, setResults] = useState([]);

  return (
    <Box p={4}>
      <URLForm onResult={setResults} />
      {results.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">Results</Typography>
          {results.map((r, i) => (
            <Typography key={i}>
              <Link href={`/${r.shortcode}`}>http://localhost:3000/{r.shortcode}</Link> – Expires:{" "}
              {new Date(r.expiresAt).toLocaleString()}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ShortenerPage;
