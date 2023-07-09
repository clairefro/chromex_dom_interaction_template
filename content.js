// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "highlightText") {
    const highlightedText = window.getSelection().toString();

    // Create a <span> element around the highlighted text with a yellow background
    const span = document.createElement("span");
    span.style.backgroundColor = "yellow";
    span.textContent = highlightedText;

    // Replace the highlighted text with the <span> element
    const range = window.getSelection().getRangeAt(0);
    range.deleteContents();
    range.insertNode(span);
  }
});
