/* Assignment 2 - Marauder's Map */
/* COMP 20 - Spring 2015         */
/* Lisa Fukushima                */
/* Last Updated: March 8, 2015   */

// TO DO
// - CHECK load map
// - CHECK get my coords. using nav.geo
// - CHECK send my coord. to database using XMLHttpRequest
// - CHECK get data back
// - CHECK make unique marker w/ image of choice
// -- CHECK step1: make marker
// -- CHECK step2: customize
// - CHECK info window w/ note of login 
// - CHECK repeat for other people
// - CHECK parse said data
// - CHECK display my location w/ image of my choice w/ note of login
// - CHECK display other people's location logins w/ mile(s) away-ness
// - calculate and show miles away-ness

/*********************/
/***** VARIABLES *****/
var my_lat, my_lng, my_pos, my_info;
var my_login = "MarkStruthers";
var my_icon = "./takanoha_small.png"; // this is my family crest, I really like it 
var mmap, mmap_options = { zoom: 15 };
var position, pos_reqs, pos_data;


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
		for (elem in pos_data) {
			displayPos(elem);
		}
	} else if (pos_reqs.readyState == 4 && pos_reqs.status != 200){
		alert("Oh no, an error occurred!");
		console.error("ERROR: ready state = " + pos_reqs.readyState +
			     ", status = " + pos_reqs.status);
	}	
}

/* display the marker and infowindow of each person in pos_data */
function displayPos(elem) {
	var distance = milesAway(elem);
	var login_time = parseLastLogin(elem);
	var content_html = '<div class="infowindow">' +
			   '<h3>' + pos_data[elem]["login"] + ' ' + distance + '</h3>' +
			   '<p>last login: ' + login_time + '</p>' +
			   '</div>';

	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(pos_data[elem]["lat"], pos_data[elem]["lng"]),
		map: mmap,
	});

	var infowindow = new google.maps.InfoWindow({
		content: content_html
	});

	if (elem == 0) { // pos_data[0] is me!
		marker.setIcon(my_icon);
		infowindow.open(mmap, marker);
	}

	google.maps.event.addListener(marker, "click", function() {
		infowindow.open(mmap, marker);
	});
}

/* calculating the distance of others' location from me */
function milesAway(elem) {
	var distance = "(Me!)";

	// Haversine Formula
	var lat1, lat2, dLat, dLng, a, c, kmD, miD;
	var kmR = 6371; // mean radius of Earth in km
	var to_miles = 0.621371; // conversion factor from km to miles
	if (elem != 0) {
		lat1 = toRadians(pos_data[0]["lat"]);
		lat2 = toRadians(pos_data[elem]["lat"]);
		dLat = toRadians(pos_data[elem]["lat"] - pos_data[0]["lat"]);
		dLng = toRadians(pos_data[elem]["lng"] - pos_data[0]["lng"]);
		a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + 
			Math.cos(lat1) * Math.cos(lat2) *
			Math.sin(dLng / 2) * Math.sin(dLng / 2);
		c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		kmD = truncate(kmR * c);
		miD = truncate(kmD * to_miles);
		distance = "(~" + miD + " miles [" + kmD + " km] away from me)";
	}

	return distance;
}

/* simple conversion to radians function */
function toRadians(x) {
	return x * Math.PI / 180;
}

/* truncating value to four values after decimal point */
function truncate(x) {
	var split_x = (x.toString()).split(".");
	var split_decimal = (split_x[1]).split("");
	var str_integer = split_x[0] + ".";
	var str_decimal = split_decimal[0] + split_decimal[1] + split_decimal[2] + split_decimal[3];
	var str_distance = str_integer + str_decimal; 
	return str_distance;
}

/* parse date+time value associated with key 'created_at' */
function parseLastLogin(elem) {
	var split_data, date, year, month, day, time;
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
	return date + " at " + time;
}



