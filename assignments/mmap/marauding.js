/* Assignment 2 - Marauder's Map */
/* COMP 20 - Spring 2015         */
/* Lisa Fukushima                */
/* Last Updated: March 7, 2015   */

// TO DO
// - load map CHECK
// - send my coord. to database using navigator.geolocation
// - XMLHttpRequest
// - display my location w/ image of my choice w/ note of login
// - display other people's location logins w/ mile(s) away-ness


/* initializing and loading map */
var map;
function unfoldMap() {
	var tufts = new google.maps.LatLng(42.407484, -71.119023);
	var map_options = {
		center: tufts,
		zoom: 8
	};

	map = new google.maps.Map(document.getElementById('marauders-map'), map_options);

	findMyPos();
}

/* getting my coordinates */
var my_pos;
function findMyPos() {
	if (navigator.geolocation) { // check for geolocation support
		navigator.geolocation.getCurrentPosition(defineMyPos);
	} else {
		alert("Mr. Moony presents his compliments to Professor Snape and " +
		      "begs him to keep his abnormally large nose out of other " +
		      "people's business.\n\nIn other words, it appears that your " + 
		      "browser does not support geolocation (or mischief-making) " +
		      "so the Marauder's Map will not unfold for thou. Bummer.");
	}
}

/* 'success' callback function for getCurrentPosition() */
var my_lat, my_lng;
function defineMyPos(my_pos) {
	my_lat = my_pos.coords.latitude;
	my_lng = my_pos.coords.longitude;
	//var msg = "My lat: " + my_lat " and my lng: " + my_lng;
	console.log("hello");
}



