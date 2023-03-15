let board = document.querySelector('.board')
let indicator = false 

// Create Board's Empty Boxes Into The Board
createBoxes()
function createBoxes(){
    let boxesCount = 9
    
    for(let i =0; i<boxesCount; i++) {
        let div = document.createElement('div')
        div.classList.add('square')
        div.setAttribute('id',`${i + 1}`)
        board.append(div)
    }
}

// Sounds
let circleSound = new Audio('sounds/circle.mp3')
let crossSound = new Audio('sounds/cross.mp3')


// Getting Players Names
const form = document.querySelector('.players')

form.addEventListener('submit', startTheGame)
let playerOneV
let playerTwoV
function startTheGame(e){

    let playerOne = document.querySelector('.one')
    let playerTwo = document.querySelector('.two')
    let info = document.querySelector('.info')
    playerOneV= playerOne.value
    playerTwoV= playerTwo.value
    let playerOneValue = `It's ${playerOne.value[0].toUpperCase()}${playerOne.value.slice(1)}'s turn (Circle) `
    let playerTwoValue = `It's ${playerTwo.value[0].toUpperCase()}${playerTwo.value.slice(1)}'s turn (Cross) `
    let playerOneWon = `${playerOne.value[0].toUpperCase()}${playerOne.value.slice[1]} Wins`
    // Declare Which Player To Start
    info.textContent = playerOneValue
    this.remove()
    e.preventDefault()

    // Getting Board Squares
    let squares = document.querySelectorAll('.square')

    squares.forEach(function (square) {
        square.addEventListener('click', addShape)
        
        function addShape(e){
            if(!indicator) {
                info.textContent = playerTwoValue
                indicator = true

                // Create Div For First Player (Circle)
                let div = document.createElement('div')
                div.classList.add('circle')
                e.target.append(div)

                soundTiming(circleSound,0,0.4)

                // Prevent Adding More Shapes
                e.target.removeEventListener('click', addShape)
            } else {
                info.textContent = playerOneValue
                indicator = false

                // Create Div For Second Player (Cross)
                let div = document.createElement('div')
                div.classList.add('cross')
                e.target.append(div)
                soundTiming(crossSound,0.1,0.5)
                // Prevent Adding More Shapes
                e.target.removeEventListener('click', addShape)
            }

            indicateWinner()
            // Indicating The Winner
            function indicateWinner (e) {
                const allSquares = document.querySelectorAll('.square')
                
                const winningCombos = [
                    [0,1,2], [3,4,5], [6,7,8],
                    [0,3,6], [1,4,7], [2,5,8],
                    [0,4,8], [2,4,6]
                ]

                // Checking Combos Children Elements
                winningCombos.forEach(array => {
                    const circleWins = array.every(cell => 
                        allSquares[cell].firstChild?.classList.contains('circle'))
                    const crossWins = array.every(cell => 
                        allSquares[cell].firstChild?.classList.contains('cross'))

                        // Announcing The Winner (Condition)
                        if (circleWins) {
                            info.textContent = `The Winner Is ${playerOneV[0].toUpperCase()}${playerOneV.slice(1)}`
                            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
                            return
                        } 

                        if (crossWins){
                            info.textContent = `The Winner Is ${playerTwoV[0].toUpperCase()}${playerTwoV.slice(1)}`
                            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
                            return
                        }
                })
            }
        }
    })
}




// Customized Function
function soundTiming(sound,startTime,endTime,){
    sound.currentTime = startTime
    sound.play()
    let theInt = setInterval(function () {
        if (sound.currentTime > endTime ) {
            sound.pause()
            console.log(sound.currentTime)
            clearInterval(theInt)
        }
    },10)
}

















































function check(e) {
    console.log(e)
}