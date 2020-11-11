document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const allSquares: Array<HTMLDivElement> = [];
    const scoreDisplay = document.querySelector('#current-score');
    const resetButton = document.querySelector('#reset-button');

    const rows = 10;
    const cols = 10;
    const speed = 0.9;
    const startInterval = 800;
    let foodIndex = 0;
    let currentSnake = [2, 1, 0];

    let direction: number;
    let score: number;
    let intervalTime: number;
    let interval: number;

    for (let i = 0; i < rows * cols; i++) {
        let newSquare = document.createElement('div');
        allSquares.push(newSquare);
        grid?.appendChild(newSquare);
    }

    resetButton?.addEventListener('click', () => {
        resetButton.textContent = 'Restart Game';
        currentSnake.forEach((index) => {
            allSquares[index].classList.remove('snake');
        });
        allSquares[foodIndex].classList.remove('food');
        clearInterval(interval);
        foodIndex = spawnFood();
        score = 0;
        direction = 1;
        if (scoreDisplay) {
            scoreDisplay.textContent = score.toString();
        }
        intervalTime = startInterval;
        currentSnake = [2, 1, 0];
        currentSnake.forEach((index) => {
            allSquares[index].classList.add('snake');
        });
        interval = setInterval(moveSnake, intervalTime);
    });

    const moveSnake = () => {
        if ((currentSnake[0] + cols >= (rows * cols) && direction === cols) ||
            (currentSnake[0] % cols === cols - 1 && direction === 1) ||
            (currentSnake[0] % cols === 0 && direction === -1) ||
            (currentSnake[0] - cols < 0 && direction === -cols) ||
            (allSquares[currentSnake[0] + direction].classList.contains('snake'))) {
            alert('Game Over Collision');
            return clearInterval(interval);
        }
        allSquares[currentSnake[currentSnake.length - 1]].classList.remove('snake');

        const tail = currentSnake.pop();
        if (tail === undefined) {
            console.log('ERROR SNAKE', currentSnake);
            throw new Error("Current snake has no array elements to pop");
        }
        currentSnake.splice(0, 0, (currentSnake[0] + direction));

        if (allSquares[currentSnake[0]].classList.contains('food')) {
            allSquares[currentSnake[0]].classList.remove('food');
            allSquares[tail].classList.add('snake');
            currentSnake.push(tail);
            foodIndex = spawnFood();

            clearInterval(interval);
            if (foodIndex !== -1) {
                score++;
                if (scoreDisplay) {
                    scoreDisplay.textContent = score.toString();
                }
                intervalTime = intervalTime * speed;
                interval = setInterval(moveSnake, intervalTime);
            }
        }

        allSquares[tail].classList.remove('snake');
        allSquares[currentSnake[0]].classList.add('snake');
    };

    const spawnFood: (() => number) = () => {
        let freeIndices = Array.from(Array(rows * cols).keys()).filter((index) => {
            return !currentSnake.includes(index);
        });
        if (freeIndices.length === 0 && scoreDisplay) {
            scoreDisplay.textContent = "You Win!";
            return -1;
        }
        let choice = Math.floor(Math.random() * freeIndices.length);
        allSquares[freeIndices[choice]].classList.add('food');
        return freeIndices[choice];
    };

    const control: ((event: KeyboardEvent) => void) = (event) => {
        if (event.code === 'ArrowRight' && direction !== -1) {
            direction = 1;
        } else if (event.code === 'ArrowUp' && direction !== rows) {
            direction = -rows;
        } else if (event.code === 'ArrowLeft' && direction !== 1) {
            direction = -1;
        } else if (event.code === 'ArrowDown' && direction !== -rows) {
            direction = rows;
        }
    };

    document.addEventListener('keydown', control);
})