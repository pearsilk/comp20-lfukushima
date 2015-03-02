//Lab 5 - Ms Pacman
//Javascript
//Lisa Fukushima
//March 3, 2015

var document;
function init() {
	var game_cnvs = document.getElementById('game_canvas');
	if (game_cnvs.getContext) {
		var game_ctx = game_cnvs.getContext('2d');
		var game_img = new Image();
		
		game_img.src = "./pacman10-hp-sprite.png";
		game_img.addEventListener("load", function () {
			//blue board
			game_ctx.drawImage(game_img, 322, 0, 464, 138, 0, 0, 464, 138);
			//Ms PacMan
			game_ctx.drawImage(game_img, 82, 23, 15, 15, 282, 55, 15, 15);
		}, false);
	}
}
