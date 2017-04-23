var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'];

var words = ["bootstrap", "jquery", "react", "angular", "node", "ajax",
	"javascript", "firebase", "heroku", "github", "gitlab", "mysql", "mongodb",
	"express", "mongoose"]

var chances = 10;
var curWord = setGuessWord();
var letterObj = setGuessObj(curWord);

//create buttons
function makeButtons () {
	btnList = document.getElementById("alphabet");

	for (var i of alphabet) {
	    item = document.createElement('li');
	    item.className = 'letter';
	    item.id = i;
	    item.innerHTML = i;
	    item.addEventListener("click", function () {makeGuess(this.innerHTML);});
	    btnList.appendChild(item);
	}
}

//set guess word and create blank li items
function setGuessWord () {
	guessWord = words[Math.floor(Math.random() * words.length)];
	guessObj = {};
	//create replacement underscores
	guessList = document.getElementById("guesses");
	for (var i = 0; i < guessWord.length; i++) {
		item = document.createElement('li');
		item.className = "guessLetter";
		item.innerHTML = "_";
		guessList.appendChild(item);
	}
	return guessWord;
}

//make a guess obj to match letters and guesses (only has letters from curWord)
function setGuessObj (wrd) {
	tempObj = {};
	for (var i of wrd) {
		tempObj[i] = "unguessed";
	}
	return tempObj;
}

function setChances (num) {
	elem = document.getElementById("chances");
	elem.innerHTML = num;
}

//tun through guess obj and see if they've guessed them all
function checkWin () {
	for (var i of Object.keys(letterObj)) {
		console.log(i, letterObj[i]);
	}
}

//happens on click, check if button
function makeGuess (letter) {
	curLetter = document.getElementById(letter);
	if (curLetter.className === "letter used"){
		console.log("Button already used.");
	} else {
		curLetter.className += " used";									// add used css class
		if (curWord.indexOf(letter) != -1) {							// membership check for guessed letter vs curWord
			letterObj[letter] = "guessed";								//set guess object
			var gsEl = document.getElementsByClassName("guessLetter"); 	//grab all guessLetter class DOM elem
			for (var i = 0; i < curWord.length; i++) {					//iter through curWord
				if (curWord.charAt(i) === letter)  {					//use curWord position to change underscore
					gsEl[i].innerHTML = letter;
				}
			}
		} else {
			//add lose logic here
			chances -= 1;
			setChances(chances);
			if (chances < 1) {
				document.getElementById("info").innerHTML = "You Lost."
			}
			console.log(letter, " not present");
		}
	}
}

var logGuess = (letter) => console.log(letter);
makeButtons();
setChances(chances);


// to-do
// add limited guesses
// figure out overall layout
// add hangman SVG
// add reset button
// add solve button