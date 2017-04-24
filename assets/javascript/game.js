//create buttons
function makeButtons () {
	//make button for starting a new game, hidden by default
	rpl = document.createElement("button");
	rpl.className = "hidden";
	rpl.id = "replay";
	rpl.innerHTML = "Play Again.";
	rpl. addEventListener("click", function () {gameObj.init()});
	document.getElementById("main").appendChild(rpl);

	//make all our li items that will serve as letter buttons
	for (let i of gameObj.alphabet) {
	    item = document.createElement("li");
	    item.classList.add("letter");
	    item.id = i;
	    item.innerHTML = i;
	    item.addEventListener("click", function () {gameObj.makeGuess(this.innerHTML);});
	    document.getElementById("alphabet").appendChild(item);
	}
}

//game object of many things!
let gameObj = {
	alphabet : ["a", "b", "c", "d", "e", "f", "g", "h",
    "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
    "t", "u", "v", "w", "x", "y", "z"],
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
	init : function () {
	// reset entire game, minus wins/losses (which only happens on refresh)
		//set page elements, info line, make sure replay button is hidden.
		document.getElementById("info").innerHTML = "Select your letter from below.";
		document.getElementById("replay").classList.add("hidden"); 	
		this.curChances = this.startChances;		
		document.getElementById("chances").innerHTML = this.curChances;
		//set vars
		this.gameState = 1;
		this.reqLet = "";
		this.guessLet = "";
		///splice curWord with random index from words list (splice so as to remove item from list so no repeats)
		let rand = Math.floor(Math.random() * this.words.length);
		this.curWord = this.words.splice(rand, 1)[0];
		//push unique letters to var for checking against
		for (let i of this.curWord) {
			if (this.reqLet.indexOf(i) === -1){
				this.reqLet += i;
			}
		}
		//remove any children of the guesses list
		let guessUL = document.getElementById("guesses");
		while (guessUL.hasChildNodes()) {   
		    guessUL.removeChild(guessUL.firstChild);
		}
		//create underscores on page for replacment
		for (let i = 0; i < this.curWord.length; i++) {								
			item = document.createElement("li");
			item.className = "guessLetter";
			item.innerHTML = "_";
			guessUL.appendChild(item);
		}
		//make sure all li buttons are no longer used
		let btns = document.getElementsByClassName("letter");
		for (let i of btns) {
			i.classList.remove("used");
		}
	},
	setChances : function () {
	//decrement chances, then check for game loss
		//decrement chances, push to page												
		this.curChances -= 1; 
		document.getElementById("chances").innerHTML = this.curChances;
		//check for game loss
		if (this.curChances < 1) {
			this.gameState = 0;
			this.losses += 1;
			document.getElementById("losses").innerHTML = this.losses;
			document.getElementById("info").innerHTML = "You Lost.";
			document.getElementById("replay").classList.remove("hidden");
		}
	},
	checkWin : function () {
	//check for win
		//loop through reqlet and check if their members of guesslet
		for (let i of this.reqLet){
			if (this.guessLet.indexOf(i) === -1){
				return false;
			}
		}
		//made it through the loop, game is won!
		this.gameState = 0;
		this.wins += 1;
		document.getElementById("wins").innerHTML = this.wins;
		document.getElementById("info").innerHTML = "You win!";
		document.getElementById("replay").classList.remove("hidden");
	},
	makeGuess : function (letter) {
	//on btn click check if btn is usable, then if letter is correct
		if (this.gameState === 1){
			let word = gameObj.curWord;
			curLetter = document.getElementById(letter);
			//if btn does not have used class
			if (!curLetter.classList.contains("used")){
				curLetter.classList.add("used");
				//if letter is in our guess word								
				if (word.indexOf(letter) != -1) {
					this.guessLet += letter;
					//grab all guessLetter class DOM elem, iter through curWord, use curWord position to update html
					let gsEl = document.getElementsByClassName("guessLetter");
					for (let i = 0; i < word.length; i++) {
						if (word.charAt(i) === letter)  {
							gsEl[i].innerHTML = letter;
						}
					}
					//letter was in word, now lets check for win
					this.checkWin();
				} else {
					//letter wasnt in word, decrement chances and check for lose
					gameObj.setChances();
				}
			}
		}
	}
}


//init
makeButtons();
gameObj.init();



// to-do
// figure out overall layout
// add hangman SVG
// add reset button