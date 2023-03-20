let board = document.querySelector('.board')
let playerOneV
let playerTwoV
let replayBtn = document.querySelector('.replay')
let indicator = false 

let circleWinCounts = 0
let crossWinCounts = 0
// Sound Effects
let circleSound = new Audio('sounds/circle.mp3')
let crossSound = new Audio('sounds/cross.mp3')

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



// Prevent Any Actions Unless Submit Attempted
const form = document.querySelector('.players')

form.addEventListener('submit', startTheGame)



function startTheGame(e){

    let playerOne = document.querySelector('.one')
    let playerTwo = document.querySelector('.two')
    let info = document.querySelector('.info')

    // Wins Count Elements
    let winsCountOne = document.querySelector('.player-one')
    let winsCountTwo = document.querySelector('.player-two')

    // Wins Counting Div
    let playerOneName = document.querySelector('.player-one')
    let playerTwoName = document.querySelector('.player-two')


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

    // Saving All Clicked Squares In Array
    let clickedSquares = []

    squares.forEach(function (square) {
        square.addEventListener('click', addShape)
        
        function addShape(e){

            // Indicates Which Shape Should Be Inserted (X or O)
            if(!indicator) {
                info.textContent = playerTwoValue
                
                // Create Div For First Player (Circle)
                let div = document.createElement('div')
                div.classList.add('circle')
                div.classList.add('pop')
                e.target.append(div)
                
                soundTiming(circleSound,0,0.4)
                indicator = true
                console.log(indicator)
                // Prevent Adding More Shapes
                e.target.removeEventListener('click', addShape)
            } else {
                info.textContent = playerOneValue
                
                // Create Div For Second Player (Cross)
                let div = document.createElement('div')
                div.classList.add('cross')
                // Assigning The Pop Animation
                div.classList.add('pop')
                e.target.append(div)
                soundTiming(crossSound,0.1,0.5)
                indicator = false
                // Prevent Adding More Shapes
                e.target.removeEventListener('click', addShape)

            }
            
            clickedSquares.push(e.target)
            console.log(e.target)

            indicateWinner()
            // Indicating The Winner
            function indicateWinner (e) {
                const allSquares = document.querySelectorAll('.square')
                
                const winningCombos = [
                    [0,1,2], [3,4,5], [6,7,8],
                    [0,3,6], [1,4,7], [2,5,8],
                    [0,4,8], [2,4,6]
                ]

                const allSquaresCheck = [0,1,2,3,4,5,6,7,8]

                // Checking Combos Children Elements
                winningCombos.forEach(array => {
                    
                    array.every(cell => allSquares[cell].firstChild)
                    
                    const circleWins = array.every(cell => 
                        allSquares[cell].firstChild?.classList.contains('circle'))

                    const crossWins = array.every(cell => 
                        allSquares[cell].firstChild?.classList.contains('cross'))
                        // Announcing The Winner (Condition)
                        let leftCrossArray = [0,4,8]
                        let rightCrossArray = [2,4,6]
                        let horizontalCrossArray = [[0,1,2], [3,4,5], [6,7,8]]
                        let verticalCrossArray = [[0,3,6], [1,4,7], [2,5,8]]

                        if (circleWins) {
                            info.textContent = `The Winner Is ${playerOneV[0].toUpperCase()}${playerOneV.slice(1)}`
                            allSquares.forEach(function (square) {
                                // Draw A line Over Winning Squares
                                getCorrectSquares(array,leftCrossArray,squares,'left-cross')
                                getCorrectSquares(array,rightCrossArray,squares,'right-cross')

                                getCorrectSquares(array,horizontalCrossArray[0],squares,'horizontal')
                                getCorrectSquares(array,horizontalCrossArray[1],squares,'horizontal')
                                getCorrectSquares(array,horizontalCrossArray[2],squares,'horizontal')

                                getCorrectSquares(array,verticalCrossArray[0],squares,'vertical')
                                getCorrectSquares(array,verticalCrossArray[1],squares,'vertical')
                                getCorrectSquares(array,verticalCrossArray[2],squares,'vertical')
                                
                                // Prevent Squares From Input Using CloneNode Trick
                                // square.replaceWith(square.cloneNode(true))
                            } )
                            
                        } else if (crossWins){
                            info.textContent = `The Winner Is ${playerTwoV[0].toUpperCase()}${playerTwoV.slice(1)}`
                            allSquares.forEach( function () {
                                
                                getCorrectSquares(array,leftCrossArray,squares,'left-cross')
                                getCorrectSquares(array,rightCrossArray,squares,'right-cross')

                                getCorrectSquares(array,horizontalCrossArray[0],squares,'horizontal')
                                getCorrectSquares(array,horizontalCrossArray[1],squares,'horizontal')
                                getCorrectSquares(array,horizontalCrossArray[2],squares,'horizontal')

                                getCorrectSquares(array,verticalCrossArray[0],squares,'vertical')
                                getCorrectSquares(array,verticalCrossArray[1],squares,'vertical')
                                getCorrectSquares(array,verticalCrossArray[2],squares,'vertical')
                                // square.replaceWith(square.cloneNode(true))
                            } )
                            
                        } 

                        // Replay Option
                        if (crossWins || circleWins) {
                        if (circleWins) {
                            circleWinCounts++
                            winsCountOne.textContent = `${playerOneV[0].toUpperCase()}${playerOneV.slice(1)}'s  Score: ${circleWinCounts}`
                            if (crossWinCounts === 0){
                                winsCountTwo.textContent = `${playerTwoV[0].toUpperCase()}${playerTwoV.slice(1)}'s  Score: 0`
                            }
                            
                        } else if (crossWins){
                            crossWinCounts++
                            winsCountTwo.textContent = `${playerTwoV[0].toUpperCase()}${playerTwoV.slice(1)}'s  Score: ${crossWinCounts}`
                            if (circleWinCounts === 0 ) {
                                winsCountOne.textContent = `${playerOneV[0].toUpperCase()}${playerOneV.slice(1)}'s  Score: 0`
                            }
                        }
                            // Making Squares Clickable Again
                            let unClickable = document.querySelector('.un-clickable')
                            unClickable.classList.remove('d-none')
                            replayBtn.classList.remove('d-none')

                            // Attempting A Replay
                            replayBtn.addEventListener('click', replayGame)
                        }

                        // Check If It Is A Tie
                        let squaresTieCount = 0
                        allSquares.forEach(square => {
                            if (square.firstChild?.classList.contains('cross') === true || square.firstChild?.classList.contains('circle')) {
                                squaresTieCount++
                            }

                            if (!crossWins && !circleWins && squaresTieCount === 9) {
                                info.textContent = `It's a Tie`
                                // Replay Button
                                replayBtn.classList.remove('d-none')

                                replayBtn.addEventListener('click', function replayGame(e){
    
                                    allSquares.forEach(square => {
                                        e.target.classList.add('d-none')
                                        info.textContent = playerOneValue
                                        square.innerHTML = ''
                                        
                                        // Make Squares Listens To Clicks Again
                                        square.addEventListener('click', addShape)
                                        indicator = false
                                    })
                                
                                })
                            }

                        })

                })
            }

        }

        function replayGame() {
            let unclickable = document.querySelector('.un-clickable')
            unclickable.classList.add('d-none')
            // Remove all shapes from the squares
            let squares = document.querySelectorAll('.square')
            squares.forEach(square => {
                
            square.classList.remove('right-cross', 'left-cross', 'vertical', 'horizontal')
            })
            
            
            clickedSquares.forEach(clicked => {
                clicked.removeChild(clicked.firstChild)
                clicked.addEventListener('click', addShape)
            })

            indicator = false
            
            // Re-attach event listeners to each square
        
            // Reset game information
            let playerOneValue = `It's ${playerOneV[0].toUpperCase()}${playerOneV.slice(1)}'s turn (Circle) `
            info.textContent = playerOneValue
            this.classList.add('d-none')
            clickedSquares = []
        }
    })
}


// Customized Functions 

// 1- Control Sound Playing
function soundTiming(sound,startTime,endTime,){
    sound.currentTime = startTime
    sound.play()
    let theInt = setInterval(function () {
        if (sound.currentTime > endTime ) {
            sound.pause()
            clearInterval(theInt)
        }
    },10)
}



// 2- Get Correct  Arrays
function getCorrectSquares(array,desiredArray,squares,positionClassName) {

    if (array.join('') === desiredArray.join('')) {
        for (let i =0; i<3;i++){
            squares[array[i]].classList.add(`${positionClassName}`)
        }
    }
}
