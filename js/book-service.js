'use-script'

var gBooks;
var gSortBy = 'bookName';
var gSecretId;
var KEY = 'myBooks';
PAGE_SIZE = 2;
var gPageIdx = 0;
var gIsBookModalOpen=false;



function getBooksForDisplay() {
    var startIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE)
}

function goNextPage() {
    var bookCount = gBooks.length / PAGE_SIZE;
    gPageIdx = (gPageIdx+1 <= bookCount)? gPageIdx+1 : 0
}

function goPreviousPage() {
    var bookCount = gBooks.length / PAGE_SIZE;
    gPageIdx = (gPageIdx-1 >= 0)? gPageIdx-1 : Math.floor(bookCount)
}

function updateBookRate(secretId, change){
   var book = findBookBySecretId(secretId);
    if (book.bookRate+change <0 || book.bookRate+change > 10){
        return book.bookRate
    }else{
        book.bookRate+=change;
        _saveBooksToStorage();
        return book.bookRate
    }
}

function sortBooks(sortBy) {
   // if (sortBy === 'bookName' || sortBy === 'bookAuthor') {
        gBooks.sort((bookA, bookB) => bookA[sortBy]  > bookB[sortBy]  ? 1 : -1);
    //} else if (sortBy === 'bookPrice') {
    //    gBooks.sort((bookA, bookB) => bookB[sortBy]  > bookA[sortBy]  ? 1 : -1);
    }
   

function createBooks() {
    gBooks = _getBooksFromStorage();
 
    if (!gBooks || gBooks.length === 0) {
        gBooks = [
            _createBook('Camera Lucida',  'Roland Barthes', 12.99,'img/cameralucida.jpg')
        ]
        var book = _createBook('Art Power', 'Boris Groys',11.67, 'img/artpower.jpg')
        gBooks.push(book);  
        var book = _createBook('The Book Of DisQuiet', 'Fernando Pessoa',33.55, 'img/thebookofdisquiet.jpg')
        gBooks.push(book);  
    }
    _saveBooksToStorage();
}

function updateBookPrice(secretId, val) {
    var book = findBookBySecretId(secretId);
    book.bookPrice = val;
    _saveBooksToStorage();
}

function removeBook(secretId) {
    var idx = gBooks.findIndex((book)=>{
        return secretId === book.secretId
    })
    gBooks.splice(idx, 1);
    _saveBooksToStorage();
}

function findBookBySecretId(secretId) {
    return gBooks.find(book => book.secretId === secretId)
}

function _createBook(bookname, author, price ,url) {
    var book = {
        id: getId(),
        secretId: makeId(),
        bookName: bookname,
        bookAuthor: author,
        bookPrice: price,
        bookUrl: url,
        bookRate:0
    }
    return book
}

function addBook(bookname, author, price, url) {
    var book = _createBook(bookname, author, price, url);
    var books = gBooks;
    books.unshift(book);
    gBooks = books;
    _saveBooksToStorage();
}



function getId() {
    if (!gBooks || gBooks.length === 0) return 1
    else return gBooks.length + 1;
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks);
}

function _getBooksFromStorage() {
   return loadFromStorage(KEY);
}