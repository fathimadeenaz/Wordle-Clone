const boardDisplay = document.querySelector('#board-container')
const keys = document.querySelectorAll('.keyboard-row button')
const messageDisplay = document.getElementById('message-container')


const wordle = "HEIST"


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
    boardDisplay.append(rowElement)
})

keys.forEach(key => {
    key.addEventListener('click', () => handleClick(key.innerHTML))
})

window.addEventListener('keyup', (e) => handleKeyUp(e.key))

window.addEventListener('keypress', (e) => handleKeyPress(e.key))

const handleKeyPress = (key) => {
    // console.log(key);
    if(key.keyCode == 9){
        key.preventDefault()
    }
}


const handleClick = (letter) => {
    if (!isGameOver) {
        if (letter >= 'a' && letter <= 'z') addLetter(letter)
        
        else if (letter === 'Enter') {
            checkRow()
            return
        }
        else {
            deleteLetter()
            return
        }
    }
}

const handleKeyUp = (letter) => {
    if (!isGameOver) {
        if (letter === 'Backspace') {
            deleteLetter()
            return
        }
        else if (letter === 'Enter') {
            checkRow()
            return
        }
        else if (letter.length == 1) {
            if ((letter >= 'a' && letter <= 'z') || (letter >= 'A' && letter <= 'Z')) addLetter(letter)
        }
    }
}

const addLetter = (letter) => {
    // console.log(letter.innerHTML)
    if (currentTile < 5 && currentRow < 6) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        tile.classList.add('tile-active')
        tile.classList.add('animate__bounceIn')
        tile.style.setProperty('--animate-duration', '0.3s');
        guessRows[currentRow][currentTile] = letter.toUpperCase()
        currentTile++
    }
}

const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        tile.classList.remove('tile-active')
        tile.classList.remove('animate__bounceIn')
        guessRows[currentRow][currentTile] = ''
    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('').toUpperCase()
    if (currentTile > 4) {

        colorTile(guessRows[currentRow])


        setTimeout(colorKey,1202)

        // setTimeout(colorKey,1203)
        // colorKey()

        if (wordle == guess) {
            isGameOver = true
            showMessage('Superb')
            // console.log('you\'ve guessed the wordle!')
            return
        } else {
            if (currentRow >= 5) {
                isGameOver = true
                showMessage(wordle)
                // console.log('game over \nthe wordle was',wordle)
                return
            }
            if (currentRow < 5) {
                currentRow++
                currentTile = 0
                showMessage('Try Again')
                // console.log('try having another guess')
            }
        }
    }
}

const showMessage = (message) => {
    messageDisplay.style.visibility = 'visible'
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    setTimeout(() => messageDisplay.append(messageElement), 1700)
    if(!isGameOver) setTimeout(() => messageDisplay.removeChild(messageElement), 3000)
}


const addClass = (arr, className) => {
    for(let i = 0; i < arr.length; i++) {
        document.querySelector(getTile(arr[i])).classList.add(className)
    }
}


const getTile = (currentTile) => { return '#guessRow-' + currentRow + '-tile-' + currentTile }

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


    
    for(let i = 0; i < 5; i++) {
        k = currentRow - 1
        // console.log(getTile(i));
        setTimeout(() => {
            document.querySelector('#guessRow-' + k + '-tile-' + i).classList.add('tile-before')
        }, i)
        setTimeout(() => {
            document.querySelector('#guessRow-' + k + '-tile-' + i).classList.remove('tile-before')
            document.querySelector('#guessRow-' + k + '-tile-' + i).classList.add('flip', 'tile-after')
        }, 300*i)

        // setTimeout(colorKey,1202)
        k++ 
    }

    addClass(grey, 'absent')
    addClass(yellow, 'present')
    addClass(green, 'correct')

}


const getTile1 = (cr, currentTile) => { return '#guessRow-' + cr + '-tile-' + currentTile }


const colorKey = () => {
    
    for(let i = 0; i < 5; i++) {
        
        cr = currentRow-1

        let colorClass = document.querySelector(getTile1(cr, i)).className.slice(-23, -16)

        classList = document.querySelector(getTile1(cr, i)).classList
        let letter = document.querySelector(getTile1(cr, i)).textContent


        let key = document.querySelector(`#${letter}`)

        // console.log(colorClass)

        if (colorClass === 'present') {
            if (key.classList.contains('correct-key')) {}
            else key.classList.add('present-key')
        }

        else if (colorClass === ' absent') {
            if (key.classList.contains('correct-key')) {}
            else if (key.classList.contains('present-key')) {}
            else key.classList.add('absent-key')
        }

        else {
            if (key.classList.contains('present-key')) key.classList.remove('present-key')
            key.classList.add('correct-key')
        } 

        cr--
    }
}



const animate = gsap.timeline({ paused: true });
const animateBackground = new TimelineMax({ paused: true });
let toggle = true;

animate
    .to(".toggle-button", 0.2, { scale: 0.7 }, 0)
    .set(".toggle", { backgroundColor: "#FFF" })
    .set(".circle", { display: "none" })
    .set(".switch", { backgroundColor: "#565758" })
    .to(".moon-mask", 0.2, { translateY: 32, translateX: -21 }, 0.2)
    .to(".toggle-button", 0.2, { translateX: 18  }, 0.2)
    .to(".toggle-button", 0.2, { scale: 1 })

document.getElementsByClassName("switch")[0].addEventListener("click", () => {

    document.querySelector('body').classList.toggle('dark-theme')

    if(toggle){
        // console.log('in dark mode');
        animate.restart();
        animateBackground.restart();
    } else {
        animate.reverse();
        animateBackground.reverse();
    }
    toggle = !toggle;
});