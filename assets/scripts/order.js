// Etienne Collin | Matricule: 20237904
// Mohamed Labsari | Matricule: 20249734
// Justin Villeneuve | Matricule: 20132792

// Executed on successful form submission
function placeOrder(form) {
	var orders = JSON.parse(localStorage.getItem("orders"));

	// if orders doesn't exist, create an empty object to store the order data
	if (!orders || orders === null) {
		orders = {};
	}

	var orderID = Object.keys(orders).length + 1;

	// Place cart content in the order
	orders[Number(orderID)] = {
		firstname: form.firstname.value,
		lastname: form.lastname.value,
	};

	// Store the order in localStorage
	localStorage.setItem("orders", JSON.stringify(orders));

	// Empty cart
	cart = {};
	cartSize = 0;
	// Store the updated cart data in localStorage
	localStorage.setItem("cart", JSON.stringify(cart));
	localStorage.setItem("cartSize", JSON.stringify(cartSize));

	// Apply changes
	updateBadge();
	window.location.href = "confirmation.html?id=" + orderID;
}

// Add custom validator for credit card expiration field
jQuery.validator.addMethod(
	"creditCardExpiration",
	function (value, element) {
		return this.optional(element) || /^0[1-9]|1[0-2][\/][0-9][0-9]$/.test(value);
	},
	"La date d'expiration de votre carte de crédit est invalide."
);

// Validate form fields
$(document).ready(function () {
	$("#orderForm").validate({
		rules: {
			firstname: { required: true },
			lastname: { required: true },
			email: { required: true },
			phone: { required: true },
			creditcard: { required: true },
			creditcardexpiry: { required: true, creditCardExpiration: true },
		},
		submitHandler: function (form) {
			placeOrder(form);
		},
	});
});
