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
		console.log("data successfully retrieved");
		messages = JSON.parse(request.response);
		for (elem in messages) {
			msg_style += '<p><span class = "id">' + messages[elem]['id'] + '</span><span class = "content">' + messages[elem]['content']
				     + '</span><span class = "username">' +  messages[elem]['username'] + '</span></p>' 
		}
		msg_block = document.getElementById("messages");
		msg_block.innerHTML = msg_style;
		console.log("data successfully parsed");
	} else if (request.readyState == 4 && request.status != 200) {
		console.log("ERROR: ready state = ", request.readyState, " status code = ", request.status);
		var err_msg_block = document.getElementById("messages");
		var err_msg = "Oh no! An error occurred . . . <p>ready state = " + request.readyState + "<p>status code = " + request.status;
		err_msg_block.innerHTML = err_msg;
	}
}
