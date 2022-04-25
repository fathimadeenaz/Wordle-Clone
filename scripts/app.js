const tileDisplay = document.querySelector('#board-container')
const keys = document.querySelectorAll(".keyboard-row button");

// console.log(tileDisplay)


const wordle = "OLIVE"


let currentRow = 0
let currentTile = 0
let isGameOver = false


const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]

guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    guessRow.forEach((_guess, guessIndex) => {
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        tileElement.classList.add('tile')
        rowElement.append(tileElement)
    })
    tileDisplay.append(rowElement)
})

keys.forEach(key => {
    key.addEventListener('click', () => handleClick(key.innerHTML))
})

window.addEventListener('keydown', (e) => handleKeyDown(e.key))


const handleClick = (letter) => {
    if (!isGameOver) {
        if (letter === '⌫') {
            deleteLetter()
            return
        }
        else if (letter === 'Enter') {
            checkRow()
            return
        }
        else addLetter(letter)
    }
}

const handleKeyDown = (e) => {
    // console.log(e)
    if (!isGameOver) {
        if (e === 'Backspace') {
            deleteLetter()
            return
        }
        else if (e === 'Enter') {
            checkRow()
            return
        }
        else if (e >= 'a' && e <= 'z') addLetter(e)
    }
}

const addLetter = (letter) => {
    // console.log(letter.innerHTML)
    if (currentTile < 5 && currentRow < 6) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter.toUpperCase()
        tile.setAttribute('data', letter)
        currentTile++
    }
}

const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('').toUpperCase()
    if (currentTile > 4) {

        // console.log(`guess is ${guess} \n wordle is ${wordle}`)
        // console.log(guessRows[currentRow])

        colorTile(guessRows[currentRow])
        colorKey()

        if (wordle == guess) {
            console.log('you\'ve guessed the wordle!')
            isGameOver = true
            return
        } else {
            if (currentRow >= 5) {
                isGameOver = true
                console.log('game over \nthe wordle was',wordle)
                return
            }
            if (currentRow < 5) {
                currentRow++
                currentTile = 0
                console.log('try having another guess')
            }
        }
    }
}

function addClass(arr, className) {
    for(let i = 0; i < arr.length; i++) {
        // console.log(getTile(arr[i]))
        document.querySelector(getTile(arr[i])).classList.add(className)
    }
}

const getTile = (tilePosition) => { return '#guessRow-' + currentRow + '-tile-' + tilePosition }

const colorTile = (guessRow) => {

    green = []
    yellow = []
    grey = []

    guessRowArray = guessRow
    wordleArray = [...wordle]

    for(let i = 0; i < 5; i++) {
        if(wordleArray[i] === guessRowArray[i]) {
            green.push(i)
            wordleArray[i] = 1
            guessRowArray[i] = 1
        }
    }

    // console.log(wordleArray);
    // console.log(guessRowArray);

    for(let i = 0; i < 5; i++) {
        // console.log(guessRowArray[i])
        if(guessRowArray[i] === 1) {
            // console.log('skipping');
            continue;
        }

        if(wordleArray.join('').includes(guessRowArray[i])) {
            yellow.push(i)
            wordleArray[wordleArray.indexOf(guessRowArray[i])] = '1'
            // console.log(y)
        }

        else grey.push(i)
    }

    // console.log(green)
    // console.log(yellow)
    // console.log(grey)

    addClass(grey, 'absent')
    addClass(yellow, 'present')
    addClass(green, 'correct')
}

const colorKey = () => {
    for(let i = 0; i < 5; i++) {
        
        const green = 'rgb(106, 170, 100)'
        const yellow = 'rgb(201, 180, 88)'
        const grey = 'rgb(120, 124, 126)'


        let colorClass = document.querySelector(getTile(i)).className.slice(5)
        let letter = document.querySelector(getTile(i)).textContent
        // console.log(colorClass)
        // console.log(letter)

        let newColor = colorClass === 'present' ? yellow : (colorClass === 'correct' ? green : grey)
        // console.log(newColor)

        // let oldColor = document.querySelector(`#${letter}`).style.backgroundColor
        let oldColor = window.getComputedStyle(document.querySelector(`#${letter}`)).backgroundColor
        // console.log(`oldColor ${oldColor}`)


        if (oldColor === green) {
            newColor = oldColor
        } 

        if (oldColor === yellow) {
            if(newColor === green) newColor = green
            else newColor = oldColor
        }

        if (oldColor === grey) {
            if(newColor === green) newColor = green
            else if(newColor === yellow) newColor = yellow
            else newColor = oldColor
        }

        // console.log(`newColor ${newColor}`)
        document.querySelector(`#${letter}`).style.backgroundColor = newColor
    }
}