"use strict";
document.addEventListener('DOMContentLoaded', () => {
    class CardSelector {
        constructor() {
            this.first = { id: -1, name: 'first' };
            this.second = { id: -1, name: 'second' };
            this.select = (cardId, name) => {
                if (this.first.id === -1) {
                    this.first = { id: cardId, name: name };
                }
                else if (this.first.id === cardId || this.second.id === cardId) {
                    console.error('duplicate selection');
                }
                else if (this.second.id === -1) {
                    this.second = { id: cardId, name: name };
                }
            };
            this.isFull = () => {
                return this.first.id !== -1 && this.second.id !== -1;
            };
            this.contains = (x) => {
                return this.first.id === x || this.second.id === x;
            };
            this.clear = () => {
                this.first = { id: -1, name: 'first' };
                this.second = { id: -1, name: 'second' };
            };
        }
    }
    const createBoard = () => {
        const grid = document.querySelector('.grid');
        for (let i = 0; i < cardArray.length; i++) {
            let card = document.createElement('img');
            card.setAttribute('data-id', i.toString());
            card.setAttribute('draggable', "false");
            grid?.appendChild(card);
        }
        startGame();
    };
    const startGame = () => {
        cardArray.sort(() => 0.5 - Math.random());
        cardsWon = 0;
        updateScore();
        cardsChosen.clear();
        const images = document.querySelectorAll("img");
        images.forEach((node) => {
            if (!(node instanceof HTMLImageElement)) {
                throw new Error('Expected grid child nodes to be of type HTMLImageElement');
            }
            node.setAttribute('src', 'images/blank.png');
            node.addEventListener('click', flipCard);
        });
    };
    const updateScore = () => {
        if (resultDisplay) {
            resultDisplay.textContent = `${cardsWon} / ${cardArray.length / 2}`;
        }
    };
    const checkForMatch = () => {
        let cards = document.querySelectorAll('img');
        const { first, second } = cardsChosen;
        if (first.name === second.name) {
            alert('Found Match');
            cards[first.id].setAttribute('src', 'images/white.png');
            cards[second.id].setAttribute('src', 'images/white.png');
            cards[first.id].removeEventListener('click', flipCard);
            cards[second.id].removeEventListener('click', flipCard);
            cardsWon++;
            updateScore();
        }
        else {
            cards[first.id].setAttribute('src', 'images/blank.png');
            cards[second.id].setAttribute('src', 'images/blank.png');
        }
        cardsChosen.clear();
        if (cardsWon === cardArray.length / 2) {
            if (resultDisplay)
                resultDisplay.textContent = 'You Won!';
        }
    };
    const flipCard = (event) => {
        let card = event.target;
        let cardId = parseInt(card.getAttribute('data-id') || "-2");
        if (!cardsChosen.isFull() && !cardsChosen.contains(cardId)) {
            cardsChosen.select(cardId, cardArray[cardId].name);
            card.setAttribute('src', cardArray[cardId].img);
            if (cardsChosen.isFull()) {
                setTimeout(checkForMatch, 600);
            }
        }
    };
    const imageNames = [
        'cheeseburger',
        'fries',
        'hotdog',
        'ice-cream',
        'milkshake',
        'pizza',
    ];
    let cardArray = imageNames.map((name) => ({ name: name, img: `images/${name}.png` }));
    cardArray = [...cardArray, ...cardArray];
    const resultDisplay = document.querySelector('#current-score');
    const restartButton = document.querySelector('#reset-button');
    restartButton?.addEventListener('click', startGame);
    const cardsChosen = new CardSelector();
    let cardsWon = 0;
    createBoard();
});
