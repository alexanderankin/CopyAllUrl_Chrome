document.addEventListener("DOMContentLoaded", () => {
  const actionCopy = document.getElementById("actionCopy");
  const actionPaste = document.getElementById("actionPaste");
  const actionOption = document.getElementById("actionOption");
  const messageBox = document.getElementById("message");

  actionCopy.addEventListener("click", async () => {
    try {
      const tabs = await chrome.tabs.query({ currentWindow: true });
      const urls = tabs.map(tab => tab.url).join("\n");
      await navigator.clipboard.writeText(urls);
      messageBox.className = "";
      messageBox.textContent = "Copied to clipboard!";
    } catch (err) {
      console.error("Failed to copy:", err);
      messageBox.className = "error";
      messageBox.textContent = "Error copying URLs";
    }
  });

  actionPaste.addEventListener("click", () => {
    messageBox.className = "";
    messageBox.textContent = "Paste not implemented";
  });

  actionOption.addEventListener("click", () => {
    messageBox.className = "";
    messageBox.textContent = "Options not implemented";
  });
});
