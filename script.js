'use strict';
// Selecting Elements
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const btnRollDice = document.querySelector('.btn--roll');
const btnNewGame = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');

const diceRoll = function () {
  return Math.trunc(Math.random() * 6) + 1;
};

// diceEl.classList.add('hidden');

// console.log(diceRoll());
// document.getElementById('dice-1').src = 'dice-1.png';

let diceTotal = 0;
let totalScore0 = 90;
let totalScore1 = 90;
let player0sTurn = true;

// Function definitions
const resettingDisplays = function () {
  diceEl.classList.add('hidden');
  currentScore0.textContent = diceTotal;
  score0.textContent = totalScore0;
  currentScore1.textContent = diceTotal;
  score1.textContent = totalScore1;
};

const refreshCurrentDisplays = function () {
  if (player0sTurn) {
    currentScore0.textContent = diceTotal;
  } else {
    currentScore1.textContent = diceTotal;
  }
};

const switchPlayers = function () {
  if (player0sTurn) {
    player0.classList.remove('player--active');
    player1.classList.add('player--active');
  } else {
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
  }
  player0sTurn = !player0sTurn;
};

resettingDisplays();

btnRollDice.addEventListener('click', function () {
  let dice = diceRoll();
  diceEl.classList.remove('hidden');
  // Displaying dice
  diceEl.src = `dice-${dice}.png`;
  // document.getElementById('dice-1').src = `dice-${dice}.png`;

  if (dice === 1) {
    diceTotal = 0;
    refreshCurrentDisplays();

    switchPlayers();
  } else {
    diceTotal += dice;
    refreshCurrentDisplays();
  }
});

btnHold.addEventListener('click', function () {
  if (player0sTurn) {
    totalScore0 += diceTotal;
  } else {
    totalScore1 += diceTotal;
  }
  diceTotal = 0;
  refreshCurrentDisplays();

  score0.textContent = totalScore0;
  score1.textContent = totalScore1;

  if (totalScore0 >= 100) {
    player0.classList.add('player--winner');
    btnRollDice.disabled = true;
    btnHold.disabled = true;
  } else if (totalScore1 >= 100) {
    player1.classList.add('player--winner');
    btnRollDice.disabled = true;
    btnHold.disabled = true;
  } else {
    switchPlayers();
  }

  diceEl.classList.add('hidden');
});

btnNewGame.addEventListener('click', function () {
  //   reseting values
  totalScore0 = 0;
  totalScore1 = 0;
  diceTotal = 0;
  player0sTurn = true;
  // reseting displays
  resettingDisplays();
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  btnRollDice.disabled = false;
  btnHold.disabled = false;
});
