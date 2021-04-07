'use sricet'
const KEY = 'books';
var gSortBy = 'name';
var gId = 104;
_createBooks()

var gBooks;

function getBooks() {
    return gBooks;
}

function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return +bookId === book.id
    })
    return book
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return +bookId === book.id
    })
    gBooks.splice(bookIdx, 1)
    console.log('book removed')
    saveToStorage(KEY, gBooks)
}

function addBook(name, price) {
    var book = _createBook(name, price)
    gBooks.unshift(book)
    saveToStorage(KEY, gBooks)
}

function updateBook(bookId, price) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === +bookId;
    })
    gBooks[bookIdx].price = price;
    saveToStorage(KEY, gBooks)
}

function _createBook(name, price) {
    return {
        id: gId++,
        name,
        price,
        imgUrl: 'imgs/diffult.jpeg',
        rate: 0
    }
}


function _createBooks() {
    var books = loadFromStorage(KEY);
    if (!books || !books.length) {
        books = [{
            id: 101,
            name: 'Crisiano Ronaldo',
            price: 100,
            imgUrl: 'imgs/ronaldo.jpeg',
            rate: 0
        }, {
            id: 102,
            name: 'Steve Jobes',
            price: 150,
            imgUrl: 'imgs/jobes.jpeg',
            rate: 0
        },
        {
            id: 103,
            name: 'The Hunger Games',
            price: 120,
            imgUrl: 'imgs/hunger-games.jpeg',
            rate: 0
        }
        ]
    }
    gBooks = books;
    saveToStorage(KEY, gBooks)
}

function updateRate(bookId, elbtn) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === +bookId;
    })
    if (elbtn.innerHTML === '+') {
        if (gBooks[bookIdx].rate === 10) return
        gBooks[bookIdx].rate++;
        saveToStorage(KEY, gBooks)
    }else if (elbtn.innerHTML === '-') {
        if (gBooks[bookIdx].rate === 0) return
        gBooks[bookIdx].rate--;
        saveToStorage(KEY, gBooks)
    }
}

function setSort(sortBy) {
    gSortBy = sortBy;
}

function getSort() {
    if (gSortBy === 'name') {
        gBooks.sort(function (book1, book2) {
            var nameA = book1.name.toLowerCase();
            var nameB = book2.name.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
    }
    else {
        gBooks.sort(function (book1, book2) {
            return book1[gSortBy] - book2[gSortBy];
        });
    }
}