// **** DOM Elelments *****
const gameGrid = document.querySelector('.game-grid')
const startBtn = document.querySelector('#start')
const score = document.querySelector('#score span')
const lifeCount = document.querySelector('#life-count span')
const gameScreen = document.querySelector('#game-screen')
const winner = document.querySelector('#game-won')
const loser = document.querySelector('#game-lost')
const cells = []
let newScore = 0

// ***** Grid Variables *****
const width = 10
const cellCount = width * width

// ***** Building the Grid *****
function createGrid () {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    cell.textContent = i
    gameGrid.appendChild(cell)
    cells.push(cell)
  }  
}
createGrid()

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

// * Game Start Functions & Settings
function gameStart () {  
  score.innerHTML = 0
  lifeCount.innerHTML = 1
  createFighters()
  createPlayer()
  fighterMovement()
  fighterBomb()
}

// * Game Over Conditions
function playerWins () { 
  gameScreen.classList.add('no-show')
  winner.classList.remove('no-show')
}
function playerLoses () {
  gameScreen.classList.add('no-show')
  loser.classList.remove('no-show')
}
// ***** Alien Functionality *****

// * Fighter Fleet Movement
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

// * Bombing
function fighterBomb() { 
  const bomberId = setInterval(() => {
    const bomber = fighterIndex[Math.floor((Math.random() * fighterIndex.length))]
    if (cells[bomber].classList.contains('fighter')) {
      let bombPosition = cells.indexOf(cells[bomber])
      const bombId = setInterval(() => { 
        const y = Math.floor(bombPosition / width)
        if (y < width - 1) {
          // bomb sound
          cells[bombPosition].classList.remove('bomb') 
          bombPosition += width
          cells[bombPosition].classList.add('bomb')

          // Player Destruction Conditions & Outcomes
          if (cells[bombPosition].classList.contains('player')) {
            playerLoses()
          }
        } else if (fighterIndex.length === 0){
          clearInterval(bomberId)
          
        } else {
          cells[bombPosition].classList.remove('bomb')
          clearInterval(bombId)
        }
      }, 1000)      
    }
    console.log(fighterIndex.length)
  }, 2000)
}

// ***** Player Functionality *****

// * Movement
function addPlayer () {
  cells[playerPosition].classList.add('player')
}

function removePlayer () {
  cells[playerPosition].classList.remove('player')
}

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

// * Shooting
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
    }, 500)
  }

  // * Scoring
  function updateScore(){
    score.innerHTML = newScore
    return score
  }

  // ***** Events *****
}
startBtn.addEventListener('click', gameStart)
window.addEventListener('keyup', movePlayer)
window.addEventListener('keydown', playerFire)