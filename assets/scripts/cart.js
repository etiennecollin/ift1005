// Etienne Collin | Matricule: 20237904
// Mohamed Labsari | Matricule: 20249734
// Justin Villeneuve | Matricule: 20132792

function updateTable() {
	var cartTotal = 0;
	var cart = JSON.parse(localStorage.getItem("cart"));
	var cartSize = parseInt(localStorage.getItem("cartSize"));

	// If cart is empty, do not display table
	if (!cartSize || !cart || cartSize == 0 || Object.keys(cart).length == 0) {
		$("#cartSection").hide();
		const emptyMessage = $("<p>", { text: "Aucun produit dans le panier." });
		$("#main").append(emptyMessage);
	} else {
		$.getJSON("data/products.json", function (data) {
			// Empty the table
			$("#cartBody").empty();
			$("#cartSection").show();

			// Create a new array of product objects containing the cart with the data of the JSON
			var products = [];
			for (var key in cart) {
				$.each(data, function (index, productJSON) {
					if (productJSON.id == key) {
						products.push(productJSON);
						return false; // Stop the loop
					}
				});
			}

            // Sorting the products
			// Following function adapted from: https://stackoverflow.com/a/9188211
			products.sort(function (a, b) {
				// The returned is used by the sort() function to reorder the objects in the final, sorted array.
				// Return 1 tells sort() that a should come *before* b in the final, sorted array.
				// Return -1 tells sort() that a should come *after* b in the final, sorted array.
				// Return 0 tells sort() that the order of a and b does not matter in the final, sorted array.
				// These explanations are for an ascending ordering.
				var aValue = a.name;
				var bValue = b.name;

				// If key to sort by is a string, convert it to lowercase to prevent a from being inserted after Z.
				if (typeof aValue == "string" && typeof bValue == "string") {
					aValue = aValue.toLowerCase();
					bValue = bValue.toLowerCase();
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

			// Start adding rows
			for (var i = 0; i < products.length; i++) {
				var product = products[i];
				var productQty = cart[product.id].quantity;

				const tableRow = $("<tr>");

				// "Remove from cart" column of table
				const colX = $("<td>");
				const colXButton = $("<button>", {
					id: "remove" + product.id,
					class: "remove-item-button",
				});
				const colXButtonIcon = $("<i>", { class: "fa fa-times", "aria-hidden": "true" });
				colX.append(colXButton.append(colXButtonIcon));

				// "Name of product" column of table
				const colProduct = $("<td>");
				const colProductName = $("<a>", {
					class: "product-name",
					href: "product.html?id=" + product.id,
					text: product.name,
				});
				colProduct.append(colProductName);

				// "Price" column of table
				const colPrice = $("<td>", { text: product.price + " $" });

				// "Qty of product" column of table
				const colQty = $("<td>");

				// Normal "Minus" button
				const colMinusButton = $("<button>", {
					id: "minus" + product.id,
					class: "remove-quantity-button",
				});
				// Greyed-out "Minus" button when qty <= 1
				const colMinusButtonGreyed = $("<button>", {
					id: "minus" + product.id,
					class: "greyed-out",
				});
				const colMinusButtonIcon = $("<i>", { class: "fa fa-minus", "aria-hidden": "true" });


				// "Plus" button
				const colPlusButton = $("<button>", {
					id: "plus" + product.id,
					class: "add-quantity-button",
				});
				const colPlusButtonIcon = $("<i>", { class: "fa fa-plus", "aria-hidden": "true" });

				// Display greyed-out minus button only if qty is <= 1
				if (productQty > 1) {
					colQty.append(colMinusButton.append(colMinusButtonIcon));
				} else {
                    colQty.append(colMinusButtonGreyed.append(colMinusButtonIcon));
                }
				colQty.append(productQty);
				colQty.append(colPlusButton.append(colPlusButtonIcon));

				// Total price of product column of table
				var itemTotal = (Number(productQty) * Number(product.price)).toFixed(2);
				const colTotal = $("<td>", { text: itemTotal + " $" });

				// Update cart Total
				cartTotal += Number(itemTotal);

				// Place row inside table
				tableRow.append(colX, colProduct, colPrice, colQty, colTotal);
				$("#cartBody").append(tableRow);
			}
			// Update the line stating the total amount of the cart
			$("#cartTotal")
				.empty()
				.append(Number(cartTotal).toFixed(2) + " $");
		});
	}
}

function removeFromCart(productID) {
	confirmation = confirm("Voulez- vous supprimer le produit du panier ?");
	if (confirmation) {
		var cartSize = parseInt(localStorage.getItem("cartSize"));
		var cart = JSON.parse(localStorage.getItem("cart"));

		// Update cartSize
		cartSize -= cart[Number(productID)].quantity;

		// Remove product from cart
		delete cart[Number(productID)];

		// store the updated cart data in localStorage
		localStorage.setItem("cart", JSON.stringify(cart));
		localStorage.setItem("cartSize", JSON.stringify(cartSize));

		// Apply changes
		updateTable();
		updateBadge();
	}
}

function subOneQty(productID) {
	var cartSize = parseInt(localStorage.getItem("cartSize"));
	var cart = JSON.parse(localStorage.getItem("cart"));

	// Decrement the quantity
	if (cart[Number(productID)]) {
		cart[Number(productID)].quantity -= 1;
	}

	// Update cartSize
	cartSize -= 1;

	// store the updated cart data in localStorage
	localStorage.setItem("cart", JSON.stringify(cart));
	localStorage.setItem("cartSize", JSON.stringify(cartSize));

	// Apply changes
	updateTable();
	updateBadge();
}

function addOneQty(productID) {
	var cartSize = parseInt(localStorage.getItem("cartSize"));
	var cart = JSON.parse(localStorage.getItem("cart"));

	// Increment the quantity
	if (cart[Number(productID)]) {
		cart[Number(productID)].quantity += 1;
	}

	// Update cartSize
	cartSize += 1;

	// store the updated cart data in localStorage
	localStorage.setItem("cart", JSON.stringify(cart));
	localStorage.setItem("cartSize", JSON.stringify(cartSize));

	// Apply changes
	updateTable();
	updateBadge();
}

function emptyCart() {
	confirmation = confirm("Voulez vous supprimer tous les produits du panier ?");
	if (confirmation) {
		// Empty cart
		cart = {};
		cartSize = 0;
		localStorage.setItem("cart", JSON.stringify(cart));
		localStorage.setItem("cartSize", JSON.stringify(cartSize));

		// Apply changes
		updateTable();
		updateBadge();
	}
}

$(document).ready(updateTable);
$(document).on("click", ".remove-item-button", function () {
	removeFromCart(this.id.replace(/\D/g, ""));
});
$(document).on("click", ".remove-quantity-button", function () {
	subOneQty(this.id.replace(/\D/g, ""));
});
$(document).on("click", ".add-quantity-button", function () {
	addOneQty(this.id.replace(/\D/g, ""));
});
$(document).on("click", ".remove-all-items-button", emptyCart);
