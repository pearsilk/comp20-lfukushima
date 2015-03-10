// Lab 6 - Messages
// Lisa Fukushima
// COMP 20 - Spring 2015
// March 9, 2015

var request;
function parse() {
	var req_url = "./data.json"; // local file
	//var req_url = "http://messagehub.herokuapp.com/messages.json"; // remote file
	request = new XMLHttpRequest();
	request.open("GET", req_url, true);
	request.onreadystatechange = parseData;
	request.send();
}

function parseData() {
	if (request.readyState == 4 && request.status == 200) {
		var messages = JSON.parse(request.response);
		var msg_style = "";
		for (elem in messages) {
			msg_style += '<p><span class = "id">' + messages[elem]['id']
				     + '</span> <span class = "content">' + messages[elem]['content']
				     + '</span> <span class = "username">' +  messages[elem]['username']
				     + '</span></p>';
		}
		msg_block = document.getElementById("messages");
		msg_block.innerHTML = msg_style;
	} else if (request.readyState == 4 && request.status != 200) {
		console.log("ERROR: ready state = ", request.readyState, " status code = ", request.status);
		var err_msg_block = document.getElementById("messages");
		var err_msg = "Oh no! An error occurred . . . <p>ready state = " + request.readyState
			      + "<p>status code = " + request.status;
		err_msg_block.innerHTML = err_msg;
	}
}
