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

const fighterPosition = [12, 13, 14, 15, 16, 22, 23, 24, 25, 26, 32, 33, 34, 35, 36]

let playerPosition = 94

// * Functions
function createFighters () {
  fighterStart.forEach(fighter => {
    fighter.classList.add('fighter')
  })
}

function createPlayer () {
  return cells[94].classList.add('player')
}

function removeFighters () {
  fighterPosition.forEach(fighter => {
    fighter.classList.remove('fighter')
  })
}

function addFighters () {

}

function fighterMovement () {

}

function playerMovement () {

}

function gameStart () {  
  score.innerHTML = 0
  lifeCount.innerHTML = 0
  createFighters()
  createPlayer()
  fighterMovement()
}

function addPlayer () {
  cells[playerPosition].classList.add('player')
}

function removePlayer () {
  cells[playerPosition].classList.remove('player')
}


function handleKeyUp (e) {
  
  removePlayer()
  switch(e.keyCode) {
    case 39:
      playerPosition++  
      break
    case 37:
      playerPosition--
      break    
  }
  addPlayer()

}

// * Events
startBtn.addEventListener('click', gameStart)
window.addEventListener('keyup', handleKeyUp)
