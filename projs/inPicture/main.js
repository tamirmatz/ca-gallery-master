
var gQuests;
var gCurrQuestIdx;

function initGame() {
    var elRestart = document.querySelector('.restart')
    elRestart.style.display = 'none'
    gCurrQuestIdx = 0;
    gQuests = createQuests();
    renderQuest();

}

function createQuests() {
    var quests = [
        { id: 1, opts: ['Shrek', 'Plankton'], correctOptIndex: 0 },
        { id: 2, opts: ['Stu', 'Sid'], correctOptIndex: 1 },
        { id: 3, opts: ['Spongebob', 'CheeseBob'], correctOptIndex: 0 }
    ]
    return quests;
}

function renderQuest() {
    var strHTML = '';
    var strImg = `<img src="pictures/${gQuests[gCurrQuestIdx].id}.jpeg"/>`
    var elImg = document.querySelector('.img-container')
    elImg.innerHTML = strImg;

    var options = gQuests[gCurrQuestIdx].opts;
    for (var i = 0; i < options.length; i++) {
        strHTML += `<button onclick= "checkAnswer(${i})" class="button button1">${options[i]}</button>`
    }
    elButtons = document.querySelector('.answers-container');
    elButtons.innerHTML = strHTML;
}


function checkAnswer(optIdx) {
    var elRestart = document.querySelector('.restart')
    if (gQuests[gCurrQuestIdx].correctOptIndex === optIdx) {
        if (gCurrQuestIdx === 2) {
            alert('You Win!')
            elRestart.style.display = 'block'

        } else {
            gCurrQuestIdx++;
            renderQuest()
        }
    }
    else {
        alert('sorry, wrong answer')
    }
}