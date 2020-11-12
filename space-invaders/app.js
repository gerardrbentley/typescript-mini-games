"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const allSquares = [];
    const scoreDisplay = document.querySelector('#current-score');
    const resetButton = document.querySelector('#reset-button');
    const rows = 15;
    const cols = 15;
    let playerIndex = 202;
    let currentInvaderIndex = 0;
    let aliensRemoved = [];
    let result = 0;
    let direction = 1;
    let invaderId;
    for (let i = 0; i < rows * cols; i++) {
        let newSquare = document.createElement('div');
        allSquares.push(newSquare);
        grid?.appendChild(newSquare);
    }
    const alienIndices = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39
    ];
    alienIndices.forEach((index) => {
        allSquares[currentInvaderIndex + index].classList.add('invader');
    });
    allSquares[playerIndex].classList.add('player');
    const controlPlayer = (event) => {
        if (event.code == 'ArrowLeft' && playerIndex % cols !== 0) {
            moveShooter(true);
        }
        else if (event.code == 'ArrowRight' && playerIndex % cols < cols - 1) {
            moveShooter(false);
        }
        else if (event.code == 'Space') {
            shoot();
        }
    };
    const moveShooter = (goLeft) => {
        allSquares[playerIndex].classList.remove('player');
        if (goLeft) {
            playerIndex--;
        }
        else {
            playerIndex++;
        }
        allSquares[playerIndex].classList.add('player');
    };
    document.addEventListener('keydown', controlPlayer);
    const moveInvaders = () => {
        const leftEdge = alienIndices[0] % cols === 0;
        const rightEdge = alienIndices[alienIndices.length - 1] % cols === cols - 1;
        if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
            console.log('left', leftEdge, 'right', rightEdge, direction);
            direction = cols;
        }
        else if (direction === cols) {
            console.log('pre direction', direction);
            direction = leftEdge ? 1 : -1;
            console.log('post', direction, 'left', leftEdge);
        }
        console.log(direction);
        for (let i = 0; i <= alienIndices.length - 1; i++) {
            allSquares[alienIndices[i]].classList.remove('invader');
        }
        for (let i = 0; i <= alienIndices.length - 1; i++) {
            alienIndices[i] += direction;
        }
        for (let i = 0; i <= alienIndices.length - 1; i++) {
            if (!aliensRemoved.includes(i)) {
                allSquares[alienIndices[i]].classList.add('invader');
            }
        }
        // Check Loss Conditions
        if (allSquares[playerIndex].classList.contains('invader') && allSquares[playerIndex].classList.contains('player') && scoreDisplay) {
            allSquares[playerIndex].classList.add('boom');
            scoreDisplay.textContent = 'Game Over!';
            clearInterval(invaderId);
        }
        for (let i = 0; i <= alienIndices.length - 1; i++) {
            if (alienIndices[i] > (allSquares.length - (cols - 1)) && scoreDisplay) {
                scoreDisplay.textContent = 'Game Over!';
                clearInterval(invaderId);
            }
        }
        if (aliensRemoved.length === alienIndices.length && scoreDisplay) {
            scoreDisplay.textContent = 'You Win!';
            clearInterval(invaderId);
            alert('You Won!');
        }
    };
    invaderId = setInterval(moveInvaders, 500);
    const shoot = () => {
        let laserId;
        let currentLaserIndex = playerIndex;
        const moveLaser = () => {
            allSquares[currentLaserIndex].classList.remove('laser');
            currentLaserIndex -= cols;
            allSquares[currentLaserIndex].classList.add('laser');
            if (allSquares[currentLaserIndex].classList.contains('invader')) {
                allSquares[currentLaserIndex].classList.remove('laser', 'invader');
                allSquares[currentLaserIndex].classList.add('boom');
                setTimeout(() => allSquares[currentLaserIndex].classList.remove('boom'), 250);
                clearInterval(laserId);
                const alienToRemove = alienIndices.indexOf(currentLaserIndex);
                aliensRemoved.push(alienToRemove);
                result++;
                if (scoreDisplay) {
                    scoreDisplay.textContent = result.toString();
                }
            }
            if (currentLaserIndex < cols) {
                clearInterval(laserId);
                setTimeout(() => allSquares[currentLaserIndex].classList.remove('laser'), 100);
            }
        };
        laserId = setInterval(moveLaser, 100);
    };
});
