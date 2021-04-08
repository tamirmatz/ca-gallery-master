'use strict'
gPojects = [
    {
        id: "pacman",
        name: "Pacman",
        title: "Finish the food! Watchout from ghosts!",
        desc: "lorem ipsum lorem ipsum lorem ipsum",
        url: "projs/pacman/index.html",
        publishedAt: 1448693940000,
        labels: ["Matrixes", "keyboard events"],
    },
    {
        id: "touchNums",
        name: "Touch Nums",
        title: "Touce those nums!",
        desc: "lorem ipsum lorem ipsum lorem ipsum",
        url: "projs/touchNums/index.html",
        publishedAt: '07/04/21',
        labels: ["Matrixes", "keyboard events"],
    },
    {
        id: "bookStore",
        name: "Book Store",
        title: "Run your store proparly!",
        desc: "lorem ipsum lorem ipsum lorem ipsum",
        url: "projs/bookStore/index.html",
        publishedAt: '07/04/21',
        labels: ["Matrixes", "keyboard events"],
    },
    {
        id: "pizzaBoard",
        name: "Pizza Board",
        title: "Quick! Eat The Pizza!",
        desc: "lorem ipsum lorem ipsum lorem ipsum",
        url: "projs/pizzaBoard/index.html",
        publishedAt: '07/04/21',
        labels: ["Matrixes", "keyboard events"],
    },
    {
        id: "mineSweeper",
        name: "Mine Sweeper",
        title: "Watch Out Where You Going!",
        desc: "lorem ipsum lorem ipsum lorem ipsum",
        url: "projs/mineSweeper/index.html",
        publishedAt: '07/04/21',
        labels: ["Matrixes", "keyboard events"],
    },
    {
        id: "inPicture",
        name: "Who's In The Picture",
        title: "Pick.",
        desc: "lorem ipsum lorem ipsum lorem ipsum",
        url: "projs/inPicture/index.html",
        publishedAt: '07/04/21',
        labels: ["Matrixes", "keyboard events"],
    }
]


function getProjs(){
    return gPojects;
}

function getProjById(projId) {
    var proj = gPojects.find(function (proj) {
        return projId === proj.id
    })
    return proj;
}

