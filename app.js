/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

CODE RULES:
ES5 only

*/
var scores, roundScore, activePlayer, gamePlaying;
// gamePlaying is state var = true/false corresponding to game being played

init();
// initialize the game


// click on ROLL button
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // if game being played is true

        // 1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        // generating a number from 1 to 6

        //2. Display the result (show cards - png names correspond to numbers)
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        //3. Update the round score IF the rolled number was NOT a 1
        if (dice1 !== 1 && dice2 !== 1) {
            // Add score (save round score)
            roundScore += dice1 + dice2;
            // show that current score (html string could be 0 or 1 - linked with roundscore numbers)
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player if 1 is rolled
            setTimeout(nextPlayer, 800);
            // setTimeout to see 1 was rolled - 800 ms pause
        }
        
    
    }    
});


// HOLD button
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // if game being played now
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;
        // add to array and sum it up

        // Update the UI to show global score for active player
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        // Get final score condition
        var input = document.querySelector('.final-score').value;

        // Final score var
        var winningScore;
        
        // Undefined, 0, null or "" are COERCED to false
        // Anything else is COERCED to true
        if(input) {
            // if score was set up
            winningScore = input;
            // assign setted value to winningScore var
        } else {
            winningScore = 100;
            // else DEFAULT is 100
        }
        
        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
            // set game state to false - not being played
        } else {
            //Next player
            nextPlayer();
        }
    }
});


// next player turn func
function nextPlayer() {
    //Next player
    // Ternary operator toggle
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    // Restart current score var

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}


// NEW GAME button
document.querySelector('.btn-new').addEventListener('click', init);

// init function to set everything to beggining state
function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}