# Space Invaders - Wakanda Defenders

## Overview
For my first project on the course I decided to build a version of the 80’s classic arcade shoot-em-up game space invaders with my own little twist of a Black Panther theme (including M’baku mask invader fleet, player-controlled Black Panther, lasers claws and staff bombs!).

Space Invaders is a simple grid-based game in which a shooter, moving left or right, has to shoot down as many alien invaders before they either get hit or the invaders reach the player's level.

## Brief
The brief called for a browser-based version of a classic arcade game using HTML, CSS and Vanilla JavaScript - no frameworks/libraries.

## Deployment
The game has been deployed with GitHub Pages and is available [here](https://uwaks.github.io/sei-project-one/).

## Getting started
Access the source code via the 'Clone or download' button.
Open the index.html in your browser of choice.

## Technologies Used
- HTML5
- CSS
- JavaScript
- GitHub

## Demonstration/cover image 
![screencast](assets/screencast.png)

## Process

### Planning
My development process started off by outlining the various functionalities that would make up a viable MVP and what would be considered stretch goals.

The next step was to break down the functionalities into smaller tasks and add some pseudo code to start to put some flesh on the outline. 

### Build Process
**Grid creation** - I created the game grid by assigning a width value to a constant and then using this within a for loop to create multiple div elements. The divs were then pushed to an empty array and appended to the grid.

```javascript
function createGrid () {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    // cell.textContent = i
    gameGrid.appendChild(cell)
    cells.push(cell)
  }  
}
createGrid()
```

**Player and Invader fleet creation** - The player and invaders were indices on the game grid, the player occupied a single div, whilst the invader fleet was an array of 15 divs. Each of the divs then either had a ‘player’ or ‘fighter’ class added (in the case of the invader array I used a map method to achieve this).

```javascript
// ***** Game Variables *****
let fighterIndex = [12, 13, 14, 15, 16, 22, 23, 24, 25, 26, 32, 33, 34, 35, 36]
let playerPosition = 94

// ***** Game-play Functions *****

//* Create Fighters & Player
function createFighters () {
  fighterIndex.map(index => {
    cells[index].classList.add('fighter')
  })
}

function createPlayer () {
  cells[playerPosition].classList.add('player')
}
```

**_Player Functionality_** - This was split into two distinct parts:

**Movement** - Player movement was created by adding and removing the player class to the left or right of the player start position inside of a Switch statement. Class addition and removal was tied into keyboard keycode events.

```javascript
function movePlayer (e) {  
  const x = playerPosition % width
  removePlayer()
  switch (e.keyCode) {
    case 39:
      if (x < width - 1) {
        playerPosition++ 
      }       
      break
    case 37:
      if (x > 0) {
        playerPosition--
      }      
      break    
  }
  addPlayer()
}
```

**Laser Fire** - This was also achieved by the addition and removal of the laser class again tied to a keyboard event, but also wrapped within a setInterval method to repeat the action every 500 milliseconds.

```javascript
function playerFire (e) {
  if (e.keyCode === 88) {  
    let laserPosition = playerPosition
    const laserId = setInterval(() => {
      const y = Math.floor(laserPosition / width)
      if (y > 0) {
        // laser sound
        cells[laserPosition].classList.remove('laser-beam') 
        laserPosition -= width
        cells[laserPosition].classList.add('laser-beam')
        
        //  Fighter Destruction Conditions & Outcomes
        
          //  explosion sound & visual
          
        } 
      } else {
        cells[laserPosition].classList.remove('laser-beam')
        clearInterval(laserId)
      }
    }, 500)
  }
```

**_Computer/Invader Functionality_** - This was also split into two distinct parts:

**Fleet Movement** - This was particularly tricky to code, the fleet movement pattern was right to the grid edge, then down, then left to the grid edge and down, and repeat. This movement was also achieved by adding and removing the fighter class with a map method, which itself was wrapped within a setInterval method to repeat the action every 1000 milliseconds.

```javascript
function fighterMovement () { 
  const movementId = setInterval(() => {
    cells.forEach(cell => {
      cell.classList.remove('fighter')      
    })
    fighterIndex = fighterIndex.map(fighter => {
      if (cells.indexOf(cells[fighter]) > cells.length - (width)) {
        playerLoses()
        clearInterval(movementId)
      } else {
        cells[fighter].classList.add('fighter')
        return fighter + 1
      }
    })
  }, 1000)
}
```

**Fleet Bombing** - I set up a function to randomly select a fighter from the fleet to release a bomb every 2000 milliseconds. The bombs movement was achieved by adding and removing the bomb class with a map method every 1000 milliseconds (using a setInterval method)

```javascript
function fighterBomb() { 
  const bomberId = setInterval(() => {
    const bomber = fighterIndex[Math.floor((Math.random() * fighterIndex.length))]
    if (fighterIndex.length < 1){
      clearInterval(bomberId)
    } else if (cells[bomber].classList.contains('fighter')) {
      let bombPosition = cells.indexOf(cells[bomber])
      const bombId = setInterval(() => { 
        const y = Math.floor(bombPosition / width)
        if (y < width - 1) {
          // bomb sound
          
        } else {
          cells[bombPosition].classList.remove('bomb')
          clearInterval(bombId)
        }
      }, 1000)      
    }
  }, 2000)
}
```

**Collision Detection**
The final piece of the jigsaw was detecting when a fighter had been hit by laser fire or reached the bottom of the grid, or when the player had been hit by a fighter bomb. Depending on which scenario occurred, either a playerWin or playerLoses function was called. These conditions were checked within if statements that looked for the presence of the different classes within the same div and then called the relevant function.

```javascript
cells[bombPosition].classList.remove('bomb') 
          bombPosition += width
          cells[bombPosition].classList.add('bomb')

          // Player Destruction Conditions & Outcomes
          if (cells[bombPosition].classList.contains('player')) {
            playerLoses()
          }
```

## Challenges
The biggest challenge I faced was the logic to control the invader fleet movement and to remove fighters hit by laser fire while still maintaining the fleet's integrity. For fleet movement I settled for moving in a straight line along the grid array and not the right, down, left, down movement pattern that's a hallmark of the game. I solved the fighter removal issue by returning a filtered array of divs that didn’t contain the laser class.

```javascript
//  Fighter Destruction Conditions & Outcomes
        if (cells[laserPosition].classList.contains('fighter')) {
          
          cells[laserPosition].classList.remove('fighter')
          cells[laserPosition].classList.remove('laser-beam')
          fighterIndex = fighterIndex.filter(fighter => fighter !== laserPosition + 1)
          clearInterval(laserId)
          //  explosion sound & visual
          newScore += 10
          updateScore(newScore)

          if (fighterIndex.length === 0) {
            playerWins()
            clearInterval(laserId)
          }

        } 
      } else {
        cells[laserPosition].classList.remove('laser-beam')
        clearInterval(laserId)
      }
```

Another tricky issue to overcome was constraining the moving elements within the grid borders; as there were up to four different moving elements at any given time this was a complex operation of setting different conditions within if statements (and sometimes multiple nested if statements) to check for each element's position on the grid.

```javascript
// Constrain laser beam on grid
const y = Math.floor(laserPosition / width)
      if (y > 0) {
        // laser sound
        
        //  Fighter Destruction Conditions & Outcomes
        
      } else {
        cells[laserPosition].classList.remove('laser-beam')
        clearInterval(laserId)
      }
```

## Wins
A big win for me with this project was the experience gained in a variety of essential programming skills e.g. logical problem solving and different planning stages. Also my understanding of array and setIntervals methods, as well as manipulating code using the DOM improved dramatically during this period.

## Future improvements
The main issue I will be looking at improving is the fleet movement pattern. As an aficionado of the space invader genre I really want to implement the correct movement!

Some other UX improvements would be: spawning new invaders, adding a mothership, different levels and a ‘High Score’ tally leveraging local storage.

## Key learnings
For my first attempt at building out a piece of software, there were so many different take homes to arise, but two in particular did stick out:

The importance of proper planning including a solid outline and some form of pseudo-code to act as a guide for the build cannot be overstated. Spending this time up front had some serious benefits to the downstream build.  

The DOM and how to manipulate elements within it, this exercise was a fun and effective way of gaining a deeper understanding of concepts like:

- Browser methods to target DOM elements such as querySelector and addEventListener.
- Adding and removing classes programmatically with classList.
- Different use cases for different JS array methods and the ideal use case for a for loop.
- Switch statements vs If statements.
- Working with timers using the setInterval method.
