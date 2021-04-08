'use strict'
console.log('Starting up');

function contactMail() {
    $('.body-input').val();
    $('.subject-input').val();
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=tamirmatz@gmail.com&su=${$('.subject-input').val()}&body=${$('.body-input').val()}`);
    $('.body-input').val() = '';
    $('.subject-input').val() = '';
}

function initPage() {
    renderProjs()
}