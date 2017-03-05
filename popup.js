function getParameterByName(queryString, name) {
    // Escape special RegExp characters
    name = name.replace(/[[^$.|?*+(){}\\]/g, '\\$&');
    // Create Regular expression
    var regex = new RegExp("(?:[?&]|^)" + name + "=([^&#]*)");
    // Attempt to get a match
    var results = regex.exec(queryString);
    return decodeURIComponent(results[1].replace(/\+/g, " ")) || '';
}

function setRest(restId) {
  document.getElementById('restId').textContent = restId;
}

function setCategory(categoryId) {
  document.getElementById('categoryId').textContent = categoryId;
}

function setDish(dishId) {
  document.getElementById('dishId').textContent = dishId;
}

document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.getSelected(null, function(tab) {
    var queryString = /^[^#?]*(\?[^#]+|)/.exec(tab.url)[1];

    setRest(getParameterByName(queryString, "resId"));

    chrome.tabs.executeScript(null, 
      { 
        code: "var x = document.getElementsByClassName(\"dishContent_dishName\"); if (x.length > 0) { var chromeBisDishName = x[0].textContent; }" 
      }, 
      function(ignore) {
        chrome.tabs.executeScript(null, 
          {
            file: "getDishInfo.js"
          },
          function(dishDiv) {
            setCategory(dishDiv[0][0]);
            setDish(dishDiv[0][1]);
          });
      });
  });
});
