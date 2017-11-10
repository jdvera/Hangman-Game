var words = ["ned stark", "arya stark", "jon snow", "rob stark", "rickon stark", "bran stark", "sansa stark", "benjen stark", "lyanna stark", "catelyn tully", "lysa tully", "edmure tully", "brynden tully", "hoster tully", "robert baratheon", "stannis baratheon", "renly baratheon", "joffrey baratheon", "myrcella baratheon", "tommen baratheon", "tywin lannister", "kevan lannister", "cersei lannister", "jaime lannister", "tyrion lannister", "lancel lannister", "maester aemon", "aerys targaryen", "viserys targaryen", "daenerys targaryen", "rhaegar targaryen", "doran martell", "trystane martell", "oberyn martell", "ellaria sand", "obara sand", "nymeria sand", "tyene sand", "balon greyjoy", "euron greyjoy", "theon greyjoy", "yara greyjoy", "waldur frey", "khal drogo", "roose bolton", "ramsay bolton", "walda frey", "sandor clegane", "gregor clegane", "jeor mormont", "samwell tarly", "petyr balish", "varys", "bronn", "shae", "ilyn payne", "barristan selmy", "grand maester pycelle", "olenna tyrell", "mace tyrell", "margaery tyrell", "loras tyrell", "randyll tarly", "dickon tarly"];

var letter = "";

var guessesLeft = 5;
var prevGuesses = [];
var wrongGuesses = [];

var answer = {
	realWord: "",
	encodedWord: []
};

var correctLetter = 0;

var titleScreen = true;

var score = 0;





// ------------------------------------------------------ New Game Function
var newGame = function(){
	// First, reset all the variables
	guessesLeft = 5;
	prevGuesses = [];
	wrongGuesses = [];
	titleScreen = false;
	correctLetter = 0;
	answer.realWord = "";
	answer.encodedWord = [];

	// Second, get a new word.
	answer.realWord = words[Math.floor(Math.random() * words.length)];
	
	// Third, create the encoded version, changing letters with underscores and spaces with hyphens.
	for (var i = 0; i < answer.realWord.length; i++) {
		if (answer.realWord[i] == " ") {
			answer.encodedWord.push("-");
			correctLetter++;
		}
		else {
			answer.encodedWord.push("_");
		}
	};

	// Forth, display the page
	document.querySelector("#header").innerHTML = "#";
	document.querySelector("#warning").innerHTML = "character name";
	document.querySelector("#encoded-answer").innerHTML = answer.encodedWord.join(" ");
	document.querySelector("#guessed-letters").innerHTML = "Guessed Letters: " + wrongGuesses.join("");
	document.querySelector("#guesses-left").innerHTML = "Guesses Left: " + guessesLeft;
	document.querySelector("#score").innerHTML = "Score: " + score;
}




// ----------------------------------------------------------- Check Guess function
var checkGuess = function(guess) {
	
	// First, check if I have already guessed this letter.  If I have, immediately stop.
	if (prevGuesses.indexOf(guess) != -1) {
		document.querySelector("#warning").innerHTML = "You have already guessed that letter.";
		return;
	}
	else {
		// If not guessed, add the letter to the list of guesses.
		prevGuesses.push(guess);
		
		// Second, assume the guess is wrong
		var isWrong = true;

		// Third, check if the guess is any of the real letters
		for (var i = 0; i < answer.realWord.length; i++) {
			if (guess.charCodeAt(0) == answer.realWord.charCodeAt(i)) {

				// If it is, change the displayed underscore with the real letter, and mark the guess as not wrong
				answer.encodedWord[i] = answer.realWord[i];
				isWrong = false;
				correctLetter++;
				
				// YOU WIN
				if (correctLetter == answer.realWord.length) {
					titleScreen = true;
					score++;
					document.querySelector("#score").innerHTML = "Score: " + score;
					document.querySelector("#header").innerHTML = "YOU WIN<br><br>Press Shift to start a new game.";

				}
			}
		};

		//Last, if the guess is still wrong, 
		if (isWrong) {
			document.querySelector("#warning").innerHTML = "Wrong Answer";

			wrongGuesses.push(guess);
			document.querySelector("#guessed-letters").innerHTML = "Guessed Letters: " + wrongGuesses.toString();

			guessesLeft--;
			document.querySelector("#guesses-left").innerHTML = "Guesses Left: " + guessesLeft;

			// GAME OVER
			if (guessesLeft == 0) {
				document.querySelector("#header").innerHTML = "You got killed by the Hound<br><br>Press Shift to start a new game.";
				document.querySelector("#warning").innerHTML = "Actual Answer:";
				document.querySelector("#encoded-answer").innerHTML = answer.realWord;
				titleScreen = true;
			}
		}
		else {
			// If not wrong, re-write the encoded word with the new letters
			document.querySelector("#warning").innerHTML = "";
			document.querySelector("#encoded-answer").innerHTML = answer.encodedWord.join(" ");
		}
	}
}




// -------------------------------------------- Key Presses
document.onkeyup = function(event) {
	letter = event.key;

	if(letter == "Shift"){
		newGame();
	};

	if (titleScreen == false) {
		if (letter.charCodeAt(0) > 96 && letter.charCodeAt(0) < 123) {
			checkGuess(letter);
		};
	};

};