"use strict";

function setCLSearchAction(searchTxt, searchCat, searchCatAll) {
	var query = document.getElementById('query').value;

	if (query) {
		document.getElementById("clsearch").action = "/" + searchTxt + "/" + searchCat + "/" + query.toLowerCase();
	} else {
		document.getElementById("clsearch").action = "/" + searchTxt + "/" + searchCatAll;
	}

	return true;
}

// Geo-Location of User
function getUserLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(setUserLocation);
	}
}

function setUserLocation(position) {
	$('#clsearch input[name="geolocation"]').val(position.coords.latitude + ',' + position.coords.longitude);
}

$('#clsearch input[name="geolocation"]').click(function () {
	getUserLocation();
});
//# sourceMappingURL=app.js.map
