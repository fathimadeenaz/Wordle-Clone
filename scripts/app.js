const boardDisplay = document.querySelector('#board-container')
const keys = document.querySelectorAll(".keyboard-row button");

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
    console.log(key);
    if(key.keyCode == 9){
        return false;
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
        tile.style.borderColor = '#878a8c'
        guessRows[currentRow][currentTile] = letter.toUpperCase()
        currentTile++
    }
}

const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        tile.style.borderColor = ''
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
        document.querySelector(`#${letter}`).style.color = 'rgb(255,255,255)'
        // console.log(window.getComputedStyle(document.querySelector(`#${letter}`)).color);
    }
}



const animate = gsap.timeline({ paused: true });
const animateBackground = new TimelineMax({ paused: true });
let toggle = true;

animateBackground
    .to("body", 0.1, { backgroundColor: "#000" }, 0.2)
    .to("h1", 0.1, { color: "#FFF" }, 0.2)
    .to("path", 0.1, { fill: "#FFF" }, 0.2)
    .to("#title-container", 0.1, { borderColor: "#3A3A3C" }, 0.2)
    .to("button", 0.1, { backgroundColor: "#818384", color: "#FFF" }, 0.2)
    .to(".tile", 0.1, { /*borderColor: "#3A3A3C",*/ color: "#FFF" }, 0.2)
    // .to(".correct", 0.1, { backgroundColor: "#538D4E", color: "#FFF", borderColor: "#538D4E" }, 0.2)
    // .to(".present", 0.1, { backgroundColor: "#B59F3B", color: "#FFF", borderColor: "#B59F3B" }, 0.2)
    // .to(".absent", 0.1, { backgroundColor: "#3A3A3C", color: "#FFF", borderColor: "#3A3A3C" }, 0.2)
    


animate
    .to(".toggle-button", 0.2, { scale: 0.7 }, 0)
    .set(".toggle", { backgroundColor: "#FFF" })
    .set(".circle", { display: "none" })
    .set(".switch", { backgroundColor: "#565758" })
    .to(".moon-mask", 0.2, { translateY: 32, translateX: -21 }, 0.2)
    .to(".toggle-button", 0.2, { translateX: 18  }, 0.2)
    .to(".toggle-button", 0.2, { scale: 1 })

document.getElementsByClassName("switch")[0].addEventListener("click", () => {
    if(toggle){
        console.log('in dark mode');
        animate.restart();
        animateBackground.restart();
    } else {
        animate.reverse();
        animateBackground.reverse();
    }
    toggle = !toggle;
});