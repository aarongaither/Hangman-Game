//create buttons
function makeButtons (alpha) {
	//make all our li items that will serve as letter buttons
	for (let i of gameObj[alpha]) {
	    item = $("<li>").addClass("letter shadow").attr("id", i);
	    item.html(i).click(function () {gameObj.makeGuess(this.innerHTML);});
	    $("#"+alpha).append(item);
	}
}

//game object of many things!
let gameObj = {
	alphabet1 : ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
	alphabet2 : ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
	alphabet3 : ["z", "x", "c", "v", "b", "n", "m"],
	words : ["bootstrap", "jquery", "react", "angular", "node", "ajax",
	"javascript", "firebase", "heroku", "github", "gitlab", "mysql", "mongodb",
	"express", "mongoose"],
	startChances : 6,
	curChances: 6,
	curWord : "",
	reqLet : "",
	guessLet: "",
	wins: 0,
	losses: 0,
	gameState: 1,
	init : function () {
	// reset entire game, minus wins/losses (which only happens on refresh)
		//set page elements, info line, make sure replay button is hidden.
		$("#replay").addClass("hide");
		$("#undef").removeClass("hide");
		//set chances and status
		$("#info").html("playing");
		this.curChances = this.startChances;		
		$("#chances").html(this.curChances);
		//hangman init
		for (var i of bodyParts) {
			$("#"+i).addClass("hide");
		}
		if (this.gameState === 0){
			resetSVG();
		}
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
		let guessUL = $("#guesses");
		guessUL.empty();
		//create underscores on page for replacment
		for (let i = 0; i < this.curWord.length; i++) {								
			item = $("<li>").addClass("guessLetter").html("_");
			guessUL.append(item);
		}
		//make sure all li buttons are no longer used
		$(".used").each(function (i, obj){
			$(this).removeClass("used");
		});
	},
	checkLose : function () {
	//decrement chances, reveal limb, then check for game loss
		let bp = bodyParts[this.curChances - 1];
		$("#"+ bp).removeClass("hide");
		//decrement chances, push to page												
		this.curChances -= 1; 
		$("#chances").html(this.curChances);
		//check for game loss
		if (this.curChances < 1) {
			this.gameState = 0;
			this.losses += 1;
			$("#losses").html(this.losses);
			$("#info").html("loser");
			$("#undef").addClass("hide");
			$("#replay").removeClass("hide");
			dropBody();
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
		this.gameState = 2;
		this.wins += 1;
		$("#wins").html(this.wins);
		$("#info").html("winner");
		$("#undef").addClass("hide");
		$("#replay").removeClass("hide");
	},
	makeGuess : function (letter) {
	//on btn click check if btn is usable, then if letter is correct
		if (this.gameState === 1){
			let word = gameObj.curWord;
			curLetter = $("#"+letter);
			//if btn does not have used class
			if (!curLetter.hasClass("used")){
				curLetter.addClass("used");
				//if letter is in our guess word								
				if (word.indexOf(letter) != -1) {
					this.guessLet += letter;
					//grab all guessLetter class DOM elem, iter through curWord, use curWord position to update html
					let gsEl = $(".guessLetter");
					for (let i = 0; i < word.length; i++) {
						if (word.charAt(i) === letter)  {
							gsEl[i].innerHTML = letter;
						}
					}
					//letter was in word, now lets check for win
					this.checkWin();
				} else {
					//letter wasnt in word, decrement chances and check for lose
					this.checkLose();
				}
			}
		}
	}
}

// hangman anim
function dropBody () {
	$("#rEyes").addClass("hide");
	$("#xEyes").removeClass("hide");
    $("#door1").velocity({rotateZ: 90}, 1000);
    $("#door2").velocity({rotateZ: -90}, 1000);
    fall();  
}

function fall() {
	let dur = 500;
	let del = 1000;
	$("#body").velocity({translateY: "100px"}, {duration: dur, delay: del});
	$("#rope").velocity({y2: "+=100px"}, {duration: dur, delay: del});
	$("#armL").velocity({y2: "-=30px"}, {duration: dur, delay: del});
	$("#armR").velocity({y2: "-=30px"}, {duration: dur, delay: del});
	finish();
}

function finish () {
  	$("#armL").velocity({y2: "+=35px", x2: "+=5px"}, 500);
  	$("#armR").velocity({y2: "+=35px", x2: "-=5px"}, 500);
}

function resetSVG () {
	let dur = 100;
	$("#xEyes").addClass("hide");
	$("#rEyes").removeClass("hide");
	$("#armL").velocity({y2: "-=5px", x2: "-=5px"}, dur);
	$("#armR").velocity({y2: "-=5px", x2: "+=5px"}, dur);
	$("#body").velocity({translateY: "0px"}, dur);
	$("#rope").velocity({y2: "-=100px"}, dur);
	$("#door1").velocity({rotateZ: 0}, {duration: dur, delay: dur});
	$("#door2").velocity({rotateZ: 0}, {duration: dur, delay: dur});
}

var bodyParts = ["legR", "legL", "armL", "armR", "torso", "head"];

//init
$("#replay").click(function () {gameObj.init();});
makeButtons("alphabet1");
makeButtons("alphabet2");
makeButtons("alphabet3");
gameObj.init();

// to-do
// if word is lost, add back to words for re-use
// add more words
// add hints or categories
// reveal hangman parts on miss
// rename miss func