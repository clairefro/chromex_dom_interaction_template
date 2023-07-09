// Add a listener for the browser action button click
chrome.action.onClicked.addListener(function (tab) {
  // Send a message to the content script to highlight the selected text
  chrome.tabs.sendMessage(tab.id, { action: "highlightText" });
});
