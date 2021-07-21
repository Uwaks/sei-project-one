// **** DOM Elelments *****
const gameGrid = document.querySelector('.game-grid')
const startBtn = document.querySelector('#start')
const score = document.querySelector('#score span')
const lifeCount = document.querySelector('#life-count span')
const cells = []
let newScore = 0
let deadFighters = []

// ***** Grid Variables *****
const width = 10
const cellCount = width * width

// ***** Building the Grid *****
function createGrid () {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    // cell.textContent = i
    gameGrid.appendChild(cell)
    cells.push(cell)
  }  
}

createGrid()

// ***** Game Variables *****
let fighterIndex = [12, 13, 14, 15, 16, 22, 23, 24, 25, 26, 32, 33, 34, 35, 36]
let playerPosition = 94
let movingRight = true
let isAlive = true 


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

// * Game Start 
function gameStart () {  
  score.innerHTML = 0
  lifeCount.innerHTML = 0
  createFighters()
  createPlayer()
  fleetMovement()
}

// * Game Over Conditions
// Player wins
//  Destroy all aliens fighters
// Player loses
//  Loses 3 lives (lives = 0)

// ***** Alien Functionality *****
function removeFighters () {
  cells.forEach(cell => {
    return cell.classList.remove('fighter')      
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
  fighterIndex = fighterIndex.map(fighter => {
    if (cells[fighter].classList.contains('dead-fighter')) {
      console.log(fighter)
      return
    } else {
      console.log(fighter)
      cells[fighter].classList.add('fighter')
      return fighter + 1
    }
  })
}

function moveLeft () {
  !movingRight 
  fighterIndex = fighterIndex.map(fighter => {
    cells[fighter].classList.add('fighter')
    return fighter - 1
  })
  
}

// * Fighter Fleet Movement
function fleetMovement () { 
  // const x = fighterIndex % width
  // const reachRightEdge = movingRight && x < width - 1
  // const reachLeftEdge = !movingRight && x > 0
  setInterval(() => {
    removeFighters()
    moveRight() 
    // if ((reachRightEdge || reachLeftEdge)) {
    //   moveDown()
    // } else if (x > 0) {
    //   moveRight()
    // } else if (x < width - 1) {
    //   moveLeft()
    // }
  }, 7000)
    
  // where const x = fighterIndex % width
  // move right till x < width - 1
  // reachRightEdge = movingRight && x < width - 1
  // move down 1 row
  // move left until x > 0
  // reachLeftEdge = !movingRight && x > 0
  // move down 1 row 
  // if (reachRightEdge || reachLeftEdge) {
  //   moveDown()
  // }
  // else if (x > 0) {
  // moveRight()
  // }
  // else if (x < width - 1) {
//     moveLeft()
//   }  
}

// * Bombing

function alienFire() { 
  
}

//* Destruction

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
        cells[laserPosition].classList.remove('laser-beam') 
        laserPosition -= width
        cells[laserPosition].classList.add('laser-beam')
      } else {
        cells[laserPosition].classList.remove('laser-beam')
        clearInterval(laserId)
      }
      // Hit Conditions & Outcomes
      if (cells[laserPosition].classList.contains('fighter')) {
        cells[laserPosition].classList.remove('fighter')
        // cells[laserPosition].classList.add('dead-fighter')
        cells[laserPosition].classList.remove('laser-beam')        
        //  explosion sound & visual

        const shotFighter = fighterIndex.indexOf(laserPosition)
        deadFighters.push(shotFighter)

        newScore += 10 
        updateScore(newScore)
        clearInterval(laserId)
      }  
    }, 500)          
  }

  
  // // keyCode event 'keyup' for x
  // move up from playerPosition until:
  //   hit a fighter
  //   reach top row
  // // remove  
}

//* Player Dies
// if player && fighter class in same div
// if (cells[playerPosition].classsList.contains('player', 'fighter')) {
// Stop game (isAlive = false)
// reset game
// update lives (lives - 1)
// }
// Place gameplay inside a while loop/if statement with conditionals using isAlive (let isAlive = true)
// isAlive = false

// * Events
startBtn.addEventListener('click', gameStart)
window.addEventListener('keyup', movePlayer)
window.addEventListener('keyup', playerFire)

