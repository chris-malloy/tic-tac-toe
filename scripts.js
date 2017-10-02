// GOBALS
var squares = document.getElementsByClassName('square');
var whosTurn = 1;
var player1Squares = [];
var player2Squares = [];
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

// CLICK TO ADD TO ARRAY
for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', function(event) {
        if (!gameOver) {
            markSquare(this);
        } else {
            document.getElementById('message2').innerHTMl = "Would you like to play again?"
        }
    });
}

// SQUARE CLICKED FUNCTION
function markSquare(squareClicked) {
    if (squareClicked.innerHTML !== '-') {
        document.getElementById('message').innerHTML = "Sorry that square is taken.";
    } else if (whosTurn === 1) {
        whosTurn = 2;
        squareClicked.innerHTML = 'X';
        player1Squares.push(squareClicked.id);
        document.getElementById('message').innerHTML = "It's Player 2's turn.";
        checkWin(player1Squares, 1);
        console.log(player1Squares)
    } else {
        squareClicked.innerHTML = 'O';
        whosTurn = 1;
        player2Squares.push(squareClicked.id);
        document.getElementById('message').innerHTML = "It's Player 1's turn.";
        checkWin(player2Squares, 2);
        console.log(player2Squares)
    }
}

// RESET FUNCTION
document.getElementById('button').onclick = function() {
    console.log('reset pressed')
    var squares = document.getElementsByClassName('square');
    var whosTurn = 1;
    return whosTurn;
    var player1Squares = [];
    var player2Squares = undefined;
    var gameOver = false;
    document.getElementsByClassName('square').innerHTML = '-';
    console.log(board.getElementsByClassName('square').innerHTML)
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
        if (squareCount === 3) {
            endGame(winningCombos[i], whoJustMarked);
            break;
        }
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