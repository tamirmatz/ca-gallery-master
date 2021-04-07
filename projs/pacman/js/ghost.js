'use strict'
const GHOST = '&#9781;'
var gDeletedGhosts = [];
var gGhosts = []
var gIntervalGhosts;
function createGhost(board) {
    // TODO
    

    var ghost = {
        location: {
            i: 10,
            j: 10
        },
        currCellContent: FOOD,
        color: randomColor()
    }
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;

}
function randomColor() {
    var ghostsColors = ['green', 'red', 'pink', 'orange'];
    var randColor = getRandomIntInclusive(1, 4)
    if (randColor === 1) {
        return ghostsColors[0];
    } else if (randColor === 2) {
        return ghostsColors[1];
    } else if (randColor === 3) {
        return ghostsColors[2];
    } else if (randColor === 4) {
        return ghostsColors[3];
    }
    return null
}

function createGhosts(board) {
    // TODO: 3 ghosts and an interval
    gGhosts = [];
    for(var i = 0; i<5; i++){
        createGhost(board);
    }

    gIntervalGhosts = setInterval(moveGhosts, 1000)

}

function moveGhosts() {
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }


}
function moveGhost(ghost) {
    // figure out moveDiff, nextLocation, nextCell

    var moveDiff = getMoveDiff();

    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j

    }

    var nextCell = gBoard[nextLocation.i][nextLocation.j];

    // return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    // hitting a pacman?  call gameOver
    if (nextCell === PACMAN) {
        gameOver();
        return
    }

    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent

    // update the DOM
    renderCell(ghost.location, ghost.currCellContent);

    // Move the ghost
    // update the model

    ghost.location = nextLocation;
    ghost.currCellContent = nextCell;

    gBoard[ghost.location.i][ghost.location.j] = GHOST;

    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))

}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}
function eatGhost(ghost){
    for(var i = 0; i < gGhosts.length; i++){
        if(ghost === gGhosts[i]){
            var deletedGhost = gGhosts.splice(i,1);
            gDeletedGhosts.push(deletedGhost);
        }
    }
    return null;
}

function aliveGhosts(){
    for(var i = 0; i < gDeletedGhosts.length; i++){
        createGhost(gBoard);
    }
}

function getGhostByLocation(location){
    var i = location.i;
    var j = location.j;
    var index;
    
    for(var y = 0; y < gGhosts.length; y++){
        if(gGhosts[y].location.i === i && gGhosts[y].location.j === j){
            index = y;
            return gGhosts[y];
        }
    }
    return null;
}

function getGhostHTML(ghost) {
    if(gPacman.isSuper === true) return `<span style= color:blue >${GHOST}</span>`
    return `<span style= color:${ghost.color} >${GHOST}</span>`
}