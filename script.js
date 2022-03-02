'use strict';

const btnRollDice = document.querySelector('.btn--roll');
const btnNewGame = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
let current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const dice = document.querySelector('.dice');

let randomNum = Math.trunc(Math.random() * 6 + 1);
let playing = true;

dice.classList.add('hidden');

const name1 = prompt(`Enter the name of player 1`, `Player 1`);
const name2 = prompt(`Enter the name of player 2`, `Player 2`);

if (name1 != null) {
  document.querySelector('#name--0').innerHTML = name1;
}
if (name2 != null) {
  document.querySelector('#name--1').innerHTML = name2;
}

const shift = function () {
  player1.classList.toggle(`player--active`);
  player0.classList.toggle(`player--active`);
  //current1.textContent = 0;
};

// const shiftTo1 = function () {
//   player0.classList.remove(`player--active`);
//   player1.classList.add(`player--active`);
//   current0.textContent = 0;
// };

btnRollDice.addEventListener('click', e => {
  if (playing) {
    if (player0.classList.contains(`player--active`)) {
      current0.textContent = Number(current0.textContent) + randomNum;
      dice.classList.remove('hidden');
      dice.src = `dice-${randomNum}.png`;
      if (randomNum == 1) {
        dice.src = `dice-${randomNum}.png`;
        current0.textContent = 0;
        shift();
      }
    } else if (player1.classList.contains(`player--active`)) {
      current1.textContent = Number(current1.textContent) + randomNum;
      dice.classList.remove('hidden');
      dice.src = `dice-${randomNum}.png`;
      if (randomNum == 1) {
        current1.textContent = 0;
        shift();
      }
    }
    randomNum = Math.trunc(Math.random() * 6 + 1);
  }
});

btnHold.addEventListener('click', e => {
  if (playing) {
    if (player0.classList.contains(`player--active`)) {
      score0.textContent =
        Number(score0.textContent) + Number(current0.textContent);
      current0.textContent = 0;
      if (score0.textContent >= 100) {
        player0.classList.add(`player--winner`);
        player0.classList.remove(`player--active`);
        playing = false;
      }
      else {
        shift();
      }
    } else if (player1.classList.contains(`player--active`)) {
      score1.textContent =
        Number(score1.textContent) + Number(current1.textContent);
      current1.textContent = 0;
      if (score1.textContent >= 100) {
        player1.classList.add(`player--winner`);
        player1.classList.remove(`player--active`);
        playing = false;
      }
      else {
        shift();
      }
    } 
  }
});

btnNewGame.addEventListener('click', e => {
  playing = true;
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  dice.classList.add('hidden');
  if (!player0.classList.contains(`player--active`)) {
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
  }
  if (
    player0.classList.contains('player--winner')
      ? player0.classList.remove('player--winner')
      : player1.classList.remove('player--winner')
  );
});
