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
let fighterIndex = [12, 13, 14, 15, 16, 22, 23, 24, 25, 26, 32, 33, 34, 35, 36]
let playerPosition = 94
let fleetPosition

// * Functions

//* Create Fighters & Player
function createFighters () {
  for (let i = 0; i < fighterIndex.length; i++)
    cells[fighterIndex[i]].classList.add('fighter')
}

function createPlayer () {
  return cells[94].classList.add('player')
}

// * Fighter Fleet Movement
function removeFighters () {
  for (let i = 0; i < fighterIndex.length; i++)
    cells[fighterIndex[i]].classList.remove('fighter')
}

function moveDown () {
  fighterIndex.map(fighter => {
    fighter += 10
    cells[fighter].classList.add('fighter')
  })
}

function moveRight () {
  const x = fleetPosition % width
  if (x < width - 1) {
    fleetPosition = fighterIndex.map(fighter => {
      fighter += 1 
      cells[fighter].classList.add('fighter')
    })
  }}

function moveLeft () {
  fighterPosition.map(fighter => {
    return fighter -= 1   
  })
}



function fighterMovement () {
  setInterval(() => {
    moveRight()
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
