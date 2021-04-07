'use strict'
const WALL = '█';
const FOOD = '.';
const EMPTY = ' ';
const POWERFOOD = '🍔';
const CHERRY = '🍒';

var gCherryInterval;
var gCheckEmptyInterval;
var gBoard;
var gGame = {
    score: 0,
    isOn: false
}
function init() {
    gBoard = buildBoard()
    console.log(gBoard)
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container');
    gGame.isOn = true;
    gGame.score = 0;
    var elRestart = document.querySelector('.restart')
    elRestart.style.display = 'none';
    var elVictory = document.querySelector('.victory')
    elVictory.style.display = 'none';
    gCherryInterval = setInterval(addCherrys, 15000);
}

function buildBoard() {
    var SIZE = 20;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 1 && j === 1 || i === 1 && j === 18 || i === 18 && j === 1 || i === 18 && j === 18) {
                board[i][j] = POWERFOOD;
            }
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 2 && i < SIZE - 3) ||
                j === 16 && i > 2 && i < SIZE - 3 ||
                j > 5 && j < SIZE - 6 && i === 2 ||
                j > 5 && j < SIZE - 6 && i === 17||
                i === 11 && j > 7 && j < 13 ||
                i === 10 && j===8||
                i === 10 && j===12) {
                board[i][j] = WALL;
            }
        }
    }
    return board;
}



function updateScore(diff) {
    // update model
    gGame.score += diff;
    // and dom
    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gCherryInterval)
    gIntervalGhosts = null
    // TODO
    var elRestart = document.querySelector('.restart');
    elRestart.style.display = 'block'
    getEmptyCells(gBoard)
}

function checkIfVictory() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === FOOD) {
                return false;
            }
        }
    }
    return true;
}

function getEmptyCells(gBoard) {
    var emptyCellsLocations = [];
    var location;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === EMPTY) {
                location = { i: i, j: j }
                emptyCellsLocations.push(location);
            }
        }
    }
    return emptyCellsLocations;
}

function addCherry(emptyCellsLocations) {
    if (!emptyCellsLocations) return null
    var shaffled = shuffle(emptyCellsLocations);
    var emptyCell = shaffled.pop();
    var i = emptyCell.i;
    var j = emptyCell.j;
    gBoard[i][j] = CHERRY;
    renderCell(emptyCell, CHERRY)
}

function addCherrys() {
    var emptyCellsLocations = getEmptyCells(gBoard)
    addCherry(emptyCellsLocations);
}

