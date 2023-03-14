// Etienne Collin | Matricule: 20237904
// Mohamed Labsari | Matricule: 20249734
// Justin Villeneuve | Matricule: 20132792

// Loads the product page with the proper information
$(document).ready(function () {
	// get the product ID from localStorage and convert it back to an integer
    const urlParameters = new URLSearchParams(window.location.search);
    const productID = urlParameters.get("id");

	$.getJSON("data/products.json", function (data) {
		var foundMatch = false
        $.each(data, function (index, product) {
			if (product.id == productID) {
                foundMatch = true
				const productImage = $("<img>", {
					class: "no-stretch",
					src: "assets/img/" + product.image,
					alt: product.name,
					width: "100%",
					height: "auto",
				});

				// Generate list of characteristics
				$.each(product.features, function (index, feature) {
					const listItem = $("<li>", { text: feature });
					$("#productCharacteristics").append(listItem);
				});

				// Append the description to the page
				$("#productName").append(product.name);
				$("#productImage").append(productImage);
				$("#productDescription").append(product.description);
				$("#productPrice").append(product.price);
			}
		});
        if (!foundMatch) {
            $("#main").empty()
            const emptyMessage = $("<h3>", { text: "Page non trouvée!" });
			$("#main").append(emptyMessage);
        }
	});
});

function addToCart(form) {
	// Get value from form
	var qty = form.qty.value;

	// Get values from localStorage
	const productID = new URLSearchParams(window.location.search).get("id");
	var cartSize = parseInt(localStorage.getItem("cartSize"));
	var cart = JSON.parse(localStorage.getItem("cart"));

	// if the cart doesn't exist, create an empty object to store the cart data
	if (!cart || cart === null) {
		cart = {};
	}
	// if the product is already in the cart, increment the quantity
	if (cart[Number(productID)]) {
		cart[Number(productID)].quantity += Number(qty);
	}
	// otherwise, add the product to the cart with a quantity of qty
	else {
		cart[Number(productID)] = {
			quantity: Number(qty),
		};
	}

	// if the cartSize doesn't exist, initialize it with qty
	if (!cartSize || cartSize === null) {
		cartSize = Number(qty);
	}
	// otherwise, add qty to cartQty
	else {
		cartSize += Number(qty);
	}

	// store the updated cart data in localStorage
	localStorage.setItem("cart", JSON.stringify(cart));
	localStorage.setItem("cartSize", JSON.stringify(cartSize));

	// Update display
	updateBadge();

	// Create dialog box display it
	var dialog = $("<h3>", {class: "dialog-box", text: "Le produit a été ajouté au panier!"});
    dialog.append(dialog)
	$("main").append(dialog);

	// Remove the dialog box after 5 seconds
	setTimeout(function () {
		dialog.remove();
	}, 5000);
}