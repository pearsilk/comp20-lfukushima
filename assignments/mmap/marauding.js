// Assignment 2 - Marauder's Map
// COMP 20 - Spring 2015
// Lisa Fukushima
// March 6, 2015

var map;
var tufts = new google.maps.LatLng(42.407484, -71.119023);
var mapOptions = {
	center: tufts,
	zoom: 8
};

function unfoldMap() {
	console.log("Before map");
	map = new google.maps.Map(document.getElementById('marauders-map'), mapOptions);
	console.log("After map");
}
