/* Assignment 2 - Marauder's Map */
/* COMP 20 - Spring 2015         */
/* Lisa Fukushima                */
/* Last Updated: March 7, 2015   */

// TO DO
// - CHECK load map
// - CHECK get my coords. using nav.geo
// - send my coord. to database using XMLHttpRequest
// - get data back
// - parse said data
// - display my location w/ image of my choice w/ note of login
// - display other people's location logins w/ mile(s) away-ness

// anon username = MarkStruthers

/*********************/
/***** VARIABLES *****/
var map;
var my_pos, my_lat, my_lng;
var my_login = "MarkStruthers";
var my_data;
var pos_reqs, pos_data;


/**********************/
/***** FIRST STEP *****/

/* initializing and loading map */
function unfoldMap() {
	var tufts = new google.maps.LatLng(42.407484, -71.119023);
	var map_options = {
		center: tufts,
		zoom: 8
	};

	map = new google.maps.Map(document.getElementById('marauders-map'), map_options);

	findMyPos(); // STEP 2
}

/***********************/
/***** SECOND STEP *****/

/* getting my coordinates */
function findMyPos() {
	if (navigator.geolocation) { // check for geolocation support
		console.log("got here");
		navigator.geolocation.getCurrentPosition(defineMyPos);
	} else {
		alert("It appears that your browser does not support geolocation. Bummer.");
	}
}

/* 'success' callback function for getCurrentPosition() */
function defineMyPos(my_pos) {
	//my_lat = my_pos.coords.latitude;
	//my_lng = my_pos.coords.longitude;
	//updateDataFeed(); // STEP 3
	//var msg = "My lat: " + my_lat + " and my lng: " + my_lng;
	console.log("got here");
}

/**********************/
/***** THIRD STEP *****/

/* sending and retrieving data from datastore */
/*function updateDataFeed() {
	my_data = "login=" + my_login + "&lat=" + my_lat + "&lng=" + my_lng;
	pos_reqs = new XMLHttpRequest();
	pos_reqs.open("POST", "https://secret-about-box.herokuapp.com/sendLocation", true);
	pos_reqs.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	//pos_reqs.onreadystatechange = parseData;
	console.log(my_data);
	pos_reqs.send(my_data);
}
*/
/* parse the JSON data retrieved from datastore */
/*function parseData() {
	if (pos_reqs.readyState == 4 && pos_reqs.status == 200) {
	//	pos_data = pos_reqs.responseText;
	//	console.log(pos_data);
		console.log("got here");
	} else if (pos_reqs.readyState == 4 && pos_reqs.status != 200){
		alert("Oh no, an error occurred!");
		console.warn("ERROR: ready state = " + pos_reqs.readyState +
			     ", status = " + pos_reqs.status);
	}	
}

*/

























