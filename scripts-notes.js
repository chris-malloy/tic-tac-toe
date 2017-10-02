// Globals need to go at top


// console.log("Hello World")
// 1. Set up board --- Check
// 2. User should be able to click on a Button.
// When that happens the square should have that players mark(X or O)
// 3. If it's X turn put an X in. If it's O's turn, put a O in.
// 4. 3 means we nee to keep trak of who's turn it is
// When X goes, it becomes O's turn, when O goes it becomes X's turn.
// 5. Check to see if someone won the Gamepad. If so, congratulate them. otherwise do nothing

// squares is an array with 9 objects. Each object is the JS representation of the HTML tag
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
// console.log(squares);
// console.dir(squares);

for (let i = 0; i < squares.length; i++) {
    // console.log(squares[i]);
    // console.dir(squares[i]);
    // Now that we have each square individually (squares[i]), we will add a click listener squares[i]
    // adding an eventListener goes:
    // 1. What to listen to 
    // 2. addEventListener
    // 3. first arg: what event
    // 4. second arg: code to run if event happens
    squares[i].addEventListener('click', function(event) {
        // here, this is going to be the element that you click on
        // console.log(this);
        // call the markSquare function and pss the sqiuare they clicked on
        // Only call markSquare if gameOver === false
        if (!gameOver) {
            markSquare(this);
        } else {
            document.getElementById('message').innerHTML = `Player ${whoJustMarked} won the game!`;
            document.getElementById('message2').innerHTMl = "Would you like to play again?"
        }
    });

}

// Two things happen when someone clicks
// 1. we change the DOM for the user
// 2. we change the vars for JS.

function markSquare(squareClicked) {
    // console.log(squareClicked.innerHTML);
    if (squareClicked.innerHTML !== '-') {
        document.getElementById('message').innerHTML = "Sorry that square is taken.";
    } else if (whosTurn === 1) {
        whosTurn = 2;
        squareClicked.innerHTML = 'X';
        player1Squares.push(squareClicked.id);
        document.getElementById('message').innerHTML = "It's Player 2's turn.";
        checkWin(player1Squares, 1);
    } else {
        squareClicked.innerHTML = 'O';
        whosTurn = 1;
        player2Squares.push(squareClicked.id);
        document.getElementById('message').innerHTML = "It's Player 1's turn.";
        checkWin(player2Squares, 2);

    }
    // checkWin();
}

function checkWin(currentPlayerSquares, whoJustMarked) {
    // Outer Loop - check each winning combination
    for (let i = 0; i < winningCombos.length; i++) {
        // keep track of how many of this winning combo the player has
        var squareCount = 0;
        if (document.getElementById('button').clicked == true) {
            alert("button was clicked");
            squareCount = 0;
        }
        // inner loop - check a square inside a winning combination
        for (let j = 0; j < winningCombos[i].length; j++) {
            var winningSquare = winningCombos[i][j];
            if (currentPlayerSquares.indexOf(winningSquare) !== -1) {
                // the square belongs to the player we do not care where
                squareCount++;
            }
        } // end of j loop (row/diag/column complete)
        // check to see if the squareCount === 3;
        if (squareCount === 3) {
            // move stuff to a function
            endGame(winningCombos[i], whoJustMarked);
            break;
        }
    }
}

function endGame(winningCombo, whoJustMarked) {
    console.log(`Player ${whoJustMarked} won the game`);
    document.getElementById('message').innerHTML = `Player ${whoJustMarked} won the game!`;
    gameOver = true;
    document.getElementById('message2').innerHTMl = "Would you like to play again?";
    // loop through the winning combos
    for (let i = 0; i < winningCombo.length; i++) {
        document.getElementById(winningCombo[i]).className += ' winning-square';
    }
}





// 6. Hightlight the winning squares
// 7. Game must stop if someone won (i.e., can't keep going)