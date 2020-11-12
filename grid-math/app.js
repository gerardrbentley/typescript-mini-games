"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let allSquares = [];
    const rowsInput = document.querySelector('#rows');
    const colsInput = document.querySelector('#columns');
    const highlightInput = document.querySelector('#selection-index');
    const highlightX = document.querySelector('#selection-x');
    const highlightY = document.querySelector('#selection-y');
    const hideButton = document.querySelector('#hide-info');
    const blurb = document.querySelector('#blurb');
    hideButton?.addEventListener('click', () => {
        if (blurb instanceof HTMLDivElement) {
            let isHidden = blurb.classList.contains('hidden');
            if (isHidden) {
                blurb.classList.remove('hidden');
            }
            else {
                blurb.classList.add('hidden');
            }
        }
    });
    let rows = 10;
    let cols = 10;
    let currentIndex = 0;
    const updateGrid = () => {
        allSquares.forEach((square) => { grid?.removeChild(square); });
        allSquares = [];
        if (rowsInput && rowsInput instanceof HTMLInputElement) {
            rows = parseInt(rowsInput.value);
            rows = rows > 0 ? rows : 1;
        }
        if (colsInput && colsInput instanceof HTMLInputElement) {
            cols = parseInt(colsInput.value);
            cols = cols > 0 ? cols : 1;
        }
        if (grid && grid instanceof HTMLDivElement) {
            grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
            grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        }
        // grid?.setAttribute('height', (rows * 20).toString());
        // grid?.setAttribute('width', (cols * 20).toString());
        for (let i = 0; i < rows * cols; i++) {
            let newSquare = document.createElement('div');
            newSquare.textContent = i.toString();
            newSquare.addEventListener('click', () => { updateHighlight(i); });
            grid?.appendChild(newSquare);
            allSquares.push(newSquare);
        }
        if (currentIndex > (rows * cols) - 1) {
            updateHighlight(0);
        }
        else {
            updateHighlight(currentIndex);
        }
    };
    const updateHighlight = (index) => {
        if (currentIndex < allSquares.length - 1) {
            allSquares[currentIndex].classList.remove('highlight');
        }
        currentIndex = index;
        allSquares[currentIndex].classList.add('highlight');
        if (highlightInput instanceof HTMLSpanElement) {
            highlightInput.textContent = index.toString();
        }
        if (highlightX instanceof HTMLSpanElement) {
            highlightX.textContent = (index % cols).toString();
        }
        if (highlightY instanceof HTMLSpanElement) {
            highlightY.textContent = (Math.floor(index / cols)).toString();
        }
    };
    if (rowsInput && rowsInput instanceof HTMLInputElement) {
        rowsInput.value = rows.toString();
        rowsInput.addEventListener('input', updateGrid);
    }
    if (colsInput && colsInput instanceof HTMLInputElement) {
        colsInput.value = cols.toString();
        colsInput.addEventListener('input', updateGrid);
    }
    updateGrid();
});
