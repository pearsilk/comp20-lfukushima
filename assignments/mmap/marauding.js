// Assignment 2 - Marauder's Map
// COMP 20 - Spring 2015
// Lisa Fukushima
// March 6, 2015

function unfoldMap() {
	var tufts = new google.maps.LatLng(42.407484, -71.119023);
	var mapOptions = {
		center: tufts,
		zoom: 8
	};

	var map = new google.maps.Map(document.getElementById('marauders-map'), mapOptions);
}
