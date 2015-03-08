/* Assignment 2 - Marauder's Map */
/* COMP 20 - Spring 2015         */
/* Lisa Fukushima                */
/* Last Updated: March 7, 2015   */

// TO DO
// - CHECK load map
// - CHECK get my coords. using nav.geo
// - CHECK send my coord. to database using XMLHttpRequest
// - CHECK get data back
// - CHECK make unique marker w/ image of choice
// -- CHECK step1: make marker
// -- CHECK step2: customize
// - CHECK info window w/ note of login 
// - repeat for other people
// - parse said data
// - display my location w/ image of my choice w/ note of login
// - display other people's location logins w/ mile(s) away-ness

// anon username = MarkStruthers

/*********************/
/***** VARIABLES *****/
var my_lat, my_lng;
var my_pos, position;
var my_login = "MarkStruthers";
var my_icon = "./takanoha_small.png"; // this is my family crest, I really like it 
var my_info;
//var my_mark, my_window;
//var other_mark, other_window;
var mmap;
var mmap_options = { zoom: 15 };
var pos_reqs, pos_data;


/**********************/
/***** FIRST STEP *****/

/* initializing and loading mmap        */
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
	mmap.setCenter(my_pos); // center and load map on my position
	updateDataFeed();
}

/**********************/
/***** THIRD STEP *****/

/* sending and retrieving data from datastore */
function updateDataFeed() {
	my_info = "login=" + my_login + "&lat=" + my_lat + "&lng=" + my_lng;
	pos_reqs = new XMLHttpRequest();
	pos_reqs.open("POST", "https://secret-about-box.herokuapp.com/sendLocation", true);
	pos_reqs.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	pos_reqs.onreadystatechange = parseData;
	pos_reqs.send(my_info);
}

/* parse the JSON data retrieved from datastore */
function parseData() {
	if (pos_reqs.readyState == 4 && pos_reqs.status == 200) {
		pos_data = JSON.parse(pos_reqs.responseText);
		var split_data, date, year, month, day, time;
		for (elem in pos_data) {
			parseLastLogin(elem, split_data, date, year, month, day, time);
			displayPos(elem, date, time);
		}
	} else if (pos_reqs.readyState == 4 && pos_reqs.status != 200){
		alert("Oh no, an error occurred!");
		console.error("ERROR: ready state = " + pos_reqs.readyState +
			     ", status = " + pos_reqs.status);
	}	
}

/* parse value associated with key 'created_at' */
function parseLastLogin(elem, split_data, date, year, month, day, time) {
	split_data = pos_data[elem]["created_at"].split("T");
	date = split_data[0].split("-");
	year = date[0];
	day = date[2];
	month = date[1]; 
	switch (month) {
		case "01": month = "Jan"; break;
		case "02": month = "Feb"; break;
		case "03": month = "Mar"; break;
		case "04": month = "Apr"; break;
		case "05": month = "May"; break;
		case "06": month = "Jun"; break;
		case "07": month = "Jul"; break;
		case "08": month = "Aug"; break;
		case "09": month = "Sep"; break;
		case "10": month = "Oct"; break;
		case "11": month = "Nov"; break;
		case "12": month = "Dec"; break;
	}
	date = month + " " + day + ", " + year;
	time = (split_data[1].split("Z"))[0] + " GMT";
	return true;
}

/* displaying my marker and info window on the map */
/*function displayMyPos() {
	var content_html = '<div class="infowindow">' +
			   '<h3>' + my_data["login"] + '</h3>' +
			   '<p>last login: ' + date + ' at ' + time + '</p>' +
			   '</div>';

	my_mark = new google.maps.Marker({
		position: new google.maps.LatLng(my_data["lat"], my_data["lng"]),
		map: mmap,
		icon: my_icon,
	});

	my_window = new google.maps.InfoWindow({
		content: content_html
	});

	google.maps.event.addListener(my_mark, "click", function() {
		my_window.open(mmap, my_mark);
	});
}
*/

function displayPos(elem, date, time) {
	var content_html = '<div class="infowindow">' +
			   '<h3>' + pos_data[elem]["login"] + '</h3>' +
			   '<p>last login: ' + date + ' at ' + time + '</p>' +
			   '</div>';

	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(pos_data[elem]["lat"], pos_data[elem]["lng"]),
		map: mmap,
	});

//add miles away
	var infowindow = new google.maps.InfoWindow({
		content: content_html
	});

	if (elem == 0) {
		marker.setIcon(my_icon);
		infowindow.open(mmap, marker);
	}

	google.maps.event.addListener(marker, "click", function() {
		infowindow.open(mmap, marker);
	});
}


