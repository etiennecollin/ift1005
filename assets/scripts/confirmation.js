// Etienne Collin | Matricule: 20237904
// Mohamed Labsari | Matricule: 20249734
// Justin Villeneuve | Matricule: 20132792

$(document).ready(function () {
	var orders = JSON.parse(localStorage.getItem("orders"));
	const urlParameters = new URLSearchParams(window.location.search);
	const orderID = urlParameters.get("id");

	$("#greeting").append("Bonjour, " + orders[orderID].firstname + " " + orders[orderID].lastname);
	$("#orderNumber").append(orderID);
});
