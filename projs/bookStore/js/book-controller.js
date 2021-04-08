'use strict'

function onInit() {
    renderBooks();
}

function renderBooks() {
    getSort()
    var books = getBooks()
    var strHtmls = books.map(function (book) {
        return `
        <tr>
            <td>${book.id}</td>
            <td>${book.name}</td>
            <td>${book.price}</td>
            <td> 
            <button data-trans="read" onclick="onReadBook('${book.id}')">Read</button> <input class="upade-input" data-trans="upadae-book-placeholder-price" placeholder="Enter New Price" type="number">
            <button data-trans="update" onclick="onUpdateBook('${book.id}')">Update</button> 
            <button data-trans="delete" onclick="onRemoveBook('${book.id}')">Delete</button>
            </td>
        </tr>
        `
    })
    document.querySelector('.book-list').innerHTML = strHtmls.join('');
    doTrans();
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}

function onUpdateBook(bookId) {
    var price = document.querySelector('.upade-input').value
    updateBook(bookId, price)
    renderBooks();
    document.querySelector('.upade-input').value = '';
}

function onAddBook() {
    var name = document.querySelector('.name-input').value
    var price = document.querySelector('.price-input').value
    addBook(name, price)
    renderBooks()
    document.querySelector('.name-input').value = '';
    document.querySelector('.price-input').value = ''

}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal-book')
    elModal.querySelector('h2').innerText = book.name
    elModal.querySelector('h3').innerText = book.price
    elModal.querySelector('p').innerHTML = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi doloremque quia repellat molestias consectetur. Soluta perspiciatis voluptatem temporibus minima iste cum est cumque, unde veritatis necessitatibus dolor? Tempora, quam distinctio!'
    elModal.querySelector('.img-container').innerHTML = `<img src="${book.imgUrl}" ></img>`
    elModal.querySelector('.rate-container').innerHTML = `<button onclick="onChangeRate(${book.id}, this )">+</button> ${book.rate}
    <button onclick="onChangeRate(${book.id}, this )">-</button>`
    elModal.hidden = false;
}

function onCloseModal(){
    var elModal = document.querySelector('.modal-book')
    elModal.hidden = true;
}

function onChangeRate(bookId,elbtn){
    updateRate(bookId,elbtn);
    onReadBook(bookId);
}

function onSetSort(sortBy){
    setSort(sortBy);
    renderBooks();
}

function onSetLang(lang) {
    setLang(lang);
    // TODO: if lang is hebrew add RTL class to document.body
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    renderBooks();
}

