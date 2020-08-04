'use-script'



function makeId(length = 8) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function createUpperCaseEachWord(str) {
    var lowStr = str.toLowerCase();
    var arr = lowStr.split(' ');
    var finalStr = '';
    arr.forEach((word) => {
        var trimWord = word.trim();
        var finalWord = trimWord.charAt(0).toUpperCase() + trimWord.substr(1)+ " ";
        finalStr += finalWord;
    })
    return finalStr.trim()
}

function getLoremIpsum(wordsCount, language) {
    var sentence = '';
    var counter = 0;
    for (var i = 0; i < wordsCount; i++) {
        sentence += getWord(language);
        sentence += ' ';
        counter++;
        if (counter === 12) {
            sentence += '\n';
            counter = 0;
        }
    }
    return sentence
}


function getWord(language) {
    var word = '';
    var wordLength = getRandomInt(3, 6);
    for (var i = 0; i < wordLength; i++) {
        word += getLetter(language);
    }
    return word
}

function getLetter(language) {
    if(language === 'en'){
    var letters = 'abcdefghijklmnopqrstuvxxyz';
    var arrlength = 26
    }else if(language==='he'){
    var letters = 'אבגדהוזחטיכלמנסעפצקרשת';
    var arrlength = 22;
    }
    var currChar = letters.charAt(getRandomInt(0, arrlength));
    return currChar
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

