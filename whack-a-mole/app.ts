const allSquares = document.querySelectorAll('.square');
const allMoles = document.querySelectorAll('.mole');
const timeLeft = document.querySelector("#time-left");
const startButton = document.querySelector("#reset-button");
let scoreDisplay = document.querySelector('#current-score');

let hits: number;
let currentTime = parseInt(timeLeft?.textContent || "60");
let targetPosition: string;
let moleTimer: number;
let countdownTimer: number;

const randomSquare: (() => void) = () => {
    allSquares.forEach(square => {
        square.classList.remove('mole');
    });
    let randomPosition = allSquares[Math.floor(Math.random() * 9)];
    randomPosition.classList.add('mole');

    targetPosition = randomPosition.id;
};

allSquares.forEach(square => {
    square.addEventListener('mouseup', () => {
        if (square.id === targetPosition) {
            hits++;
            if (scoreDisplay) {
                scoreDisplay.textContent = hits.toString();
            }
            targetPosition = "none";
        }
    });
});

const countDown: (() => void) = () => {
    currentTime--;
    if (timeLeft) {
        timeLeft.textContent = currentTime.toString();
    }

    if (currentTime === 0) {
        clearInterval(moleTimer);
        clearInterval(countdownTimer);
        alert(`GAME OVER! You Whacked ${ hits } Moles!`);
    }
};

startButton?.addEventListener('click', () => {
    startButton.textContent = "Restart Game";
    hits = 0;
    currentTime = 60;

    if (scoreDisplay) {
        scoreDisplay.textContent = hits.toString();
    }
    if (timeLeft) {
        timeLeft.textContent = currentTime.toString();
    }
    clearInterval(moleTimer);
    clearInterval(countdownTimer);
    moleTimer = setInterval(randomSquare, 500);
    countdownTimer = setInterval(countDown, 1000);
});