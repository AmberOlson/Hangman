var wordArray = [];
var playerGuess;
var wrongGuess = 0;
var correctGuess = 0;
var secretWord;
var playerGuessArray = [0];
var $orderedList = $("#letterList ul");
var numberWrongGuess = 0;
var $player1Div = $("#player1");
var $player2Div = $("#player2");
var $win = $("#win");
var $lose = $("#lose");

// turns the first player input into an array so it can be searched
function makeArray (word) {
for (var i = 0; i < word.length; i ++){
  var letter = word.charAt(i);
  wordArray.push(letter);
}
console.log(wordArray);
return wordArray
}

// determines if a word has the same letter in it more than once
function numberOfTimes (array, input){
  var counter = 0;
  for (var i= 0; i < array.length; i ++){
    if (array[i] === input){
      counter +=1;
    }
  }
  return counter;
}


//plays the game
function playGame (input){
  var counter = numberOfTimes (wordArray, input);
   if ( counter > 0){
     console.log("correct");
     correctGuess = correctGuess + counter;
     $("#playerLetter").val("");
     addLettertoWord(input);
     console.log('c', correctGuess);
   }else{
     drawWhenWrong();
     wrongGuess += 1;
     console.log("w", wrongGuess);

   }
  }

//determine if the player has finished the game or not
function endGame (right, wrong){
  var end = false;
  if (right >= secretWord.length){
    end = "win";
  } else if (wrong >= 6) {
    end = "lose";
  }
  return end;
}

// determin if the person has played the same letter twice
function validLetter (letter, array){
  var gamePlay = false;
  var compare = array.indexOf(letter);
    if ( compare === -1){
    array.push(letter);
    array.indexOf(letter);
    addLettertoList(letter);
        gamePlay = true;
  } else {
    alert("please play a new letter")
    $("#playerLetter").val("");
  }
  return gamePlay
}

// adds the letter on to the bottom of the page
 function addLettertoList (letter){
   console.log("candy " + letter);
   $orderedList.append("<li>" + letter + " " + "</li>");
   console.log($orderedList);
   }



// making spans for the word to be guessed. Sp the player can see how long the word is
function creatSpan (){
  $('#wordDisplay').html('');
  var $span;
  for (var i = 0; i < secretWord.length; i ++) {
    if(playerGuessArray.indexOf(secretWord[i]) != -1) {
      $span = $("<span>" + secretWord[i] + "</span>");
    } else {
      $span = $("<span> _ </span>");
    }
    $("#wordDisplay").append($span);
  }
}

// adds guessed letter to the location in the span

function addLettertoWord (letter){
  creatSpan();
}


function indexofLetters (){
  var locationofLetter = wordArray.indexOf(playerGuess);
  return locationofLetter;
}


//Problem: can hit enter without having anything in the form


// this set up the beginng look of the page. Hiding things that need to come in later
playerGuess =  $("#playerLetter").val();
var wordValue = $("#word").val();
$player2Div.hide();
$win.hide();
$lose.hide();
var $backdrop = $("#backdrop");
var $firstButton = $player1Div.find("button");
var $secondButton = $player2Div.find("button");

//
$("#word").keyup(function (){
  if ($('#word').val().length > 0){
    $firstButton.removeClass("invalid");
  }
});


$("#playerLetter").keyup(function (){
  if ($('#playerLetter').val().length > 0){
    $secondButton.removeClass("invalid");
  }
})



// what happens when player enters a word a hits the enter button and adds a backdrop
$player1Div.find("button").click(function(){
  console.log("bamn");
  secretWord = $("#word").val().toUpperCase();
  $player1Div.hide();
  $backdrop.removeClass("hide");
  makeArray(secretWord);
});

// this removes the backdrop and allow the player to start putting in letters
$backdrop.find("button").click(function(){
  $player2Div.show();
  $backdrop.addClass("hide");
  creatSpan();
});


//what happens when the player enters a letter and hit the button
$player2Div.find("button").click(function(){
  playerGuess =  $("#playerLetter").val().toUpperCase();
  if (validLetter(playerGuess, playerGuessArray)){
    playGame(playerGuess);
    var gameResult = endGame(correctGuess, wrongGuess);
    showGameResults(gameResult);
    }
    $secondButton.addClass("invalid");
})

// when the game is over this function determines weather to show you the win or lose results
function showGameResults (result){
  if (result === "win"){
    $player2Div.hide();
    $win.show();
  } else if (result === "lose") {
    $player2Div.hide();
    $lose.show();
  }else{
    $("#playerLetter").val("");
}
}


// drawing the noose on the hangman
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.beginPath();
ctx.moveTo(150,75);
ctx.lineTo(150,300);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(300,300);
ctx.lineTo(75,300);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(150,75);
ctx.lineTo(225,75);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(225,75);
ctx.lineTo(225,102);
ctx.stroke();

// draw head

function drawHead (){
var centerX = c.width / 2;
var centerY = c.height / 4;
var radius = 10;

ctx.beginPath();
ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
ctx.lineWidth = 1;
ctx.stroke();
}

// body
function drawBody (){
ctx.beginPath();
ctx.moveTo(225,123);
ctx.lineTo(225,200);
ctx.stroke();
}

// right arm
function drawArm (){
ctx.beginPath();
ctx.moveTo(225,150);
ctx.lineTo(200,100);
ctx.stroke();
}

// left arm
function drawLArm (){
ctx.beginPath();
ctx.moveTo(225,150);
ctx.lineTo(250,100);
ctx.stroke();
}

// right leg
function drawLeg (){
ctx.beginPath();
ctx.moveTo(225,200);
ctx.lineTo(200,250);
ctx.stroke();
}

// left leg
function drawLLeg (){
ctx.beginPath();
ctx.moveTo(225,200);
ctx.lineTo(250,250);
ctx.stroke();
}

 var drawing = [drawHead, drawBody, drawArm, drawLArm, drawLeg, drawLLeg]


function drawWhenWrong (){
     drawing[wrongGuess]();
  }
