export const log = (message, data = {}) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    message,
    ...data
  };
  // send this to your backend or localstorage or file (not console.log)
  window.localStorage.setItem(`log-${Date.now()}`, JSON.stringify(logEntry));
};
