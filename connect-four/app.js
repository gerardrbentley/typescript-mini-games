"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const allSquares = [];
    const result = document.querySelector('#result');
    const currentPlayerDisplay = document.querySelector('#current-player');
    const resetButton = document.querySelector('#reset-button');
    resetButton?.addEventListener('click', () => {
        currentPlayer = 1;
        if (currentPlayerDisplay) {
            currentPlayerDisplay.textContent = currentPlayer.toString();
        }
        if (result) {
            result.textContent = "";
        }
        for (let i = 0; i < 42; i++) {
            allSquares[i].classList.remove('taken', 'possible', 'player-one', 'player-two');
            if (i >= 35) {
                allSquares[i].classList.add('possible');
            }
        }
    });
    let currentPlayer = 1;
    const selectSquare = (index) => {
        if (currentPlayer && allSquares[index + 7].classList.contains('taken')) {
            let newClass = currentPlayer === 1 ? 'player-one' : 'player-two';
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            if (currentPlayerDisplay) {
                currentPlayerDisplay.textContent = currentPlayer.toString();
            }
            allSquares[index].classList.add('taken', newClass);
            allSquares[index].classList.remove('possible');
            if (allSquares[index - 7]) {
                allSquares[index - 7].classList.add('possible');
            }
            checkBoard();
        }
        else {
            alert('cannot place here');
        }
    };
    const confirmWinner = (checkIndices) => {
        let checkSquares = checkIndices.map((x) => allSquares[x]);
        let isWinner = false;
        if (checkSquares.every((square) => { return square.classList.contains('player-one'); })) {
            if (result) {
                result.textContent = 'Player 1 Wins!';
            }
            currentPlayer = 0;
            isWinner = true;
        }
        else if (checkSquares.every((square) => { return square.classList.contains('player-two'); })) {
            if (result) {
                result.textContent = 'Player 2 Wins!';
            }
            currentPlayer = 0;
            isWinner = true;
        }
        return isWinner;
    };
    const checkBoard = () => {
        // Horizontal Win
        for (let col = 0; col < 4; col++) {
            for (let row = 0; row < 6; row++) {
                let startIndex = row * 7 + col;
                if (confirmWinner([startIndex, startIndex + 1, startIndex + 2, startIndex + 3])) {
                    return;
                }
            }
        }
        // Vertical Win
        for (let col = 0; col < 7; col++) {
            for (let row = 0; row < 3; row++) {
                let startIndex = row * 7 + col;
                if (confirmWinner([startIndex, startIndex + 7, startIndex + 14, startIndex + 21])) {
                    return;
                }
            }
        }
        // Top Left to Bot Right Win
        for (let col = 0; col < 4; col++) {
            for (let row = 0; row < 6; row++) {
                let startIndex = row * 7 + col;
                if (confirmWinner([startIndex, startIndex + 7 + 1, startIndex + 14 + 2, startIndex + 21 + 3])) {
                    return;
                }
            }
        }
        // Bot Left to Top Right Win
        for (let col = 0; col < 4; col++) {
            for (let row = 3; row < 6; row++) {
                let startIndex = row * 7 + col;
                if (confirmWinner([startIndex, startIndex - 7 + 1, startIndex - 14 + 2, startIndex - 21 + 3])) {
                    return;
                }
            }
        }
        // Check Draw
        if (allSquares.every((square) => { return square.classList.contains('taken'); })) {
            currentPlayer = 0;
            if (result) {
                result.textContent = 'It\'s a Draw!';
            }
        }
    };
    for (let i = 0; i < (7 * 7); i++) {
        let newSquare = document.createElement('div');
        allSquares.push(newSquare);
        grid?.appendChild(newSquare);
        if (i < 42) {
            newSquare.onclick = () => { selectSquare(i); };
        }
        if (i >= 42) {
            newSquare.classList.add('taken');
        }
        else if (i >= 35) {
            newSquare.classList.add('possible');
        }
    }
});
