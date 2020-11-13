document.addEventListener('DOMContentLoaded', () => {

    const rows = 20;
    const cols = 10;
    let allSquares: Array<HTMLDivElement>;

    const grid = initGrid();
    try {
        allSquares = Array.from(grid?.querySelectorAll('div'));
    } catch {
        throw new Error('No Divs found for Grid');
    }

    const startBtn = document.querySelector('.button');
    const hamburgerBtn = <HTMLInputElement>document.querySelector('.toggler');
    const menu = <HTMLDivElement>document.querySelector('.menu');
    const closeButton = <HTMLButtonElement>document.getElementsByClassName('close')[0];
    const scoreDisplay = <HTMLSpanElement>document.querySelector('.score-display');
    const linesDisplay = <HTMLSpanElement>document.querySelector('.lines-score');
    let currentIndex = 0;
    let currentRotation = 0;
    const width = 10;
    let score = 0;
    let lines = 0;
    let timerId: number | undefined;
    let nextRandom = 0;
    const colors = [
        'url(images/blue_block.png)',
        'url(images/pink_block.png)',
        'url(images/purple_block.png)',
        'url(images/peach_block.png)',
        'url(images/yellow_block.png)'
    ];

    function initGrid(): HTMLDivElement {
        let gridElement = <HTMLDivElement>document.querySelector('.grid');

        for (let i = 0; i < (rows * cols); i++) {
            let square = document.createElement('div');
            gridElement?.appendChild(square);
        }

        for (let i = 0; i < cols; i++) {
            let square = document.createElement('div');
            square.setAttribute('class', 'block3');
            gridElement.appendChild(square);
        }

        let previousGrid = document.querySelector('.previous-grid');

        for (let i = 0; i < 16; i++) {
            let div = document.createElement('div');
            previousGrid?.appendChild(div);
        }
        return gridElement;
    };

    function control(event: KeyboardEvent): void {
        if (event.code === 'ArrowRight') {
            moveRight();
        } else if (event.code === 'ArrowLeft') {
            moveLeft();
        } else if (event.code === 'ArrowUp') {
            rotate();
        } else if (event.code === 'ArrowDown') {
            moveDown();
        }
    }

    document.addEventListener('keydown', control);
    //The Tetrominoes
    const lTetromino = [
        [1, cols + 1, cols * 2 + 1, 2],
        [cols, cols + 1, cols + 2, cols * 2 + 2],
        [1, cols + 1, cols * 2 + 1, cols * 2],
        [cols, cols * 2, cols * 2 + 1, cols * 2 + 2]
    ];

    const zTetromino = [
        [0, cols, cols + 1, cols * 2 + 1],
        [cols + 1, cols + 2, cols * 2, cols * 2 + 1],
        [0, cols, cols + 1, cols * 2 + 1],
        [cols + 1, cols + 2, cols * 2, cols * 2 + 1]
    ];

    const tTetromino = [
        [1, cols, cols + 1, cols + 2],
        [1, cols + 1, cols + 2, cols * 2 + 1],
        [cols, cols + 1, cols + 2, cols * 2 + 1],
        [1, cols, cols + 1, cols * 2 + 1]
    ];

    const oTetromino = [
        [0, 1, cols, cols + 1],
        [0, 1, cols, cols + 1],
        [0, 1, cols, cols + 1],
        [0, 1, cols, cols + 1]
    ];

    const iTetromino = [
        [1, cols + 1, cols * 2 + 1, cols * 3 + 1],
        [cols, cols + 1, cols + 2, cols + 3],
        [1, cols + 1, cols * 2 + 1, cols * 3 + 1],
        [cols, cols + 1, cols + 2, cols + 3]
    ];

    const allTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

    let random = Math.floor(Math.random() * allTetrominoes.length);
    let current = allTetrominoes[random][currentRotation];

    let currentPosition = 4;

    function draw() {
        current.forEach((index) => {
            allSquares[currentPosition + index].classList.add('block');
            allSquares[currentPosition + index].style.backgroundImage = colors[random];
        });
    }

    function undraw() {
        current.forEach((index) => {
            allSquares[currentPosition + index].classList.remove('block');
            allSquares[currentPosition + index].style.backgroundImage = 'none';
        });
    }

    function moveDown() {
        undraw();
        currentPosition += cols;
        draw();
        freeze();
    }

    startBtn?.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId);
            timerId = undefined;
        } else {
            draw();
            timerId = setInterval(moveDown, 1000);
            nextRandom = Math.floor(Math.random() * allTetrominoes.length);
            displayShape();
        }
    });

    //move left and prevent collisions with shapes moving left
    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);
        if (!isAtRightEdge) currentPosition += 1;
        if (current.some(index => allSquares[currentPosition + index].classList.contains('block2'))) {
            currentPosition -= 1;
        }
        draw();
    }

    //move right and prevent collisions with shapes moving right
    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
        if (!isAtLeftEdge) currentPosition -= 1;
        if (current.some(index => allSquares[currentPosition + index].classList.contains('block2'))) {
            currentPosition += 1;
        }
        draw();
    }

    //freeze the shape
    function freeze() {
        // if block has settled
        if (current.some(index => allSquares[currentPosition + index + width].classList.contains('block3') || allSquares[currentPosition + index + width].classList.contains('block2'))) {
            // make it block2
            current.forEach(index => allSquares[index + currentPosition].classList.add('block2'));
            // start a new tetromino falling
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * allTetrominoes.length);
            current = allTetrominoes[random][currentRotation];
            currentPosition = 4;
            draw();
            displayShape();
            addScore();
            checkLoss();
        }
    }
    freeze();

    //Rotate the Tetromino
    function rotate() {
        undraw();
        currentRotation++;
        if (currentRotation === current.length) {
            currentRotation = 0;
        }
        current = allTetrominoes[random][currentRotation];
        draw();
    }

    //Game Over
    function checkLoss() {
        if (current.some(index => allSquares[currentPosition + index].classList.contains('block2')) && scoreDisplay) {
            scoreDisplay.innerHTML = 'end';
            clearInterval(timerId);
            document.removeEventListener('keydown', control);
        }
    }

    //show previous tetromino in scoreDisplay
    const displayWidth = 4;
    const displaySquares = <NodeListOf<HTMLDivElement>>document.querySelectorAll('.previous-grid div');
    let displayIndex = 0;

    const smallTetrominoes = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2], /* lTetromino */
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], /* zTetromino */
        [1, displayWidth, displayWidth + 1, displayWidth + 2], /* tTetromino */
        [0, 1, displayWidth, displayWidth + 1], /* oTetromino */
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] /* iTetromino */
    ];

    function displayShape() {
        displaySquares.forEach(square => {
            square.classList.remove('block');
            square.style.backgroundImage = 'none';
        });
        smallTetrominoes[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('block');
            displaySquares[displayIndex + index].style.backgroundImage = colors[nextRandom];
        });
    }

    //Add score
    function addScore() {
        for (currentIndex = 0; currentIndex < (rows * cols); currentIndex += cols) {
            const row = [currentIndex, currentIndex + 1, currentIndex + 2, currentIndex + 3, currentIndex + 4, currentIndex + 5, currentIndex + 6, currentIndex + 7, currentIndex + 8, currentIndex + 9];
            if (row.every(index => allSquares[index].classList.contains('block2'))) {
                score += 10;
                lines += 1;
                scoreDisplay.innerHTML = score.toString();
                linesDisplay.innerHTML = lines.toString();
                row.forEach((index) => {
                    allSquares[index].style.backgroundImage = 'none';
                    allSquares[index].classList.remove('block', 'block2');
                });
                //splice array
                const squaresRemoved = allSquares.splice(currentIndex, width);
                allSquares = squaresRemoved.concat(allSquares);
                allSquares.forEach(cell => grid.appendChild(cell));
            }
        }
    }

    //Styling eventListeners
    hamburgerBtn.addEventListener('click', () => {
        menu.style.display = 'flex';
    });
    closeButton.addEventListener('click', () => {
        menu.style.display = 'none';
    });
})