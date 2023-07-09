// Add a click event listener to the highlight button
document
  .getElementById("highlightButton")
  .addEventListener("click", function () {
    // Send a message to the content script to highlight the selected text
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "highlightText" });
    });
  });
