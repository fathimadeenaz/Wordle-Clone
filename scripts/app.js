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

        // colorTile(guessRows[currentRow])
        colorTile1(guessRows[currentRow])

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



const getTile = (tilePosition) => { return '#guessRow-' + currentRow + '-tile-' + tilePosition }
/*
const present = (guessWord) => {

    const temp = []
    for (let i = 0; i < guessWord.length ; i++) {
        console.log(guessWord[i]);
        if(wordle.indexOf(guessWord[i]) != -1) temp.push(i)
    }
    return temp;
}

const absent = (guessWord) => {

    const temp = []
    for (let i = 0; i < guessWord.length ; i++) {
        console.log(guessWord[i]);
        if(wordle.indexOf(guessWord[i]) == -1) temp.push(i)
    }
    return temp;
}

const colorTile = (guessRow) => {
    const guessWord = guessRow.toString().replaceAll(',','')

    // for(let i = 0; i < 5; i++){
    //     document.querySelector(getTile(i)).classList.add('absent')
    // }

    notInWord = absent(guessWord)
    notInWord.forEach(element => {
            document.querySelector(getTile(element)).classList.add('absent')
            // document.querySelector(getTile(element)).classList.remove('absent')
    });

    // inWord = present(guessWord)
    // // console.log(inWord);
    // inWord.forEach(element => {
    //     document.querySelector(getTile(element)).classList.add('present')
    //     document.querySelector(getTile(element)).classList.remove('absent')
    // });
    
    for(let i = 0; i < 5; i++) {
        const rowTile = document.querySelector(getTile(i))
        if(guessRow[i] === [...wordle][i]) {
            // rowTile.classList.remove('present')
            rowTile.classList.add('correct')
        }
    }    
}

*/



const colorTile1 = (guessRow) => {

    gre=[]
    yel=[]
    not=[]

    GA = guessRow
    WA = [...wordle]

    for(let k = 0; k < 5; k++) {
        if(WA[k] === GA[k]) {
            gre.push(k)
            WA[k] = 1
            GA[k] = 1
        }
    }

    // console.log(WA);
    // console.log(GA);

    for(let i = 0; i < 5; i++) {
        // console.log(GA[i])
        if(GA[i] === 1) {
            // console.log('skipping');
            continue;
        }

        // else{

        if(WA.join('').includes(GA[i])) {
            yel.push(i)
            WA[WA.indexOf(GA[i])] = '1'
            // console.log(y)
        }

        else not.push(i)
    }
    // }

    // console.log(gre)
    // console.log(yel)
    // console.log(not)

    for(let n = 0; n < not.length; n++) {
        // console.log(getTile(not[n]))
        document.querySelector(getTile(not[n])).classList.add('absent')
    }

    for(let y = 0; y < yel.length; y++) {
        // console.log(getTile(yel[y]))
        document.querySelector(getTile(yel[y])).classList.add('present')
    }

    

    for(let g = 0; g < gre.length; g++) {
        // console.log(getTile(gre[g]))
        document.querySelector(getTile(gre[g])).classList.add('correct')
    }
}