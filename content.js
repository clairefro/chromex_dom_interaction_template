// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "highlightText") {
    chrome.storage.sync
      // get user's selected color
      .get("option2")
      .then(async (store) => {
        const defaultColor = await getDefaultColor();
        const color = store.option2 || defaultColor;

        // Get selected text
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          highlightSelection(selection, color);
        }
      })

      .catch((e) => console.log(e));
  }
});

async function getDefaultColor() {
  let constants;

  try {
    // chrome's silly way of fetching local resources
    resourceUrl = await chrome.runtime.getURL("resources/constants.json");
    const res = await fetch(resourceUrl);
    constants = await res.json();
  } catch (e) {
    alert(
      "Something went wrong when getting app constants. Defaulting to yellow"
    );
    console.log(e);
  }

  let defaultColor = "#FFFF00"; // absolute default
  if (constants) {
    defaultColor = constants.defaultColor;
  }
  return defaultColor;
}

function highlightSelection(selection, color) {
  // Create a new range based on the selection
  const highlightedText = selection.toString();

  // Create a new span element for the highlight
  const span = document.createElement("span");
  span.style.backgroundColor = color;
  span.textContent = highlightedText;

  // Replace the highlighted text with the <span> element
  const range = selection.getRangeAt(0);
  range.deleteContents();
  range.insertNode(span);
}
