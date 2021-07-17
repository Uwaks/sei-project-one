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
  const fighterPosition = fighterStart
  fighterPosition.forEach(fighter => {
    fighter.classList.remove('fighter')
  })
}

function addFighters () {
  
}

function fighterMovement () {
  setInterval(() => {
    console.log('move fighters')
  }, 1000)
}

function gameStart () {  
  score.innerHTML = 0
  lifeCount.innerHTML = 0
  createFighters()
  createPlayer()
  fighterMovement()
}


function handleKeyUp (e) {
  console.log('Key Up!', e.keyCode)  
}

// * Events
startBtn.addEventListener('click', gameStart)
window.addEventListener('keyup', handleKeyUp)
