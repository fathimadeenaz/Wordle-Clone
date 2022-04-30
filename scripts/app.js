const boardDisplay = document.querySelector('#board-container')
const keys = document.querySelectorAll('.keyboard-row button')
const messageDisplay = document.getElementById('message-container')

// console.log(boardDisplay)


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
        // tile.style.borderColor = '#878a8c'
        tile.classList.add('tile-active')
        guessRows[currentRow][currentTile] = letter.toUpperCase()
        currentTile++
    }
}

const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        // tile.style.borderColor = ''
        tile.classList.remove('tile-active')
        guessRows[currentRow][currentTile] = ''
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
    // messageDisplay.style.display = 'block'
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageDisplay.append(messageElement)
    if(!isGameOver) setTimeout(() => messageDisplay.removeChild(messageElement), 1500)
}

const addClass = (arr, className) => {
    for(let i = 0; i < arr.length; i++) {
        // console.log(getTile(arr[i]))
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

        console.log(toggle);
        
        const green = toggle ? 'rgb(106, 170, 100)' : 'rgb(83, 141, 78)'
        const yellow = toggle ? 'rgb(201, 180, 88)' : 'rgb(181, 159, 59)'
        const grey = toggle ? 'rgb(120, 124, 126)' : 'rgb(58, 58, 60)'


        let colorClass = document.querySelector(getTile(i)).className.slice(17)
        let letter = document.querySelector(getTile(i)).textContent
        let key = document.querySelector(`#${letter}`)

        // console.log(colorClass)
        // console.log(letter)

        // let newColor = colorClass === 'present' ? yellow : (colorClass === 'correct' ? green : grey)
        // console.log(newColor)

        // let oldColor = document.querySelector(`#${letter}`).style.backgroundColor
        // let oldColor = window.getComputedStyle(document.querySelector(`#${letter}`)).backgroundColor
        // console.log(`oldColor ${oldColor}`)


        if (colorClass === 'correct') {
            key.classList.add('correct-key')
        } 

        if (colorClass === 'present') {
            if (key.classList.contains('correct-key')) {}
            else key.classList.add('present-key')
        }

        if (colorClass === 'absent') {
            if (key.classList.contains('correct-key')) {}
            else if (key.classList.contains('present-key')) {}
            else key.classList.add('absent-key')
        }

        // console.log(`newColor ${newColor}`)
        // document.querySelector(`#${letter}`).style.backgroundColor = newColor
        // document.querySelector(`#${letter}`).style.color = 'rgb(255,255,255)'
        // console.log(window.getComputedStyle(document.querySelector(`#${letter}`)).color);
    }
}



const animate = gsap.timeline({ paused: true });
const animateBackground = new TimelineMax({ paused: true });
let toggle = true;

// animateBackground
    // .to("body", 0.1, { backgroundColor: "#000" }, 0)
    // .to("h1", 0.1, { color: "#FFF" }, 0)
    // .to("path", 0.1, { fill: "#FFF" }, 0)
    // .to("#title-container", 0.1, { borderColor: "#3A3A3C" }, 0)
    // .to("button", 0.1, { color: "#FFF" }, 0)
    // .to(".tile", 0.1, { borderColor: "#3A3A3C", color: "#FFF" }, 0)

    // .set(".correct", { backgroundColor: "#538D4E", color: "#FFF", borderColor: "#538D4E" })
    // .set(".present", { backgroundColor: "#B59F3B", color: "#FFF", borderColor: "#B59F3B" })
    // .set(".absent", { backgroundColor: "#3A3A3C", color: "#FFF", borderColor: "#3A3A3C" })
    


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


// document.querySelector('.container').addEventListener('click', () => {
//     document.querySelector('body').classList.toggle('dark-theme')
// })