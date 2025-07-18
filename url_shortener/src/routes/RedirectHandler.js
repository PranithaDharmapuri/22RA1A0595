import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getURLData } from "../utils/shortenerUtils";
import { log } from "../utils/logger";

const RedirectHandler = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const urls = getURLData();
    const item = urls.find((u) => u.shortcode === code);

    if (!item || Date.now() > item.expiresAt) {
      alert("Link expired or not found");
      navigate("/");
      return;
    }

    const updated = urls.map((u) =>
      u.shortcode === code
        ? {
            ...u,
            clicks: [
              ...u.clicks,
              {
                time: Date.now(),
                source: document.referrer || "Direct",
                geo: "IN", // stubbed, normally use IP geolocation
              },
            ],
          }
        : u
    );

    localStorage.setItem("shortenedUrls", JSON.stringify(updated));
    log("Redirection", { code, to: item.original });

    window.location.href = item.original;
  }, [code]);

  return null;
};

export default RedirectHandler;
