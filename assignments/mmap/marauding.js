/* Assignment 2 - Marauder's Map */
/* COMP 20 - Spring 2015         */
/* Lisa Fukushima                */
/* Last Updated: March 7, 2015   */

// TO DO
// - CHECK load map
// - CHECK get my coords. using nav.geo
// - send my coord. to database using XMLHttpRequest
// - display my location w/ image of my choice w/ note of login
// - display other people's location logins w/ mile(s) away-ness

// anon username = MarkStruthers

/*********************/
/***** VARIABLES *****/
var map;
var my_pos;
var my_lat, my_lng;
var my_login = "MarkStruthers";
var my_info = "login=" + my_login + "&lat=" + my_lat + "&lng=" + my_lng;
var pos_info;


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

	findMyPos(); // next step
}

/***********************/
/***** SECOND STEP *****/

/* getting my coordinates */
function findMyPos() {
	if (navigator.geolocation) { // check for geolocation support
		navigator.geolocation.getCurrentPosition(defineMyPos);
		//something
	} else {
		alert("It appears that your browser does not support geolocation. Bummer.");
	}
}

/* 'success' callback function for getCurrentPosition() */
function defineMyPos(my_pos) {
	my_lat = my_pos.coords.latitude;
	my_lng = my_pos.coords.longitude;
	var msg = "My lat: " + my_lat + " and my lng: " + my_lng;
	console.log(msg);
}

/**********************/
/***** THIRD STEP *****/

/* sending and retrieving info from datastore */
function updateDataFeed() {
	pos_info = new XMLHttpRequest();
	pos_info.open("POST", "https://secret-about-box.herokuapp.com/sendLocation", true);
	pos_info.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	pos_info.onreadystatechange = parseData;
	pos_info.send(my_info);
}

/* parse the JSON data retrieved from datastore */
function parseData() {
	console.log("Got here!");
}



























