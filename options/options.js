// Load saved options or set default values
document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.sync.get(["option1", "option2"], function (result) {
    document.getElementById("option1").checked = result.option1 || false;
    document.getElementById("option2").value = result.option2 || "";
  });
});

// Save options when the "Save" button is clicked
document.getElementById("saveButton").addEventListener("click", function () {
  var option1 = document.getElementById("option1").checked;
  var option2 = document.getElementById("option2").value;

  // Save the options to Chrome storage
  chrome.storage.sync.set({ option1: option1, option2: option2 }, function () {
    // Notify the user that the options have been saved
    var status = document.getElementById("status");
    status.textContent = "Options saved.";
    setTimeout(function () {
      status.textContent = "";
    }, 2000);
  });
});
