// Etienne Collin | Matricule: 20237904
// Mohamed Labsari | Matricule: 20249734
// Justin Villeneuve | Matricule: 20132792

// Source: https://stackoverflow.com/a/49258433
// This script was adapted to dynamically apply the "active" style on the nav buttons.
$(document).ready(function () {
	$("nav a").each(function () {
		// For each button, if the href of the button matches the URL of the page...
		if ($(this).prop("href") == window.location.href) {
			$(this).addClass("active");
		} else {
			// Special cases for the root "/", "product.html", "order.html" and "confirmation.html" pages.
			if ($(this).text() == "Accueil") {
				if (window.location.pathname == "/") {
					$(this).addClass("active");
				}
			} else if ($(this).text() == "Produits") {
				if (window.location.pathname == "/product.html") {
					$(this).addClass("active");
				}
			} else if ($(this).prop("title") == "Panier") {
				if (window.location.pathname == "/order.html" || window.location.pathname == "/confirmation.html") {
					$(this).addClass("active");
				}
			}
		}
	});
});

// Updates the badge showing the number of products in the cart
function updateBadge() {
	var cartSize = parseInt(localStorage.getItem("cartSize"));

	if (!cartSize || cartSize == 0 || cartSize === null) {
		$(".count").hide();
	} else {
		$(".count").show();
		$(".count").text(cartSize);
	}
}

$(document).ready(updateBadge);
