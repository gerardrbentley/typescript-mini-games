Live preview available at [tsgames.gerardbentley.com](https://tsgames.gerardbentley.com) (Hosted with Github pages + Google domains)

# Resources

- Starting inspiration: [FreeCodeCamp.org Javascript Games Video](https://www.youtube.com/watch?v=lhNdUVh3qCc&t=688s)
- Github Corner SVG link: [By Tim Holman](https://github.com/tholman/github-corners)

# Project Dev / Running

## Dependencies

### NPM

Check if npm is installed:

```bash
npm --version
```

[Install NPM and Node](https://nodejs.org/en/)

### Typescript

Check if typescript is installed:

```bash
tsc --version
```

[Install Typescript](https://www.typescriptlang.org/#installation):

```bash
npm install -g typescript
# or
yarn global add typescript
```

## Download / Clone

```bash
git clone git@github.com:gerardrbentley/typescript-mini-games.git minigames
cd minigames
```

## Typescript transpile

Before launching a dev server, running the `tsc` command will transpile any `.ts` file into a `.js` equivalent side-by-side.
The `.js` version is linked in each HTML page for the server to serve and browser to consume.
Under the hood this uses the `tsconfig.json` file to set command line options.

```bash
tsc
```

## Running a Dev Server

Any method of serving files to the browser should be fine.

My preferences:

1. Python http server from current working directory (assumes a working python installation)

```bash
python -m http.server
# defaults to port 8000
```

2. Node http server from [this project](https://github.com/http-party/http-server)

```bash
npm install -g http-server
http-server
# defaults to port 8080
```

3. VS Code Live Server Extension

4. Drag and drop files into Firefox / Chrome and allow open Cross-Origin Requests.

# Grid Based Games

# Memory Game

## Overview

- 6 unique images are randomly assigned 2 slots in a 12 image grid (each unique image appears twice).
- The images are hidden from the player at the beginning
- The player clicks on a grid square to reveal the image in that slot
- The player clicks on a different grid square to reveal the image in that different slot
- If the two images are the same, they are replaced with blank squares and the player gets a point
- If the two images are different, they both return to being hidden and the player gets no points
- Once all pairs are correctly selected, the game is over
- At any point the board can be re-randomized and reset by pressing the reset button

## Implementation Notes

- Uses a `CardSelector` class to handle the logic of user selection
  - Prevents the same card from being 'selected' twice
  - Prevents revealing more than two cards at a time by clicking rapidly
  - Makes each selected card's unique id and name easily accessible for comparison
- Uses javascript's `querySelector()` to locate the game grid with the class tag `.grid` and the score text & reset button with id values `#current-score` and `#reset-button`
- Uses `querySelectorAll()` to loop over all images in the grid that have HTML type `img`
- Uses `document.createElement()` function to add all images to the HTML
- Uses `setAttribute()` to assign each image a unique id
- Uses `appendChild()` to set the images within the game board grid
- Uses `addEventListener()` and `removeEventListener()` to dynamically enable and disable the ability to reveal an image by clicking it

# Whack-A-Mole

## Overview

- A 3x3 grid of squares are blank until the game is started
- Once started, the mole will appear on a random square every 0.5 seconds, then dissappear (it may 'revisit' the same square multiple times in a row by `1/9 ^ NUM_TIMES` odds, visually not moving at all)
- If the player clicks on the mole's current square they get a point
- Clicking on the mole's current square multiple times will award no further points (unless it 'revists' the same square)
- Once 60 seconds have elapsed, the mole no longer appears and the game is over
- The game can be restarted at any time by clicking the start / restart button

## Implementation Notes

- Uses `setInterval()` to cause the mole to change location every 0.5 seconds and update the countdown timer every 1 second
- Uses `clearInterval()` to stop or reset the
- Uses `classList` to visually present the mole (coded as a css class `mole` that affects the image background of a given square, which are HTML div's)

# Connect Four

## Overview

- A 6x7 (Rows x Cols) grid of empty squares when the game is started
- Two players alternate taking turns placing a chip of their own color
- Players can only place chips in the lowest available row in a given column (i.e. the bottom row if no chips are in that row, the second from the bottom if there is one chip in the row already)
- A player wins when they have four of their colored chips in a vertical, horizontal, or diagonal line
- If all spaces on the board are taken and neither player has 4 in a row, the game is a draw
- The board can be reset at any time and control passed to player 1 by hitting the reset button

## Implementation Notes

- Uses a 1-dimensional Array to access the 42 grid squares from top left to bottom right (i.e. (0,0) is index 0 and (6,7) is index 41)
- Uses a hidden row of HTML div's below the bottom row to simplify the start condition of choosable rows
- After each valid selection checks if the board has a winner or is a draw

# Snake

## Overview

- A grid of empty squares represents the play area, at the start a snake is placed in a random location and is one square long
- The player controls the snake using arrow keys to change its direction
- At a set interval a piece of food will appear at a random location in the grid
- If the snake moves onto the same square as the food it will grow by one square, adding a point for the user
- If the snake tries to move onto a square already covered by its tail or off the grid, the game is over
- If the snake covers every square on the grid the player wins (difficult.)

## Implemenation Notes

- Uses KeyboardEvent's code to identify which arrow key is pressed if any
- Uses 1-dimensional Array to index grid locations and calculate the location of where the snake moves next based on arrow key direction
- Selects random food location from indices that are not part of the snake

# Space Invaders

## Overview

- A 15 x 15 Grid starts the game filled at the top left with a set of 30 invader aliens in rows of 10 and a player spaceship at the bottom
- As time passes the invaders advance towards the player ship, if they make contact the game is lost
- The player can shoot lasers vertically from their current x position and move left and right. If a laser hits an invader that invader disappears
- If the player destroys all invaders, the game is won

## Implementation Notes

# Frogger

## Overview

- The game grid contains some 'ground' blocks and some 'water' blocks
- The player frogger starts at the bottom starting block
- The player has 20 seconds to reach the ending block to win
- 'car' blocks move left and right across the screen on ground sections. If the player and a car block overlap, the player loses
- 'log' blocks move left and right across the screen on water sections. Stepping on logs allows the player to advance across water, stepping on water will make the player lose

## Implementation Notes

- Similar to snake and space invaders, collision is handled by checking if a grid square has CSS classes for both the frog and a car, both the frog and water, or both the frog and the end goal
- Pause function suspends keyboard control and timer. Timer is resumed by pressing the button again.
- Arrow Keys trigger `preventDefault()` to stop the window from scrolling with arrow keys while playing.
