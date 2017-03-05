var restId;
var categoryId
var dishId;

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

function setCommand(command) {
  document.getElementById('command').textContent = command; 
}

document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.getSelected(null, function(tab) {
    var queryString = /^[^#?]*(\?[^#]+|)/.exec(tab.url)[1];

    restId = getParameterByName(queryString, "resId");
    setRest(restId);

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
            categoryId = dishDiv[0][0];
            dishId = dishDiv[0][1];
            setCategory(categoryId);
            setDish(dishId);
            setCommand(`./main.py --rest ${restId} --cat ${categoryId} --dish ${dishId}`)
          });
      });
  });
});
