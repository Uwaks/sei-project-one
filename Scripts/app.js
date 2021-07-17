// * DOM Elelments
const gameGrid = document.querySelector('.game-grid')
const startBtn = document.querySelector('#start')
const score = document.querySelector('#score span')
const lifeCount = document.querySelector('#life-count span')
const cells = []

// * grid variables
const width = 10
const cellCount = width * width


// * functions
function createGrid () {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    cell.textContent = i
    gameGrid.appendChild(cell)
    cells.push(cell)
  }
  let playerStart = cells[94].classList.add('player')
  let fighterStart = [cells[12], cells[13], cells[14], cells[15], cells[16], cells[22], cells[23], cells[24], cells[25], cells[26], cells[32], cells[33], cells[34], cells[35], cells[36]]
  fighterStart.forEach(fighter => {
    fighter.classList.add('fighter')
  })
}

function gameStart () {
  createGrid()
  score.innerHTML = 0
  lifeCount.innerHTML = 0
}

// * events
startBtn.addEventListener('click', gameStart)
