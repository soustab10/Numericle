const tileDisplay = document.querySelector('.tile-container');
const keyboard = document.querySelector('.key-container');
const messageDisplay = document.querySelector('.message-container');
let buttonEasy = document.getElementById('lvl-btn-easy');
let buttonMedium = document.getElementById('lvl-btn-med');
let buttonHard = document.getElementById('lvl-btn-hard');

//beginning of easy mode
startEasyLevel = () => {

    buttonEasy.style.display = "none";
    buttonMedium.style.display = "none";
    buttonHard.style.display = "none";
    let numericle = "";
    const getnumericle = () => {
        numericle = Math.floor(100000 + Math.random() * 900000).toString();
    }
    getnumericle();
    numericle = numericle.padStart(6, '0');
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
    const guessRows = [
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],

    ];
    let currentRow = 0;
    let currentTile = 0;
    let isGameOver = false;

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





    const handleClick = (letter) => {
        if (!isGameOver) {
            if (letter === '<<') {
                deleteLetter();
                return;
            }
            if (letter === 'ENTER') {
                if (currentTile >= 6) {
                    checkRow();
                }
                return;
            }
            addLetter(letter);
        }
    };


    const addLetter = (letter) => {
        if (currentTile < 6 && currentRow < 8) {
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
        if (currentTile >= 5) {
            flipTile();
            if (numericle == guess) {
                showMessage('Magnificent! You solved in ' + (currentRow + 1) + ' tries!');
                isGameOver = true;
                return
            } else {
                if (currentRow >= 6) {
                    isGameOver = true;
                    showMessage('Game Over. You were close!! The answer was:' + numericle);
                    return
                }
                if (currentRow < 6) {
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
}


//medium level begins

startMediumLevel = () => {
    buttonEasy.style.display = "none";
    buttonMedium.style.display = "none";
    buttonHard.style.display = "none";

    let numericle = "";
    const getnumericle = () => {
        numericle = Math.floor(1000000 + Math.random() * 9000000).toString();
    }
    getnumericle();
    numericle = numericle.padStart(7, '0');


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
    const guessRows = [
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '']
    ];
    let currentRow = 0;
    let currentTile = 0;
    let isGameOver = false;

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



    const handleClick = (letter) => {
        if (!isGameOver) {
            if (letter === '<<') {
                deleteLetter();
                return;
            }
            if (letter === 'ENTER') {
                if (currentTile >= 7) {
                    checkRow();
                }
                return;
                return;
            }
            addLetter(letter);
        }
    };


    const addLetter = (letter) => {
        if (currentTile < 7 && currentRow < 8) {
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
        if (currentTile >= 6) {
            flipTile();
            if (numericle == guess) {
                showMessage('Magnificent! You solved in ' + (currentRow + 1) + ' tries!');
                isGameOver = true;
                return
            } else {
                if (currentRow >= 6) {
                    isGameOver = true;
                    showMessage('Game Over. You were close!! The answer was:' + numericle);
                    return
                }
                if (currentRow < 6) {
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
}

//hard level starts

startHardLevel = () => {
    buttonEasy.style.display = "none";
    buttonMedium.style.display = "none";
    buttonHard.style.display = "none";

    let numericle = "";
    const getnumericle = () => {
        numericle = Math.floor(Math.random() * 99999999).toString();
    }
    getnumericle();
    numericle = numericle.padStart(8, '0');



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
    const guessRows = [
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '']

    ];
    let currentRow = 0;
    let currentTile = 0;
    let isGameOver = false;

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



    const handleClick = (letter) => {
        if (!isGameOver) {
            if (letter === '<<') {
                deleteLetter();
                return;
            }
            if (letter === 'ENTER') {
                if (currentTile >= 8) {
                    checkRow();
                }
                return;
                return;
            }
            addLetter(letter);
        }
    };


    const addLetter = (letter) => {
        if (currentTile < 8 && currentRow < 8) {
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
        if (currentTile >= 7) {
            flipTile();
            if (numericle == guess) {
                showMessage('Magnificent! You solved in ' + (currentRow + 1) + ' tries!');
                isGameOver = true;
                return
            } else {
                if (currentRow >= 6) {
                    isGameOver = true;
                    showMessage('Game Over. You were close!! The answer was:' + numericle);
                    return
                }
                if (currentRow < 7) {
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