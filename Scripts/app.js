// * DOM Elelments
const gameGrid = document.querySelector('.game-grid')
const startBtn = document.querySelector('#start')
const score = document.querySelector('#score span')
const lifeCount = document.querySelector('#life-count span')
const cells = []

// * Grid Variables
const width = 10
const cellCount = width * width

// * Building the Grid
function createGrid () {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    cell.textContent = i
    gameGrid.appendChild(cell)
    cells.push(cell)
  }  
}

createGrid()

// * Game Variables
const fighterStart = [cells[12], cells[13], cells[14], cells[15], cells[16], cells[22], cells[23], cells[24], cells[25], cells[26], cells[32], cells[33], cells[34], cells[35], cells[36]]

let fighterPosition = [12, 13, 14, 15, 16, 22, 23, 24, 25, 26, 32, 33, 34, 35, 36]

let playerPosition = 94

// * Functions

//* Create Fighters & Player
function createFighters () {
  fighterStart.forEach(fighter => {
    fighter.classList.add('fighter')
  })
}

function createPlayer () {
  return cells[94].classList.add('player')
}

// * Fighter Fleet Movement
function removeFighters () {
  fighterStart.forEach(fighter => {
    fighter.classList.remove('fighter')
  })
}

function addFighters () {
  fighterPosition.forEach(fighter => {
    fighter.classList.add('fighter')
  })
}

function moveRight () {
  fighterPosition.map(fighter => {
    return fighter += 1   
  })
}

function moveLeft () {
  fighterPosition.map(fighter => {
    return fighter -= 1   
  })
}

function moveDown () {
  fighterPosition.map(fighter => {
    return fighter += 10
  })
}

function fighterMovement () {
  setInterval(() => {
    // move right till x < width - 1
    // move down 1 row
    // move left until x > 0
    // move down 1 row
    // repeat
  }, 1000) 
}

// * Game Start
function gameStart () {  
  score.innerHTML = 0
  lifeCount.innerHTML = 0
  createFighters()
  createPlayer()
  fighterMovement()
}

// * Laser Fire
function laserFire () {
  setInterval(()=> {
    // keyCode event 'keyup' for x
    // move up from playerPosition until:
      // hit a fighter
      // reach top row
    // remove
  })
}

// * Player Movement
function addPlayer () {
  cells[playerPosition].classList.add('player')
}

function removePlayer () {
  cells[playerPosition].classList.remove('player')
}

function movePlayer (e) {  
  const x = playerPosition % width
  removePlayer()
  switch(e.keyCode) {
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

// * Events
startBtn.addEventListener('click', gameStart)
window.addEventListener('keyup', movePlayer)
