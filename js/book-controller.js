'use-script'
gIsBookAdding = false;


function onInit() {
    onCreateBooksData();
    renderBooksTable();
    gIsBookAdding = false;
    gIsBookModalOpen = false;
    gIsAddBookModalOpen = false;
    doTrans()
    //renderModal('bkOztZxr')
}


function renderBooksTable() {
    var strHTML = ''
    var books = getBooksForDisplay();
    books.forEach((book) => {
        if (gCurrLang === 'en') {
            var bookTitle = createUpperCaseEachWord(book.bookName);
            var author = createUpperCaseEachWord(book.bookAuthor);
        } else {
            var bookTitle = book.bookName;
            var author = book.bookAuthor;
        }
        strHTML += `
        <tr>
        <td>${book.id}</td>
        <td>${bookTitle}</td>
        <td>${author}</td>
        <td >
        <span class="price-td " ><span data-trans="currency">$</span> ${book.bookPrice}</span>
        <input class="update-input none-display" 
        type="text" placeholder="${book.bookPrice}" />
        <button class="save-price-button none-display " 
        onclick="onsavenewPrice('${book.secretId}')">
        <i class="fa fa-floppy-o" aria-hidden="true"></i></button>
        </td>
        <td>
        <button class="myButton2 myButtonBlue2 " 
        data-secretid="${book.secretId}"
        onclick="onReadDetails(this)" data-trans="read">Read</button>
        </td> 
        <td>
        <button class="myButton2 myButtonGreen2 " 
        data-secretid="${book.secretId}"
        onclick="onUpdateDetails(this)" data-trans="update">Update</button>
        </td>
        <td>
        <button class="myButton2 myButtonRed2 " 
        data-secretid="${book.secretId}"
        onclick="onRemoveBook(this)" data-trans="delete">Delete</button>
        </td>
        </tr>
        `
    })
    var elBooksTable = document.querySelector('.table-body');
    elBooksTable.innerHTML = strHTML;
    doTrans();
}

function renderModal(elBookRow) {
    var secretId;
    if (elBookRow !== undefined) {
        secretId = elBookRow.dataset.secretid;
        gSecretId = secretId
    } else {
        secretId = gSecretId
    }
    document.querySelector('.book-modal').classList.remove('none-display');
    document.querySelector('.add-book-modal ').classList.add('none-display');
    console.log(gCurrLang)
    var brief = getLoremIpsum(38, gCurrLang)
    var strHTML = '';
    book = findBookBySecretId(secretId);
    var valuesArray = []
    for (var key in book) {
        valuesArray.push(book[key] + '')
    }
    strHTML += ` 
        <div class="div-img">
     <img class=book-img src=${valuesArray[5]} alt="book-image" onclick="onCloseModal()">
 </div>
<div class="book-title-modal">
  <span>${valuesArray[2]}</span> | \n<span>${valuesArray[3]}</span>
 </div>
<div class="price">
    <span><span data-trans="currency">$</span> ${valuesArray[4]}</span>
</div>
<div class="brief">
    <p class='brief-p' style="text-align:justify">${brief}</p>
</div>
<div class="rating">
<button class="btn-decrease" onclick="onChangingBookRate('${secretId}', -1)"
data-secretid="${secretId}">-</button>
<span class="book-rate"
>${valuesArray[6]}</span>
<button class="btn-increase" onclick="onChangingBookRate('${secretId}', 1)" 
data-secretid="${secretId}">+</button>
</div>
`
    var elBookModal = document.querySelector('.book-modal');
    elBookModal.innerHTML = strHTML;
    doTrans();
}

function onCreateBooksData() {
    createBooks();
}

function onUpdateDetails() {
    document.querySelector('.update-input').classList.remove('none-display');
    document.querySelector('.price-td').classList.add('none-display');
    document.querySelector('.save-price-button').classList.remove('none-display');
}

function onsavenewPrice(secretId) {
    var val = document.querySelector('.update-input').value;
    updateBookPrice(secretId, val);
    document.querySelector('.update-input').classList.add('none-display');
    document.querySelector('.price-td').classList.remove('none-display');
    document.querySelector('.save-price-button').classList.add('none-display');
    renderBooksTable();
}

function onAddBook() {
    if (!gIsBookAdding) {
        document.querySelector('.book-modal').classList.add('none-display');
        document.querySelector('.add-book-modal').classList.remove('none-display');
       if(gCurrLang==='en')  $('.add-book-button').text('Close Book Form')
       if(gCurrLang==='he')  $('.add-book-button').text('סגור טופס')
    } else {
        document.querySelector('.add-book-modal').classList.add('none-display');
       if(gCurrLang==='en') $('.add-book-button').text('Add A Book')
        if(gCurrLang==='he') $('.add-book-button').text('הוסף ספר')
    }
    gIsBookAdding = !gIsBookAdding;
}

function onReadDetails(elBookRow) {
    gIsBookAdding = false;
    document.querySelector('.add-book-modal').classList.add('none-display');
    renderModal(elBookRow);
}

function onRemoveBook(elBookRow) {
    var secretId = elBookRow.dataset.secretid;
    removeBook(secretId);
    renderBooksTable();
}

function onSortBooks(sortBy) {
    sortBooks(sortBy);
    renderBooksTable();
}

function onCloseModal() {
    document.querySelector('.book-modal').classList.add('none-display');
    gIsBookModalOpen = false;
}

function onChangingBookRate(secretId, change) {
    document.querySelector('.book-rate').innerText = updateBookRate(secretId, change)
}

function onMovingNextPage() {
    goNextPage();
    renderBooksTable();
    document.querySelector('.first-page-number').innerText = gPageIdx + 1
}

function onMovingPreviousPage() {
    goPreviousPage();
    renderBooksTable();
    document.querySelector('.first-page-number').innerText = gPageIdx + 1
}

function onSaveBookToData() {

    var bookTitle = document.querySelector('.book-title').value;
    var bookAuthor = document.querySelector('.book-author').value;
    var bookPrice = document.querySelector('.book-price').value;
    var bookUrl = document.querySelector('.image-url').value;
    if (bookTitle !== '' && bookAuthor !== '' && bookPrice !== '' && bookUrl !== '') {
        addBook(bookTitle, bookAuthor, bookPrice, bookUrl);
        document.querySelector('.add-book-modal ').classList.add('none-display');
    } else {
        document.querySelector('.missing-data ').classList.remove('none-display');
    }
    renderBooksTable()
}

function translateAddingBookButton(){
    if(gCurrLang ==='en' && gIsBookAdding)$('.add-book-button').text('Close Book Form')
    else if(gCurrLang ==='en' && !gIsBookAdding)$('.add-book-button').text('Add A Book')
    else if(gCurrLang ==='he' && gIsBookAdding)$('.add-book-button').text('סגור טופס')
    else if(gCurrLang ==='he' && !gIsBookAdding)$('.add-book-button').text('הוסף ספר')
}

/////   Translation  //////

function onSetLang(lang) {
    setLang(lang);
    translateAddingBookButton()
    if (lang === 'he') {
        $('td').addClass('rtl');
        $('table').addClass('rtl');
        $('input').addClass('rtl');
        $('p').addClass('rtl');
        $('.price').addClass('rtl');
    } else {
        $('td').removeClass('rtl');
        $('table').removeClass('rtl');
        $('input').removeClass('rtl');
        $('p').removeClass('rtl');
        $('.price').removeClass('rtl');
    }
    renderBooksTable();
    if (gIsBookModalOpen) renderModal();
//     gIsBookAdding = !gIsBookAdding;

    if (gIsBookAdding){
        onAddBook();
        onAddBook();
    }

}