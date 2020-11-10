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

Starting inspiration: [FreeCodeCamp.org Javascript Games Video](https://www.youtube.com/watch?v=lhNdUVh3qCc&t=688s)

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
