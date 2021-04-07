var WALL = 'WALL';
var FLOOR = 'FLOOR';
var BALL = 'BALL';
var GAMER = 'GAMER';
var GLUE = 'GLUE';
var gBallCount = 0;
var GAMER_IMG = '<img src="img/gamer-purple.png" />';
var BALL_IMG = '<img src="img/pizza.png" />';
var CORONA_IMG = '<img src="img/ballweed.png" />';

var gIsGlue;
var gBoard;
var gGamerPos;
var gIntervalBalls;
var gIntervalRemoveGlue;
function initGame() {
	gIsGlue = false;
	var elVictory = document.querySelector('.victory')
	elVictory.style.display = 'none'
	gGamerPos = { i: 2, j: 9 };
	gBoard = buildBoard();
	renderBoard(gBoard);
	gIntervalBalls = setInterval(addBalls, 1500);
	gIntervalGlue = setInterval(addGlue, 5000);
	
	gBallCount = 0;
}


function buildBoard() {
	// Create the Matrix
	var board = createMat(10, 12)


	// Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			// Put FLOOR in a regular cell
			var cell = { type: FLOOR, gameElement: null };

			// Place Walls at edges
			if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
				cell.type = WALL;
			}

			// Add created cell to The game board
			board[i][j] = cell;
		}
	}

	// Place the gamer at selected position
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	// Place the Balls (currently randomly chosen positions)
	board[3][8].gameElement = BALL;
	board[7][4].gameElement = BALL;
	// Place the passages
	board[0][5].type = FLOOR;
	board[5][0].type = FLOOR;
	board[9][5].type = FLOOR;
	board[5][11].type = FLOOR;

	// console.log(board[6][0])

	console.log(board);
	return board;
}

// Render the board to an HTML table
function renderBoard(board) {

	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })

			// TODO - change to short if statement
			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';

			//TODO - Change To template string
			strHTML += '\t<td class="cell ' + cellClass +
				'"  onclick="moveTo(' + i + ',' + j + ')" >\n';

			// TODO - change to switch case statement
			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG;
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}



	// console.log('strHTML is:');
	// console.log(strHTML);
	var elBoard = document.querySelector('.board');
	elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j, isPassage = false) {

	if (gIsGlue) return 
	var targetCell = gBoard[i][j];
	if (targetCell && targetCell.type === WALL) return;

	// Calculate distance to make sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);
	// If the clicked Cell is one of the four allowed
	if (isPassage || (iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {


		if (targetCell.gameElement === BALL) {
			console.log('Collecting!');
			playSoundCollect()
			gBallCount++;
			var elScore = document.querySelector('.score');
			elScore.innerHTML = 'SCORE: ' + gBallCount;
		}

		if (targetCell.gameElement === GLUE) {
			gIsGlue = true;
			playSoundEvil()
			setTimeout(function () { gIsGlue = false}, 3000 )
		}

		// MOVING from current position
		// Model:
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
		// Dom:
		renderCell(gGamerPos, '');

		// MOVING to selected position

		gGamerPos.i = i;
		gGamerPos.j = j;

		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

		// DOM:
		renderCell(gGamerPos, GAMER_IMG);
		if (checkIfVictory()) stopGame()
	} //else console.log('TOO FAR', iAbsDiff, jAbsDiff);
}

function freezGame() {

}


// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {

	var i = gGamerPos.i;
	var j = gGamerPos.j;


	switch (event.key) {
		case 'ArrowLeft':
			var isLeftPass = i === 5 && j === 0
			moveTo(i, !isLeftPass ? j - 1 : gBoard[0].length - 1, true);
			break;
		case 'ArrowRight':
			var isRightPass = i === 5 && j === 11
			moveTo(i, !isRightPass ? j + 1 : 0, true);
			break;
		case 'ArrowUp':
			var isTopPass = i === 0 && j === 5
			moveTo(!isTopPass ? i - 1 : 9, j, true);
			break;
		case 'ArrowDown':
			var isDownPass = i === 9 && j === 5
			moveTo(!isDownPass ? i + 1 : 0, j, true);
			break;

	}

}
// if (i === 0 && j === 5 || i === 5 && j === 0 || i === 9 && j === 5 || i === 5 && j === 11) {

// }
// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

//TO DO - GET EMPTY CELL
function getEmptyCell(board) {
	var empyCells = []
	for (var i = 0; i < gBoard.length; i++) {
		for (var j = 0; j < gBoard[0].length; j++) {
			if (gBoard[i][j].gameElement === null) {
				// console.log('i: ' + i, 'j: ' + j)
				var cellPos = { i, j }
				empyCells.push(cellPos)
			}
		}
	}
}

function addBalls() {
	var randomI = getRandomInt(1, gBoard.length - 1)
	var randomJ = getRandomInt(1, gBoard[0].length - 1)
	if (gBoard[randomI][randomJ].gameElement === null) {
		gBoard[randomI][randomJ].gameElement = BALL;
		renderCell({ i: randomI, j: randomJ }, BALL_IMG)
	}
}

function addGlue() {

	var randomI = getRandomInt(1, gBoard.length - 1)
	var randomJ = getRandomInt(1, gBoard[0].length - 1)
	if (gBoard[randomI][randomJ].gameElement === null) {
		gBoard[randomI][randomJ].gameElement = GLUE;
		renderCell({ i: randomI, j: randomJ }, CORONA_IMG)
	}

	setTimeout(function () {
		if (gBoard[randomI][randomJ].gameElement === GLUE) {
			gBoard[randomI][randomJ].gameElement = null;
			renderCell({ i: randomI, j: randomJ }, '')
		}
	}, 3000);
}

function removeGlue() {
	for (var i = 0; i < gBoard.length; i++) {
		for (var j = 0; j < gBoard[0].length; j++) {
			if (gBoard[i][j].gameElement === GLUE) {
				gBoard[i][j].gameElement === null
				renderCell({ i: i, j: j }, '')
			}
		}
	}
	return null;
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
}

function checkIfVictory() {
	// console.log(gBoard)
	for (var i = 0; i < gBoard.length; i++) {
		for (var j = 0; j < gBoard[0].length; j++) {
			if (gBoard[i][j].gameElement === BALL) {
				// console.log('i: ' + i, 'j: ' + j)
				return false;
			}
		}
	}
	return true;
}

function stopGame() {
	clearInterval(gIntervalBalls);
	clearInterval(gIntervalGlue)
	var elVictory = document.querySelector('.victory')
	elVictory.style.display = 'block'

}

function playSoundCollect() {
	var collectSFX = new Audio('collectSound.wav')
	collectSFX.play();
}

function playSoundEvil() {
	var evilSFX = new Audio('evil.mp3')
	evilSFX.play();
}