"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const allSquares = [];
    const logsLeft = [];
    const logsRight = [];
    const carsLeft = [];
    const carsRight = [];
    const timeLeft = document.querySelector('#current-time');
    const resetButton = document.querySelector('#reset-button');
    const result = document.querySelector('.status');
    const rows = 9;
    const cols = 9;
    let currentIndex;
    let currentTime;
    let timerId;
    let endIndex = 4;
    let gameState = 'paused';
    const moveFrog = (event) => {
        console.log('pre index', currentIndex, allSquares[currentIndex].classList);
        allSquares[currentIndex].classList.remove('frog');
        if (event.code === 'ArrowUp' && (currentIndex - cols) >= 0) {
            currentIndex -= cols;
        }
        else if (event.code === 'ArrowDown' && (currentIndex + cols) < (rows * cols)) {
            currentIndex += cols;
        }
        else if (event.code === 'ArrowRight' && (currentIndex % cols < cols - 1)) {
            currentIndex++;
        }
        else if (event.code === 'ArrowLeft' && (currentIndex % cols !== 0)) {
            currentIndex--;
        }
        if (['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'].includes(event.code)) {
            event.preventDefault();
        }
        allSquares[currentIndex].classList.add('frog');
        console.log('post index', currentIndex, allSquares[currentIndex].classList);
        checkLoss();
        checkWin();
    };
    const moveCars = () => {
        carsLeft.forEach((car) => {
            if (car.classList.contains('c1')) {
                car.classList.remove('c1');
                car.classList.add('c2');
            }
            else if (car.classList.contains('c2')) {
                car.classList.remove('c2');
                car.classList.add('c3');
            }
            else if (car.classList.contains('c3')) {
                car.classList.remove('c3');
                car.classList.add('c1');
            }
        });
        carsRight.forEach((car) => {
            if (car.classList.contains('c1')) {
                car.classList.remove('c1');
                car.classList.add('c3');
            }
            else if (car.classList.contains('c2')) {
                car.classList.remove('c2');
                car.classList.add('c1');
            }
            else if (car.classList.contains('c3')) {
                car.classList.remove('c3');
                car.classList.add('c2');
            }
        });
    };
    const moveLogs = () => {
        logsLeft.forEach((log) => {
            if (log.classList.contains('l1')) {
                log.classList.remove('l1');
                log.classList.add('l2');
            }
            else if (log.classList.contains('l2')) {
                log.classList.remove('l2');
                log.classList.add('l3');
            }
            else if (log.classList.contains('l3')) {
                log.classList.remove('l3');
                log.classList.add('l4');
            }
            else if (log.classList.contains('l4')) {
                log.classList.remove('l4');
                log.classList.add('l5');
            }
            else if (log.classList.contains('l5')) {
                log.classList.remove('l5');
                log.classList.add('l1');
            }
        });
        logsRight.forEach((log) => {
            if (log.classList.contains('l1')) {
                log.classList.remove('l1');
                log.classList.add('l5');
            }
            else if (log.classList.contains('l2')) {
                log.classList.remove('l2');
                log.classList.add('l1');
            }
            else if (log.classList.contains('l3')) {
                log.classList.remove('l3');
                log.classList.add('l2');
            }
            else if (log.classList.contains('l4')) {
                log.classList.remove('l4');
                log.classList.add('l3');
            }
            else if (log.classList.contains('l5')) {
                log.classList.remove('l5');
                log.classList.add('l4');
            }
        });
        if (currentIndex >= 27 && currentIndex < 35) {
            allSquares[currentIndex].classList.remove('frog');
            currentIndex++;
            allSquares[currentIndex].classList.add('frog');
        }
        if (currentIndex > 18 && currentIndex <= 26) {
            allSquares[currentIndex].classList.remove('frog');
            currentIndex--;
            allSquares[currentIndex].classList.add('frog');
        }
    };
    const checkWin = () => {
        if (allSquares[endIndex].classList.contains('frog')) {
            if (result) {
                result.textContent = 'You Win!';
            }
            allSquares[currentIndex].classList.remove('frog');
            clearInterval(timerId);
            document.removeEventListener('keydown', moveFrog);
            gameState = 'end';
            if (resetButton) {
                resetButton.textContent = 'Restart';
            }
        }
    };
    const checkLoss = () => {
        if ((currentTime === 0) ||
            (allSquares[currentIndex].classList.contains('c1')) ||
            (allSquares[currentIndex].classList.contains('l4')) ||
            (allSquares[currentIndex].classList.contains('l5'))) {
            if (result) {
                result.textContent = 'You Lose!';
            }
            allSquares[currentIndex].classList.remove('frog');
            clearInterval(timerId);
            document.removeEventListener('keydown', moveFrog);
            gameState = 'end';
            if (resetButton) {
                resetButton.textContent = 'Restart';
            }
        }
    };
    const moveEnvironment = () => {
        currentTime--;
        if (timeLeft instanceof HTMLSpanElement) {
            timeLeft.textContent = currentTime.toString();
        }
        moveCars();
        moveLogs();
        checkLoss();
    };
    const initBoard = () => {
        for (let i = 0; i < rows * cols; i++) {
            let newSquare = document.createElement('div');
            if (i === endIndex) {
                newSquare.classList.add('end');
            }
            if (i === 76) {
                newSquare.classList.add('start');
            }
            if (i >= 18 && i <= 26) {
                logsLeft.push(newSquare);
            }
            if (i >= 27 && i <= 35) {
                logsRight.push(newSquare);
            }
            if (i >= 45 && i <= 53) {
                carsRight.push(newSquare);
            }
            if (i >= 54 && i <= 62) {
                carsLeft.push(newSquare);
            }
            grid?.appendChild(newSquare);
            allSquares.push(newSquare);
        }
    };
    const resetBoard = () => {
        currentIndex = 76;
        currentTime = 20;
        if (timeLeft instanceof HTMLSpanElement) {
            timeLeft.textContent = currentTime.toString();
        }
        let logType = 1;
        let logClass;
        let roadType = 1;
        let roadClass;
        allSquares.forEach(square => {
            square.classList.remove('l1', 'l2', 'l3', 'l4', 'l5', 'c1', 'c2', 'c3');
        });
        for (let i = 0; i < rows * cols; i++) {
            let currSquare = allSquares[i];
            if (i === 76) {
                currSquare.classList.add('frog');
            }
            if (i >= 18 && i <= 26) {
                logClass = `l${logType}`;
                currSquare.classList.add('log-left', logClass);
                logType = logType < 5 ? logType + 1 : 1;
            }
            if (i >= 27 && i <= 35) {
                logClass = `l${logType}`;
                currSquare.classList.add('log-right', logClass);
                logType = logType < 5 ? logType + 1 : 1;
            }
            if (i >= 45 && i <= 53) {
                roadClass = `c${roadType}`;
                currSquare.classList.add('car-right', roadClass);
                roadType = roadType < 3 ? roadType + 1 : 1;
            }
            if (i >= 54 && i <= 62) {
                roadClass = `c${roadType}`;
                currSquare.classList.add('car-left', roadClass);
                roadType = roadType < 3 ? roadType + 1 : 1;
            }
        }
    };
    initBoard();
    resetBoard();
    resetButton?.addEventListener('click', () => {
        if (gameState === 'end') {
            resetBoard();
            gameState = 'paused';
        }
        if (gameState === 'playing') {
            clearInterval(timerId);
            if (result) {
                result.textContent = "Paused";
            }
            resetButton.textContent = 'Resume';
            document.removeEventListener('keydown', moveFrog);
            gameState = 'paused';
        }
        else if (gameState === 'paused') {
            timerId = setInterval(moveEnvironment, 1000);
            document.addEventListener('keydown', moveFrog);
            if (result) {
                result.textContent = "Playing";
            }
            resetButton.textContent = 'Pause';
            gameState = 'playing';
        }
        if (grid instanceof HTMLDivElement) {
            grid.focus();
        }
    });
});
