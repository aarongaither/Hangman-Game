var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'];

var words = ["bootstrap", "jquery", "react", "angular", "node", "ajax",
	"javascript", "firebase", "heroku", "github", "gitlab", "mysql", "mongodb",
	"express", "mongoose"]

var chances = 10;
var getWord = () => words[Math.floor(Math.random() * words.length)];
var curWord = setGuessWord();


//set guess word and create blank li items
function setGuessWord () {
	guessWord = getWord();
	guessList = document.getElementById("guesses");

	for (var i = 0; i < guessWord.length; i++) {
		item = document.createElement('li');
		item.className = "guessLetter";
		item.innerHTML = "_";
		guessList.appendChild(item);
	}
	return guessWord;
}

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

function makeGuess (letter) {
	curLetter = document.getElementById(letter);
	if (curLetter.className === "letter used"){
		console.log("Button already used.");
	} else {
		curLetter.className += " used";
		if (curWord.indexOf(letter) != -1) {
			// console.log(letter, " present");
			var gsEl = document.getElementsByClassName("guessLetter"); 
			for (var i = 0; i < curWord.length; i++) {
				if (curWord.charAt(i) === letter)  {
					gsEl[i].innerHTML = letter;
				}
			}
		} else {

			console.log(letter, " not present");
		}
	}
}

var logGuess = (letter) => console.log(letter);
makeButtons();


// to-do
// add limited guesses
// figure out overall layout
// add hangman SVG
// add reset button
// add solve button