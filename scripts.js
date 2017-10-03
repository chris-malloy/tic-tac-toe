// GOBALS
var squares = document.getElementsByClassName('square');
var message = document.getElementById('message').innerHTML = "Welcome to the game!"
var message2 = document.getElementById('message2').innerHTML = "";
var button = document.getElementById('button').innerHTML = "Reset"
var whosTurn = 1;
var player1Squares = [];
var player2Squares = [];
// used to check for tie
var playerSquares = [];
var player1img = "<img src="
">";
var player2img = "<img src="
">";
var winningCombos = [
    ['A1', 'B1', 'C1'],
    ['A2', 'B2', 'C2'],
    ['A3', 'B3', 'C3'],
    ['A1', 'A2', 'A3'],
    ['B1', 'B2', 'B3'],
    ['C1', 'C2', 'C3'],
    ['A1', 'B2', 'C3'],
    ['A3', 'B2', 'C1']
];
var gameOver = false;
var scores = [
    0,
    0
];

// HOW MANY PLAYERS?
var numPlayers = prompt('How many players? (1 or 2)')

// computer turn function
function computerTurn() {
    var squareFound = false;
    while (!squareFound) {
        rand = Math.floor(Math.random() * 9);
        var isTaken = squares[rand].innerHTML;
        if (isTaken === '-') {
            squareFound = true;
        }
    }
    markSquare(squares[rand])
}

// SQUARE CLICKED FUNCTION
function markSquare(squareClicked) {
    if (squareClicked.innerHTML !== '-') {
        document.getElementById('message').innerHTML = "Sorry that square is taken.";
    } else if ((whosTurn === 1)) {
        whosTurn = 2;
        squareClicked.innerHTML = 'X';
        player1Squares.push(squareClicked.id);
        playerSquares.push(squareClicked.id);
        document.getElementById('message').innerHTML = "It's Player 2's turn.";
        checkWin(player1Squares, 1);
        console.log(player1Squares)
        if ((numPlayers == 1) && (!gameOver)) {
            computerTurn();
        }
    } else if ((whosTurn === 2)) {
        squareClicked.innerHTML = 'O';
        whosTurn = 1;
        player2Squares.push(squareClicked.id);
        playerSquares.push(squareClicked.id);
        document.getElementById('message').innerHTML = "It's Player 1's turn.";
        checkWin(player2Squares, 2);
        console.log(player2Squares)
    }
}

// RESET FUNCTION
document.getElementById('button').onclick = function() {
    message = document.getElementById('message').innerHTML = "Welcome to the game!"
    button = document.getElementById('button').innerHTML = "Reset"
    message2 = document.getElementById('message2').innerHTML = "";
    whosTurn = 1;
    player1Squares = [];
    player2Squares = [];
    gameOver = false;
    numberOfPlayers = prompt("How many this time?")
    for (var i = 0; i < squares.length; i++) {
        squares[i].innerHTML = '-';
    }
    for (var i = 0; i < squares.length; i++) {
        squares[i].classList.remove('winning-square');
    }
}

// WIN FUNCTION
function checkWin(currentPlayerSquares, whoJustMarked) {
    for (let i = 0; i < winningCombos.length; i++) {
        var squareCount = 0;
        if (document.getElementById('button').clicked == true) {
            alert("button was clicked");
            squareCount = 0;
        }
        for (let j = 0; j < winningCombos[i].length; j++) {
            var winningSquare = winningCombos[i][j];
            if (currentPlayerSquares.indexOf(winningSquare) !== -1) {
                squareCount++;
            }
        }
        if ((squareCount === 3) && (playerSquares.length < 9)) {
            endGame(winningCombos[i], whoJustMarked);
            break;
        }
    }
    if (playerSquares.length == 9) {
        console.log('we have a tie')
        document.getElementById('message').innerHTML = "Looks like it's a Tie!"
        document.getElementById('message2').innerHTML = "Try again?"
        document.getElementById('button').innerHTML = "Play again!"
    }
}

// END GAME FUNCTION
function endGame(winningCombo, whoJustMarked) {
    console.log(`Player ${whoJustMarked} won the game`);
    document.getElementById('message').innerHTML = `Player ${whoJustMarked} won the game!`;
    gameOver = true;
    document.getElementById('message2').innerHTML = "Would you like to play again?";
    document.getElementById('button').innerHTML = "Play again!"
    for (let i = 0; i < winningCombo.length; i++) {
        document.getElementById(winningCombo[i]).className += ' winning-square';
    }
}

// CLICK TO ADD TO ARRAY
for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', function(event) {
        if (!gameOver) {
            markSquare(this);
        } else {
            message2 = "Would you like to play again?"
        }
    });
}



// TODO - fix the player score
// Allow for tie condition