const HTML_ESCAPES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#039;",
};

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, match => HTML_ESCAPES[match]);
}

function isValidURL(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

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

  actionPaste.addEventListener("click", async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (!text) {
        messageBox.className = "error";
        messageBox.textContent = "Clipboard is empty";
        return;
      }

      const lines = text
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(line => isValidURL(line));

      if (lines.length === 0) {
        messageBox.className = "error";
        messageBox.textContent = "No valid URLs found";
        return;
      }

      for (const url of lines) {
        chrome.tabs.create({ url });
      }

      messageBox.className = "";
      messageBox.textContent = `Pasted ${lines.length} URLs`;
    } catch (err) {
      console.error("Failed to read clipboard:", err);
      messageBox.className = "error";
      messageBox.textContent = "Error pasting from clipboard";
    }
  });

  actionOption.addEventListener("click", () => {
    messageBox.className = "";
    messageBox.textContent = "Options not implemented";
  });
});
