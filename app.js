const tileDisplay = document.querySelector('.tile-container');
const keyboard = document.querySelector('.key-container');
const messageDisplay = document.querySelector('.message-container');
let buttonEasy = document.getElementById('lvl-btn-easy');
let buttonMedium = document.getElementById('lvl-btn-med');
let buttonHard = document.getElementById('lvl-btn-hard');
let buttonTournament = document.getElementById('lvl-btn-tournament');
let lvlButtonClass = document.querySelector('.lvl-buttons');
let tournamentIcon = document.querySelector('.tournament-icon');
let rowTile = [];
let guessRows = [];
let successfulGame = false;
let isGameOver = false;

getNumericle = () => {
    return Math.floor(Math.random() * 99999999).toString();
};

hideButtons = () => {
    buttonEasy.style.display = "none";
    buttonMedium.style.display = "none";
    buttonHard.style.display = "none";
    buttonTournament.style.display = "none";
    lvlButtonClass.style.display = "none";
    tournamentIcon.style.display = "none";

};
calculateScore = (rows) => {
    return (100 - rows * 10);
};

startLevel = (digits, rows) => {
    hideButtons();
    let numericle = (getNumericle()).substring(0, digits) + ''; //123456789
    console.log(numericle);
    const keys = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'ENTER',
        '<<'
    ];

    for (let i = 0; i < digits; i++) {
        rowTile.push('');
    }
    for (let i = 0; i < rows; i++) {
        guessRows.push(rowTile);
    }
    let currentRow = 0;
    let currentTile = 0;


    guessRows.forEach((guessRow, guessRowIndex) => {
        const rowElement = document.createElement('div');
        rowElement.setAttribute('id', 'guessRow-' + guessRowIndex);
        guessRow.forEach((_guess, guessIndex) => { //guess imp comment
            const tileElement = document.createElement('div')
            tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex);
            tileElement.classList.add('tile');
            rowElement.append(tileElement);
        });
        tileDisplay.append(rowElement);
    });

    keys.forEach(key => {
        const buttonElement = document.createElement('button');
        buttonElement.textContent = key;
        buttonElement.setAttribute('id', key);
        keyboard.append(buttonElement);
        buttonElement.addEventListener('click', () => handleClick(key));

    });




    const addLetter = (letter) => {
        if (currentTile < digits && currentRow <= rows) {
            const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
            tile.textContent = letter;
            guessRows[currentRow][currentTile] = letter;
            tile.setAttribute('data', letter);
            currentTile++;
        }
    };

    const deleteLetter = () => {
        if (currentTile > 0) {
            currentTile--;
            const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
            tile.textContent = '';
            guessRows[currentRow][currentTile] = '';
            tile.setAttribute('data', '');
        }
    };

    const checkRow = () => {
        const guess = guessRows[currentRow].join('');
        if (currentTile >= (digits - 1)) {
            flipTile();
            if (numericle == guess) {
                showMessage('Magnificent! You solved in ' + (currentRow + 1) + ' tries!');
                isGameOver = true;
                successfulGame = true;
                return;
            } else {
                if (currentRow >= (rows - 1)) {
                    isGameOver = true;
                    showMessage('Game Over. You were close!! The answer was:' + numericle);
                    return
                }
                if (currentRow < (rows - 1)) {
                    currentRow++;
                    currentTile = 0;
                }
            }
        }
    };


    const showMessage = (message) => {
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageDisplay.append(messageElement);
        setTimeout(() => messageDisplay.removeChild(messageElement), 3000);
    };

    const addColorToKey = (keyLetter, color) => {
        const key = document.getElementById(keyLetter);
        key.classList.add(color);
    };

    const flipTile = () => {
        const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes;
        let checknumericle = numericle;
        const guess = [];

        rowTiles.forEach(tile => {
            guess.push({ letter: tile.getAttribute('data'), color: 'grey-overlay' })
        });
        guess.forEach((guess, index) => {
            if (guess.letter == numericle[index]) {
                guess.color = 'green-overlay';
                checknumericle = checknumericle.replace(guess.letter, '');
            }
        })
        guess.forEach((guess, index) => {
            if (checknumericle.includes(guess.letter) && guess.letter != numericle[index]) {
                guess.color = 'yellow-overlay';
                checknumericle = checknumericle.replace(guess.letter, '');
            }
        })

        rowTiles.forEach((tile, index) => {
            setTimeout(() => {
                tile.classList.add('flip')
                tile.classList.add(guess[index].color)
                addColorToKey(guess[index].letter, guess[index].color)
            }, 500 * index)
        })
    }
    const handleClick = (letter) => {
        if (!isGameOver) {
            if (letter === '<<') {
                deleteLetter();
                return;
            }
            if (letter === 'ENTER') {
                if (currentTile >= digits)
                    checkRow();
                return
            }
            addLetter(letter);
        }
    };
};

//beginning of solo levels
startEasyLevel = () => {
    startLevel(6, 7);
}
startMediumLevel = () => {
    startLevel(7, 7);
}
startHardLevel = () => {
    startLevel(8, 7);
}



const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}