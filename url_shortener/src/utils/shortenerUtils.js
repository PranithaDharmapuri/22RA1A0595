const storeKey = "shortenedUrls";

export const generateShortCode = () => Math.random().toString(36).substr(2, 5);

export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const saveURLData = (data) => {
  const current = JSON.parse(localStorage.getItem(storeKey) || "[]");
  localStorage.setItem(storeKey, JSON.stringify([...current, ...data]));
};

export const getURLData = () => JSON.parse(localStorage.getItem(storeKey) || "[]");
