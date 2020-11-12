document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const allSquares: Array<HTMLDivElement> = [];
    const scoreDisplay = document.querySelector('#current-score');
    const resetButton = document.querySelector('#reset-button');

    const rows = 15;
    const cols = 15;

    let playerIndex: number = 0;
    let currentInvaderIndex: number = 0;
    let alienIndices: Array<number> = [];
    let aliensRemoved: Array<number>;
    let result: number;
    let direction: number;
    let invaderId: number;

    for (let i = 0; i < rows * cols; i++) {
        let newSquare = document.createElement('div');
        allSquares.push(newSquare);
        grid?.appendChild(newSquare);
    }

    resetButton?.addEventListener('click', () => {
        resetButton.textContent = 'Restart Game';
        alienIndices.forEach((index) => {
            allSquares[currentInvaderIndex + index].classList.remove('invader');
        });
        allSquares[playerIndex].classList.remove('player');
        playerIndex = 202;
        alienIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
            15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
            30, 31, 32, 33, 34, 35, 36, 37, 38, 39
        ];
        aliensRemoved = [];
        result = 0;
        direction = 1;
        clearInterval(invaderId);


        alienIndices.forEach((index) => {
            allSquares[currentInvaderIndex + index].classList.add('invader');
        });

        allSquares[playerIndex].classList.add('player');

        invaderId = setInterval(moveInvaders, 500);
        if (document.activeElement && document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    });

    const controlPlayer: ((event: KeyboardEvent) => void) = (event) => {
        if (event.code == 'ArrowLeft' && playerIndex % cols !== 0) {
            moveShooter(true);
        } else if (event.code == 'ArrowRight' && playerIndex % cols < cols - 1) {
            moveShooter(false);
        } else if (event.code == 'Space') {
            shoot();
        }
    };

    const moveShooter: ((goLeft: boolean) => void) = (goLeft) => {
        allSquares[playerIndex].classList.remove('player');
        if (goLeft) {
            playerIndex--;
        } else {
            playerIndex++;
        }
        allSquares[playerIndex].classList.add('player');
    };

    const moveInvaders: (() => void) = () => {
        const leftEdge = alienIndices[0] % cols === 0;
        const rightEdge = alienIndices[alienIndices.length - 1] % cols === cols - 1;

        if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
            direction = cols;
        } else if (direction === cols) {
            direction = leftEdge ? 1 : -1;
        }

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

    const shoot: (() => void) = () => {
        let laserId: number;
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

    document.addEventListener('keydown', controlPlayer);
})