// Remove this - just for adding color picker functionality in example
const defaultColor = "#FFFF00";

// delcare options
const option1El = document.getElementById("option1");
const option2El = document.getElementById("option2");

const saveButton = document.getElementById("saveButton");
const statusOutput = document.getElementById("status");

var initialOption1Value = option1El.checked;
var initialOption2Value = option2El.value;

option1El.addEventListener("change", checkForChanges);
option2El.addEventListener("change", checkForChanges);

function checkForChanges() {
  console.log({ initialOption1Value, initialOption2Value });
  if (
    option1El.checked !== initialOption1Value ||
    option2El.value !== initialOption2Value
  ) {
    saveButton.disabled = false; // Enable the save button
  } else {
    saveButton.disabled = true; // Disable the save button
  }
}

function resetChangeState() {
  initialOption1Value = option1El.checked;
  initialOption2Value = option2El.value;
}

// Load saved options or set default values
document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.sync.get(["option1", "option2"], function (result) {
    // add deafult vals after ||
    option1El.checked = result.option1 || false;
    option2El.value = result.option2 || defaultColor;

    // disable save button unless options are changed
    resetChangeState();
  });
});

// Save options when the "Save" button is clicked
saveButton.addEventListener("click", function () {
  var option1 = option1El.checked;
  var option2 = option2El.value;

  // Save the options to Chrome storage
  chrome.storage.sync.set({ option1, option2 }, function (e) {
    console.log(e);
    // Notify the user that the options have been saved
    statusOutput.textContent = "Options saved.";
    resetChangeState();

    setTimeout(function () {
      statusOutput.textContent = "";
    }, 2000);
  });
});
