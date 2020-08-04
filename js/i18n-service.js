'use strict'
var gCurrLang = 'en';

var gTrans = {
    'choose-language': {
        en: 'Choose Language',
        he: 'בחר שפה'
    },
    // 'add-book': {
    //     en: 'Add Book',
    //     he: 'הוסף ספר'
    // },
    'book-title': {
        en: 'Book Title',
        he: 'כותרת ספר'
    },
    'author': {
        en: 'Author',
        he: 'מחבר'
    },
    'price': {
        en: 'Price',
        he: 'מחיר'
    },
    'book-details': {
        en: 'Book Details',
        he: 'פרטי הספר'
    },
    update: {
        en: 'Update',
        he: 'עדכן'
    },
    delete: {
        en: 'Delete',
        he: 'מחק'
    },
    read: {
        en: 'Read',
        he: 'עיין'
    },
    'book-author': {
        en: 'Book Author',
        he: 'מחבר הספר'
    },
    'book-price': {
        en: 'Book Price',
        he: 'מחיר הספר'
    },
    save: {
        en: 'Save',
        he: 'שמור'
    },
    'image-url': {
        en: 'Image Url',
        he: 'לינק לדימוי'
    },
    'missing-data': {
        en: 'Missing Data, Please Fill the Remaining Details',
        he: 'חסרים פרטים, בבקשה השלם את הטופס'
    },
    'book-id':{
        en:'Id',
        he:"מס' סידורי"
    },
    'currency':{
        en:'$',
        he:'₪'
    }
}



function getTrans(transKey) {
    var translation = gTrans[transKey][gCurrLang]
    if (!translation) return gTrans[transKey].en
    return translation
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(function (el) { 
         var transKey = el.dataset.trans
        // console.log('transkey:',transKey)
        var trans = getTrans(transKey)
       // console.log('trans:',trans)
        if (el.nodeName === 'INPUT') {
            el.placeholder = trans
        } else {
            el.innerText = trans
        }
    })

}

function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}