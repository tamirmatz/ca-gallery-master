'use strict'
var gCurrLang = 'en';
var gTrans = {
    title: {
        en: 'Welcome To My Book Store',
        he: 'ברוך הבא לחנות הספרים שלי'
    },
    'filter-name': {
        en: 'By Name',
        he: 'לפי שם'
    },
    'filter-price': {
        en: 'By Price',
        he: 'לפי מחיר'
    },
    'add-book': {
        en: 'Add Book',
        he: 'הוסף ספר',
    },
    'add-book-placeholder-name': {
        en: 'Enter Name',
        he: 'שם הספר?'
    },
    'add-book-placeholder-price': {
        en: 'Enter Price',
        he: 'הכנס מחיר'
    },
    read: {
        en: 'Read',
        he: 'תקרא'
    },
    update: {
        en: 'Update',
        he: 'עדכן'
    },
    delete: {
        en: 'Delete',
        he: 'מחק'
    },
    'upadae-book-placeholder-price': {
        en: 'Enter New Price',
        he: 'הכנס מחיר חדש'
    },
    close: {
        en: 'Close',
        he: 'סגור'
    },
    name: {
        en: 'Name',
        he: 'שם'
    },
    price: {
        en: 'Price',
        he: 'מחיר'
    },
    actions: {
        en: 'Actions',
        he: 'פעולות'
    },
    id: {
        en: 'Id',
        he: 'תז'
    }
}


function doTrans() {
    var els = document.querySelectorAll('[data-trans]')

    els.forEach(function (el) {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey)

        if (el.nodeName === 'INPUT') {
            // el.placeholder = txt
            // THE SAME!!
            el.setAttribute('placeholder', txt)
        } else {
            el.innerText = txt
        }
    }) 
}


function setLang(lang) {
    gCurrLang = lang;
}

function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
    if (!keyTrans) return 'UNKNOWN';

    var txt = keyTrans[gCurrLang]

    // if not founf - use english
    if (!txt) txt = keyTrans['en']

    return txt;
}