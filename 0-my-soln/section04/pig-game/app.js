/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dices, gameEnd, prevRoll;
var winnerScoreDOM = document.getElementById('final-score');

document.getElementsByClassName('btn-roll')[0].addEventListener('click', btnRoll);
// different approach of selecting the element with this class -> need [0] cause this returns array
// for more events, go to MDN -> /docs/Web/Events
// 'btn' is a *callback* function, which is a func that is param in another func

document.querySelector('.btn-hold').addEventListener('click', btnHold);
// tutorial way of getting to this element

document.querySelector('.btn-new').addEventListener('click', init);

init();

function init() {
    // initialize
    scores = [0,0];
    dices = [0,0];
    prevRoll = [0,0];
    gameEnd = false;
    winnerScoreDOM.value = 100; // default winning score

    // clear scores
    roundScore = 0;
    for (let i=0; i<scores.length; i++) {
        document.getElementById('score-' + i).textContent = roundScore;
        document.getElementById('current-' + i).textContent = roundScore;
        document.getElementById('name-' + i).textContent = 'Player ' + i;
        document.getElementsByClassName('player-' + i + '-panel')[0].classList.remove('winner');
        scores[i] = roundScore;
        document.querySelectorAll('.dice')[i].style.display = 'none';
    }

    // reset active player
    activePlayer = 0;
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}

function switchPlayer() {
    roundScore = 0;
    prevRoll = [0,0];
    document.getElementById('current-0').textContent = roundScore;
    document.getElementById('current-1').textContent = roundScore;

    activePlayer===0 ? activePlayer=1 : activePlayer=0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelectorAll('.dice')[0].style.display = 'none';
    document.querySelectorAll('.dice')[1].style.display = 'none';
}

function winner(activePlayer) {
    if (winnerScoreDOM.value <= scores[activePlayer]) {
        document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
        document.getElementsByClassName('player-' + activePlayer + '-panel')[0].classList.toggle('winner');
        gameEnd = true;
        return gameEnd;
    }
}

function rollDices() {
    for (let i=0; i<dices.length; i++) {
        dices[i] = Math.floor(Math.random() * 6) + 1;
        let diceDOM = document.querySelector('#dice-'+i);
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dices[i] + '.png';
    }
    // dices[1] = 6;  // this is to 
    // document.querySelector('#dice-1').src = 'dice-6.png';
}

function btnRoll() {
    if (!gameEnd) {
        rollDices();
        console.log("prev:" + prevRoll);
        console.log("curr:" + dices);

        if (prevRoll.includes(6) && dices.includes(6)) {
            console.log("here");
            // clear scores
            roundScore = 0;
            scores[activePlayer] = 0;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
            document.getElementById('score-' + activePlayer).textContent = roundScore;
    
            // switch player
            switchPlayer();
        } else if (dices[0] !== 1 && dices[1] !== 1) { // Update round score only if rolled number is NOT 1
            roundScore += dices[0] + dices[1];
            document.getElementById('current-' + activePlayer).textContent = roundScore;
            prevRoll = dices.slice(0);
        } else {
            switchPlayer();
        }
    }
}

function btnHold() {
    if (!gameEnd) {
        // add roundScore to totalScore
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        // check winner
        if (!winner(activePlayer)) {
            switchPlayer();
        }
    }
}




/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
