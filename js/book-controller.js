'use-script'
gIsBookAdding = false;


function onInit() {
    onCreateBooksData();
    renderBooksTable();
    gIsBookAdding = false;
    //renderModal('bkOztZxr')
}


function renderBooksTable() {
    var strHTML = ''
    var books = getBooksForDisplay();
    books.forEach((book) => {
        var bookTitle = createUpperCaseEachWord(book.bookName);
        var author = createUpperCaseEachWord(book.bookAuthor);
        var secretId = book.secretId

        strHTML += `
        <tr>
        <td>${book.id}</td>
        <td>${bookTitle}</td>
        <td>${author}</td>
        <td >
        <span class="price-td " >$ ${book.bookPrice}</span>
        <input class="update-input none-display" 
        type="text" placeholder="${book.bookPrice}" />
        <button class="save-price-button none-display " 
        onclick="onsavenewPrice('${book.secretId}')">
        <i class="fa fa-floppy-o" aria-hidden="true"></i></button>
        </td>
        <td>
        <button class='myButton2 myButtonBlue2 ' 
        data-secretid='${book.secretId}'
        onclick='onReadDetails(this)'>Read</button>
        </td> 
        <td>
        <button class='myButton2 myButtonGreen2 ' 
        data-secretid='${book.secretId}'
        onclick='onUpdateDetails(this)'>Update</button>
        </td>
        <td>
        <button class='myButton2 myButtonRed2 ' 
        data-secretid='${book.secretId}'
        onclick='onRemoveBook(this)'>Delete</button>
        </td>
        </tr>
        `
    })
    var elBooksTable = document.querySelector('.table-body');
    elBooksTable.innerHTML = strHTML;
}

function renderModal(elBookRow) {

    var secretId = elBookRow.dataset.secretid;
    document.querySelector('.book-modal').classList.remove('none-display');
    document.querySelector('.add-book-modal ').classList.add('none-display');
    var brief = getLoremIpsum(40)
    var strHTML = '';
    book = findBookBySecretId(secretId);
    var valuesArray = []
    for (var key in book) {
        valuesArray.push(book[key] + '')
    }
    strHTML += ` 
        <div class='div-img'>
     <img class=book-img src=${valuesArray[5]} alt='book-image' onclick='onCloseModal()'>
 </div>
<div class='book-title-modal'>
  <span>${valuesArray[2]}</span> | \n<span>${valuesArray[4]}</span>
 </div>
<div class='price'>
    <span>$ ${valuesArray[3]}</span>
</div>
<div class='brief'>
    <p class='brief-p'>${brief}</p>
</div>
<div class='rating'>
<button class='btn-decrease' onclick="onChangingBookRate('${secretId}', -1)"
data-secretid='${secretId}'>-</button>
<span class='book-rate'
>${valuesArray[6]}</span>
<button class='btn-increase' onclick="onChangingBookRate('${secretId}', 1)" 
data-secretid='${secretId}'>+</button>
</div>
`
    var elBookModal = document.querySelector('.book-modal');
    elBookModal.innerHTML = strHTML;

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
        document.querySelector('.add-book-button').innerText = 'Close Add Modal'
    } else {
        document.querySelector('.add-book-modal').classList.add('none-display');
        document.querySelector('.add-book-button').innerText = 'Add A Book'
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