var gNums;
var gNumsL;
var gCounter = 1;
var gTime;
var gInterval;

function init() {
    gTime = 0;
    gNums = createNums();
    gNumsL = gNums.length;
    renderBoard(gNums);
    gCounter = 1;
}

function easy() {
    gameOver();
    playSound();
    init()
}

function medium() {
    playSound();
    gTime = 0;
    gNums = createNumsMedium();
    gNumsL = gNums.length;
    renderBoard(gNums);
    gCounter = 1;
}

function hard() {
    playSound();
    gTime = 0;
    gNums = createNumsHard();
    gNumsL = gNums.length;
    renderBoard(gNums);
    gCounter = 1;
}

function createNums() {
    var nums = []
    for (var i = 1; i <= 16; i++) {
        nums.push(i)
    }
    var shaffledNums = shuffle(nums);
    return shaffledNums;
}

function createNumsMedium() {
    var nums = []
    for (var i = 1; i <= 25; i++) {
        nums.push(i)
    }
    var shaffledNums = shuffle(nums);
    return shaffledNums;
}

function createNumsHard() {
    var nums = []
    for (var i = 1; i <= 36; i++) {
        nums.push(i)
    }
    var shaffledNums = shuffle(nums);
    return shaffledNums;
}

function createNums() {
    var nums = []
    for (var i = 1; i <= 16; i++) {
        nums.push(i)
    }
    var shaffledNums = shuffle(nums);
    return shaffledNums;
}

function renderBoard(gNums) {
    var strHTML = '';
    var length = Math.sqrt(gNums.length);
    for (var i = 0; i < length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < length; j++) {
            var cell = gNums.pop()
            strHTML += `<td><button class=nums data-id="${cell}"
            onclick="cellClicked(this)">${cell}</button></td>`;
        }
        strHTML += '</tr>'
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

function cellClicked(elCell) {
    playSound();
    var value = +elCell.getAttribute("data-id")
    if(value === 1){
        start()
    }
    if (value === gCounter) {
        elCell.setAttribute("class", "success")
        gCounter++;
    } else {
        if (elCell.getAttribute('class') !== 'success') {
            elCell.setAttribute("class", "")
        }
    }

    if (gCounter === gNumsL + 1) {
        alert('You Won')
        gameOver();
    }
}

function shuffle(items) {
    var randIdx, keep, i;
    for (i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInteger(0, items.length);

        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}

function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function start(){
    gInterval = setInterval(updateTime, 1000)
}

function updateTime(){
    gTime += 1;
    renderTime();
}

function renderTime(){
    var elTime = document.querySelector('.timer')
    elTime.innerHTML = gTime;
}

function gameOver(){
    clearInterval(gInterval);
    gTime = 0;
}

function playSound(){
    var btnSfx = new Audio('button push sfx.mp3')
    btnSfx.play()
}
