if (!console) {
	console = {};
}
var logger = document.getElementById('log');
console.log = function (message) {
	if (typeof message == 'object') {
		logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : String(message)) + '<br />';
	} else {
		logger.innerHTML += message + '<br />';
	}
};
console.log("Started!");

var gameState = 'start';
var multiplayer = false;
if (confirm("Multiplayer?"))
	multiplayer = true;
console.log("Multiplayer: " + multiplayer);
var paddle_1 = document.querySelector('.paddle_1');
var paddle_2 = document.querySelector('.paddle_2');
var board = document.querySelector('.board');
var initial_ball = document.querySelector('.ball');
var ball = document.querySelector('.ball');
var score_1 = document.querySelector('.player_1_score');
var score_2 = document.querySelector('.player_2_score');
var message = document.querySelector('.message');
var paddle_1_coord = paddle_1.getBoundingClientRect();
var paddle_2_coord = paddle_2.getBoundingClientRect();
var initial_ball_coord = ball.getBoundingClientRect();
var ball_coord = initial_ball_coord;
var board_coord = board.getBoundingClientRect();
var paddle_common =
	document.querySelector('.paddle').getBoundingClientRect();

var dx = Math.floor(Math.random() * 4) + 3;
var dy = Math.floor(Math.random() * 4) + 3;
var dxd = Math.floor(Math.random() * 2);
var dyd = Math.floor(Math.random() * 2);
console.log("Grabbed items");

document.addEventListener('keydown', (e) => {
if (e.key == 'Enter') {
	gameState = gameState == 'start' ? 'play' : 'start';
	if (gameState == 'play') {
	message.innerHTML = 'Game Started';
	message.style.left = 42 + 'vw';
	requestAnimationFrame(() => {
		dx = Math.floor(Math.random() * 4) + 3;
		dy = Math.floor(Math.random() * 4) + 3;
		dxd = Math.floor(Math.random() * 2);
		dyd = Math.floor(Math.random() * 2);
		moveBall(dx, dy, dxd, dyd);
	});
	}
}
if (gameState == 'play') {
	if (multiplayer) {
		if (e.key == 'w') {
			paddle_1.style.top =
				Math.max(
				board_coord.top,
				paddle_1_coord.top - window.innerHeight * 0.06
				) + 'px';
			paddle_1_coord = paddle_1.getBoundingClientRect();
			}
			if (e.key == 's') {
			paddle_1.style.top =
				Math.min(
				board_coord.bottom - paddle_common.height,
				paddle_1_coord.top + window.innerHeight * 0.06
				) + 'px';
			paddle_1_coord = paddle_1.getBoundingClientRect();
			}
		}
	}
	if (e.key == 'ArrowUp') {
	paddle_2.style.top =
		Math.max(
		board_coord.top,
		paddle_2_coord.top - window.innerHeight * 0.1
		) + 'px';
	paddle_2_coord = paddle_2.getBoundingClientRect();
	}
	if (e.key == 'ArrowDown') {
	paddle_2.style.top =
		Math.min(
		board_coord.bottom - paddle_common.height,
		paddle_2_coord.top + window.innerHeight * 0.1
		) + 'px';
	paddle_2_coord = paddle_2.getBoundingClientRect();
	}
});
console.log("Keylistener added");

function moveBall(dx, dy, dxd, dyd) {
if (ball_coord.top <= board_coord.top) {
	dyd = 1;
}
if (ball_coord.bottom >= board_coord.bottom) {
	dyd = 0;
}
if (
	ball_coord.left <= paddle_1_coord.right &&
	ball_coord.top >= paddle_1_coord.top &&
	ball_coord.bottom <= paddle_1_coord.bottom
) {
	dxd = 1;
	dx = Math.floor(Math.random() * 4) + 3;
	dy = Math.floor(Math.random() * 4) + 3;
}
if (
	ball_coord.right >= paddle_2_coord.left &&
	ball_coord.top >= paddle_2_coord.top &&
	ball_coord.bottom <= paddle_2_coord.bottom
) {
	dxd = 0;
	dx = Math.floor(Math.random() * 4) + 3;
	dy = Math.floor(Math.random() * 4) + 3;
}
if (
	ball_coord.left <= board_coord.left ||
	ball_coord.right >= board_coord.right
) {
	if (ball_coord.left <= board_coord.left) {
	score_2.innerHTML = +score_2.innerHTML + 1;
	} else {
	score_1.innerHTML = +score_1.innerHTML + 1;
	}
	gameState = 'start';

	ball_coord = initial_ball_coord;
	ball.style = initial_ball.style;
	message.innerHTML = 'Press Enter to Play Pong';
	message.style.left = 38 + 'vw';
	return;
}
ball.style.top = ball_coord.top + dy * (dyd == 0 ? -1 : 1) + 'px';
ball.style.left = ball_coord.left + dx * (dxd == 0 ? -1 : 1) + 'px';
ball_coord = ball.getBoundingClientRect();
requestAnimationFrame(() => {
	if (!multiplayer)
	{
		paddle_1.style.top = ball_coord.top + "px";
		paddle_1.style.bottom = ball_coord.bottom + "px";
	}
	moveBall(dx, dy, dxd, dyd);
});
}
Console.log("Update function done");
document.getElementById("pressenter").text = "Press Enter To Play Pong";
Debug.Log("Ready to play!");
