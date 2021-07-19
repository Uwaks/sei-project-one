// **** DOM Elelments *****
const gameGrid = document.querySelector('.game-grid')
const startBtn = document.querySelector('#start')
const score = document.querySelector('#score span')
const lifeCount = document.querySelector('#life-count span')
const cells = []

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
let fleetPosition


// ***** Functions *****

//* Create Fighters & Player
function createFighters () {
  fighterIndex.map(index => {
    cells[index].classList.add('fighter')
  })
}

function createPlayer () {
  return cells[playerPosition].classList.add('player')
}

// ***** Game Start *****
function gameStart () {  
  score.innerHTML = 0
  lifeCount.innerHTML = 0
  createFighters()
  // createPlayer()
  // fighterMovement()
}

// ***** Alien Functionality *****

// * Fighter Fleet Movement
// function removeFighters () {
//   fighterIndex.map(index => {
//     index +=
//     cells[index].classList.remove('fighter')
//   })
// }

function moveDown () {
  fleetPosition = fighterIndex.map(index => {
    index += width
    cells[fleetPosition].classList.add('fighter')
  })
}

// function moveRight () {
//   const x = fleetPosition % width
//   if (x < width - 1) {
//     fleetPosition = fighterIndex.map(fighter => {
//       fighter += 1 
//       cells[fighter].classList.add('fighter')
//     })
//   }}

function moveRight () {
  fighterIndex = fighterIndex.map(fighter => {
    cells[fighter].classList.add('fighter')
    return fighter + 1
  })
}

function moveLeft () {
  fighterIndex = fighterIndex.map(fighter => {
    cells[fighter].classList.add('fighter')
    return fighter - 1
  })
  
}

function fighterMovement () { 
  setInterval(() => {
    cells.forEach(cell => {
      return cell.classList.remove('fighter')      
    })
    fighterIndex = fighterIndex.map(fighter => {
      cells[fighter].classList.add('fighter')
      return fighter + 1      
    })  
  }, 1000)
  console.log('This isn\'t working!!!')
  // }) 
  
    
  // move right till x < width - 1
  // where const x = fleetPosition % width
  // move down 1 row
  // move left until x > 0
  // move down 1 row
  // repeat
  // 
}

// * Bombing

function enemyShotMoves() { 
  // const intervalId = setInterval(() => {
  //   removeEnemyShot()
  //   enemyShotArray = enemyShotArray.map(shot => {
  //     if (shot === playerPosition) {
  //       clearInterval(intervalId)
  //     } else if (shot > 99) {
  //       enemyShotArray.pop(enemyShotArray[enemyShotArray.length - (enemyShotArray.length - 1)])
  //     } else
  //       return shot + 10
  //   })
  //   })
  //   if (enemyShotArray[enemyShotArray.length - 1] === playerPosition) {
  //     clearInterval(intervalId)
  //   } else if (enemyShotArray[enemyArray.length - 1] > 99) {
  //     enemyShotArray.pop(enemyShotArray[enemyShotArray.length - (enemyShotArray.length - 1)])
  //   }  
  //   addEnemyShot()
  // }, 1000)
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
function playerFire (e) {
  if (e.keyCode === 88) {
    console.log('player shooting')
  }
  
  // setInterval(()=> {
  //   keyCode event 'keyup' for x
  //   move up from playerPosition until:
  //     hit a fighter
  //     reach top row
  //   remove
  // })
}

//* Dying


// ***** Events *****
startBtn.addEventListener('click', gameStart)
window.addEventListener('keyup', movePlayer)
window.addEventListener('keyup', playerFire)

