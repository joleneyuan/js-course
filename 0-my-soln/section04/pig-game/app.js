/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores=[0,0], roundScore=0, activePlayer=0;
var roundScoreDOM, winnerScoreDOM=document.getElementById('final-score');
winnerScoreDOM.value = 100; // default winning score


init();

function init() {
    // clear dice
    document.querySelector('.dice').style.display = 'none';

    // clear scores
    for (let i=0; i<scores.length; i++) {
        document.getElementById('score-' + i).textContent = 0;
        document.getElementById('current-' + i).textContent = 0;
        document.getElementById('name-' + i).textContent = 'Player ' + i;
        document.getElementsByClassName('player-' + i + '-panel')[0].classList.remove('winner');
        scores[i] = 0;
    }

    // reset active player
    activePlayer = 0;
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}

function switchPlayer() {
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    activePlayer===0 ? activePlayer=1 : activePlayer=0;
    // document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function winner(activePlayer) {
    console.log('final:' + winnerScoreDOM.value);
    if (winnerScoreDOM.value <= scores[activePlayer]) {
        document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
        document.getElementsByClassName('player-' + activePlayer + '-panel')[0].classList.toggle('winner');
        return true;
    }
}

function btnRoll() {
    console.log('mouse clicked');

    // 1. Generate random number
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    // 3. Update round score only if rolled number is NOT 1
    if (dice !== 1) {
        roundScoreDOM = document.getElementById('current-' + activePlayer);
        roundScore += dice;
        roundScoreDOM.textContent = roundScore;
    } else {
        switchPlayer();
    }
}

function btnHold() {
    // add roundScore to totalScore
    scores[activePlayer] += roundScore;
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

    // check winner
    if (!winner(activePlayer)) {
        switchPlayer();
    }
}

document.getElementsByClassName('btn-roll')[0].addEventListener('click', btnRoll);
// different approach of selecting the element with this class -> need [0] cause this returns array
// for more events, go to MDN -> /docs/Web/Events
// 'btn' is a *callback* function, which is a func that is param in another func

document.querySelector('.btn-hold').addEventListener('click', btnHold);
// tutorial way of getting to this element

document.querySelector('.btn-new').addEventListener('click', init);



/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/