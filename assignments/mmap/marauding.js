/* Assignment 2 - Marauder's Map */
/* COMP 20 - Spring 2015         */
/* Lisa Fukushima                */
/* Last Updated: March 7, 2015   */

// TO DO
// - CHECK load map
// - CHECK get my coords. using nav.geo
// - CHECK send my coord. to database using XMLHttpRequest
// - CHECK get data back
// - make unique MARKER w/ image of choice
// -- CHECK step1: make marker
// -- step2: customize)
// - parse said data
// - display my location w/ image of my choice w/ note of login
// - display other people's location logins w/ mile(s) away-ness

// anon username = MarkStruthers

/*********************/
/***** VARIABLES *****/
var my_lat, my_lng;
var my_pos, position;
var my_login = "MarkStruthers";
var my_icon = "./takanoha.png";
var my_data;
var my_mark;
var mmap;
var mmap_options = { zoom: 15 };
var pos_reqs, pos_data;


/**********************/
/***** FIRST STEP *****/

/* initializing and loading mmap        */
/* - load map after finding my position */
function unfoldMap() {
	mmap = new google.maps.Map(document.getElementById('marauders-map'), mmap_options);
	findMyPos();
}

/***********************/
/***** SECOND STEP *****/

/* getting my coordinates */
function findMyPos() {
	if (navigator.geolocation) { // check for geolocation support
		navigator.geolocation.getCurrentPosition(defineMyPos);
	} else {
		alert("It appears that your browser does not support geolocation. Bummer.");
	}
}

/* 'success' callback function for getCurrentPosition() */
function defineMyPos(position) {
	my_lat = position.coords.latitude;
	my_lng = position.coords.longitude;
	my_pos = new google.maps.LatLng(my_lat, my_lng);
	mmap.setCenter(my_pos); // center map on my position
	updateDataFeed();
}

/**********************/
/***** THIRD STEP *****/

/* sending and retrieving data from datastore */
function updateDataFeed() {
	my_data = "login=" + my_login + "&lat=" + my_lat + "&lng=" + my_lng;
	pos_reqs = new XMLHttpRequest();
	pos_reqs.open("POST", "https://secret-about-box.herokuapp.com/sendLocation", true);
	pos_reqs.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	pos_reqs.onreadystatechange = parseData;
	pos_reqs.send(my_data);
}

/* parse the JSON data retrieved from datastore */
function parseData() {
	if (pos_reqs.readyState == 4 && pos_reqs.status == 200) {
		pos_data = JSON.parse(pos_reqs.responseText);

		my_mark = new google.maps.Marker({
			position: my_pos,
			map: mmap,
			icon: my_icon,
			title: "BOO",
			content: "foo!"
		});

		for (elem in pos_data) {
			console.log(pos_data[elem]['login']);
		}
		// - INFO WINDOW w/ note of login 
//		alert(pos_data);
	} else if (pos_reqs.readyState == 4 && pos_reqs.status != 200){
		alert("Oh no, an error occurred!");
		console.error("ERROR: ready state = " + pos_reqs.readyState +
			     ", status = " + pos_reqs.status);
	}	
}








