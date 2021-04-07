'use strict'
var gRotation = '';
const PACMAN = `<img src="pacman.png" />`;  

var gPacman;
function createPacman(board) {
    // TODO
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false
    }

    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
    if (!gGame.isOn) return
    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev);

    var nextCell = gBoard[nextLocation.i][nextLocation.j];

    // return if cannot move
    if (nextCell === WALL) return;
    // hitting a ghost?  call gameOver
    if (nextCell === GHOST) {
        if(gPacman.isSuper){
            var currGhost = getGhostByLocation(nextLocation)
            eatGhost(currGhost)
            renderCell(currGhost.location, EMPTY)
            updateScore(20)
        }else{
            renderCell(gPacman.location, EMPTY)
            gameOver()
        return
        }
        
    }
    if(nextCell === POWERFOOD){
        if(gPacman.isSuper) return
        gPacman.isSuper = true;
        setTimeout(function() {gPacman.isSuper = false},5000);
        gDeletedGhosts = [];
        setTimeout(aliveGhosts,5000)
    }

    if(nextCell === CHERRY){
        updateScore(10)
    }
    
    if (nextCell === FOOD) {
        updateScore(1)
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // Move the pacman
    // update the model

    gPacman.location = nextLocation;
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;

    // update the DOM
    renderCell(gPacman.location, PACMAN);
    if (checkIfVictory()) {
        var elVictory = document.querySelector('.victory')
        elVictory.style.display = 'block';
        gameOver()
    }
}

function getNextLocation(ev) {
    // figure out nextLocation
    // console.log('ev.code', ev.code)
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (ev.code) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        default: return null
    }
    return nextLocation;
}