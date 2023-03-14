// Etienne Collin | Matricule: 20237904
// Mohamed Labsari | Matricule: 20249734
// Justin Villeneuve | Matricule: 20132792

function generateList(data) {
	// Empty product list before appending new content to it.
	$("#productlist").empty();

	// Iterate through every product
	$.each(data, function (index, product) {
		// Create the product card HTML elements
		const productCard = $("<a>", {
			class: "product-card",
			id: product.id,
			href: "product.html?id=" + product.id,
		});
		const productName = $("<p>", { class: "name", text: product.name });
		const productImage = $("<img>", { src: "assets/img/" + product.image, alt: product.name });
		const productPrice = $("<p>", { class: "price", text: product.price });

		// Append the product image, name, and price to the product card
		productCard.append(productName, productImage, productPrice);

		// Append the product card to the page
		$("#productlist").append(productCard);
		$("#totalProducts").text(Object.keys(data).length + " produits");
	});
}

function prepareJSON(category, key, isAscending) {
	$.getJSON("data/products.json", function (data) {
		// Do not filter if category "all" is selected
		if (category != "all") {
			// Remove products that do not fit category
			data = data.filter(function (product) {
				return product.category == category;
			});
		}

		// Following function adapted from: https://stackoverflow.com/a/9188211
		data.sort(function (a, b) {
			// The returned is used by the sort() function to reorder the objects correctly in the final, sorted array.
			// Return 1 tells sort() that a should come *before* b in the final, sorted array.
			// Return -1 tells sort() that a should come *after* b in the final, sorted array.
			// Return 0 tells sort() that the order of a and b does not matter in the final, sorted array.
			// These explanations are for an ascending ordering.
			var aValue = a[key];
			var bValue = b[key];

			// If key to sort by is a string, convert it to lowercase to prevent a from being inserted after Z.
			if (typeof aValue == "string" && typeof bValue == "string") {
				aValue = aValue.toLowerCase();
				bValue = bValue.toLowerCase();
			}

			// If order is descending, swap aValue and bValue
			if (!isAscending) {
				var temp = aValue;
				aValue = bValue;
				bValue = temp;
			}

			// Sort
			if (aValue > bValue) {
				return 1;
			} else if (aValue < bValue) {
				return -1;
			} else {
				return 0;
			}
		});

		// Generate the product list with the sorted data
		generateList(data);
	});
}

function updateList(category, key, ascending) {
	// Reset selection of buttons
	$("#productcategories>button.selected").removeClass("selected");
	$("#productcriteria>button.selected").removeClass("selected");

	// Select right buttons
	$("#" + category).addClass("selected");

	if (ascending) {
		var sortTag = key + "Asc";
	} else {
		var sortTag = key + "Desc";
	}
	$("#" + sortTag).addClass("selected");

	prepareJSON(category, key, ascending);
}

// Default values
var category = "all";
var key = "price";
var ascending = true;

// Default value for buttons
$(document).ready(function () {
	updateList(category, key, ascending);
});

// Event handlers
// Categories
$(document).on("click", "#cameras", function () {
	category = "cameras";
	updateList(category, key, ascending);
});

$(document).on("click", "#consoles", function () {
	category = "consoles";
	updateList(category, key, ascending);
});
$(document).on("click", "#screens", function () {
	category = "screens";
	updateList(category, key, ascending);
});
$(document).on("click", "#computers", function () {
	category = "computers";
	updateList(category, key, ascending);
});
$(document).on("click", "#all", function () {
	category = "all";
	updateList(category, key, ascending);
});

// Sorting
$(document).on("click", "#priceAsc", function () {
	key = "price";
	ascending = true;
	updateList(category, key, ascending);
});
$(document).on("click", "#priceDesc", function () {
	key = "price";
	ascending = false;
	updateList(category, key, ascending);
});
$(document).on("click", "#nameAsc", function () {
	key = "name";
	ascending = true;
	updateList(category, key, ascending);
});
$(document).on("click", "#nameDesc", function () {
	key = "name";
	ascending = false;
	updateList(category, key, ascending);
});
