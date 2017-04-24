//create buttons
function makeButtons () {
	btnList = document.getElementById("alphabet");

	for (let i of gameObj.alphabet) {
	    item = document.createElement('li');
	    item.className = 'letter';
	    item.id = i;
	    item.innerHTML = i;
	    item.addEventListener("click", function () {gameObj.makeGuess(this.innerHTML);});
	    btnList.appendChild(item);
	}
}

let gameObj = {
	alphabet : ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'],
	words : ["bootstrap", "jquery", "react", "angular", "node", "ajax",
	"javascript", "firebase", "heroku", "github", "gitlab", "mysql", "mongodb",
	"express", "mongoose"],
	startChances : 8,
	curChances: 8,
	curWord : "",
	reqLet : "",
	guessLet: "",
	wins: 0,
	losses: 0,
	gameState: 1,
	setGuessWord : function () {
		this.curWord = this.words[Math.floor(Math.random() * this.words.length)];	//set curWord with random index from words list
		for (let i of this.curWord) {
			if (this.reqLet.indexOf(i) === -1){
				this.reqLet += i;
			}
		}
		for (let i = 0; i < this.curWord.length; i++) {								//create unserscores on page for replacment
			item = document.createElement('li');
			item.className = "guessLetter";
			item.innerHTML = "_";
			document.getElementById("guesses").appendChild(item);
		}
	},
	setChances : function () {														//decrement chances, push to page
		this.curChances -= 1; 
		document.getElementById("chances").innerHTML = this.curChances;
		if (this.curChances < 1) {
			this.gameState = 0;
			this.losses += 1;
			document.getElementById("losses").innerHTML = this.losses;
			document.getElementById("info").innerHTML = "You Lost."
		}
	},
	resetChances : function () {													//reset curChances to starting value
		this.curChances = this.startChances;		
		document.getElementById("chances").innerHTML = this.curChances;
	},
	checkWin : function () {														//iter through guessobj and check	
		if (this.reqLet === this.guessLet){
			this.gameState = 0;
			this.wins += 1;
			document.getElementById("wins").innerHTML = this.wins;
			document.getElementById("info").innerHTML = "You win!";
		}
	},
	makeGuess : function (letter) {
		if (this.gameState === 1){
			let word = gameObj.curWord;
			curLetter = document.getElementById(letter);
			if (curLetter.className === "letter used"){
				console.log("Button already used.");
			} else {
				curLetter.className += " used";									// add used css class
				if (word.indexOf(letter) != -1) {								// membership check for guessed letter vs curWord
					this.guessLet += letter;
					let gsEl = document.getElementsByClassName("guessLetter"); 	//grab all guessLetter class DOM elem
					for (let i = 0; i < word.length; i++) {						//iter through curWord
						if (word.charAt(i) === letter)  {						//use curWord position to change underscore
							gsEl[i].innerHTML = letter;
						}
					}
					this.checkWin();
				} else {
					gameObj.setChances();
				}
			}
		}
	}
}


function newGame () {
	document.getElementById("info").innerHTML = "Select your letter from below."
	gameObj.resetChances();
	gameObj.setGuessWord();
}

//init
makeButtons();
gameObj.resetChances();
gameObj.setGuessWord();



// to-do
// add limited guesses
// figure out overall layout
// add hangman SVG
// add reset button
// add solve button