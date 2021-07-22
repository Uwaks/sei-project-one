// **** DOM Elelments *****
const gameGrid = document.querySelector('.game-grid')
const startBtn = document.querySelector('#start')
const score = document.querySelector('#score span')
const lifeCount = document.querySelector('#life-count span')
const cells = []
const deadFighters = []
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
let movingRight = true

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
  lifeCount.innerHTML = 0
  createFighters()
  createPlayer()
  fighterMovement()
}

// * Game Over Conditions
// function gameOver (x) {
//   if (x = playerWins) {

//   } else {

//   }
// }
// if (fighterIndex === 0) {
//     displayResult.innerHTML = 'You Win!!'      
// } else if (cells[playerPosition].classList.contains('fighter')) {
//   displayResult.innerHTML = 'You lose!!'
// } else if (player dies) {
//   displayResult.innerHTML = 'You lose!!'
// }


// ***** Alien Functionality *****

function removeFighters () {
  cells.forEach(cell => {
    cell.classList.remove('fighter')      
  })
}

function moveDown () {
  fighterIndex = fighterIndex.map(fighter => {    
    cells[fighter].classList.add('fighter')
    return fighter += width
  })
}

function moveRight () {
  movingRight
  cells.forEach(cell => {
    cell.classList.remove('fighter')      
  })
  fighterIndex = fighterIndex.map(fighter => {
    cells[fighter].classList.add('fighter')
    return fighter + 1
  })
}

function moveLeft () {
  movingRight = false
  fighterIndex = fighterIndex.forEach(fighter => {
    console.log(fighter)
    cells[fighter].classList.add('fighter')
    return fighter + 1
    // }
  })
}

// * Fighter Fleet Movement
function fighterMovement () { 
  setInterval(() => {
    // removeFighters()
    moveRight()  
  }, 1000)
  // where const x = fighterIndex % width
  // move right till x < width - 1
  // reachRightEdge = movingRight && x < width - 1
  // move down 1 row
  // move left until x > 0
  // reachLeftEdge = !movingRight && x > 0
  // move down 1 row 
  // if x > 0 moveRight
  // else if x < width - 1 moveleft
}

// * Bombing
function fighterBomb() { 
  // // generate random number from fighterIndex to assign bomber
  // // release bomb
  // hit player
  // // miss player
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
            clearInterval(bombId)
          }
        } else {
          cells[bombPosition].classList.remove('bomb')
        }
        // }
      }, 1000)      
    }
    
    // clearInterval(bomberId)
    // Player wins
  }, 2000)
}
fighterBomb()


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
function updateScore(){
  score.innerHTML = newScore
  return score
}

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
            console.log('game over')
            // gameOver(playerWins)
          }

        } 
      } else {
        cells[laserPosition].classList.remove('laser-beam')
        clearInterval(laserId)
      }
    }, 500)
  }

  //* Player Dies
  // if (cells[playerPosition].classList.contains('fighter')) {
  // Stop game, reset game, update lives with lives - 1
  // } 
  // Place gameplay inside a while loop with conditionals using isAlive
  // isAlive = false

  // ***** Events *****
}
startBtn.addEventListener('click', gameStart)
window.addEventListener('keyup', movePlayer)
window.addEventListener('keydown', playerFire)