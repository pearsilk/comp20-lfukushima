// Lab 6 - Messages
// Lisa Fukushima
// COMP 20 - Spring 2015

var request;
function parse() {
	request = new XMLHttpRequest();
	request.open("GET", "./data.json", true);
	request.onreadystatechange = parseData;
	request.send();
}

function parseData() {
	if (request.readyState == 4 && request.status == 200) {
		console.log("checking for errors: ", request.readyState, " ", request.status);
	} //else if () {
	//	console.log();
	//}
}
