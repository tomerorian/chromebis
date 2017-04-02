var dishes = document.getElementsByClassName("dishNameDiv");
var dish;

for (var i = 0; i < dishes.length; i++) {
	var tempDish = dishes[i];

	if (tempDish.textContent.trim() === chromeBisDishName) {
		dish = tempDish;
	}
}

[dish.parentElement.parentElement.getAttribute("data-categoryid"), dish.parentElement.parentElement.getAttribute("data-dishid"), dish.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("data-res-id")];