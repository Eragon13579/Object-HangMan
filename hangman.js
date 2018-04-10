var inquirer = require('inquirer')
var isLetter = require('is-letter')

var Word = require('./word.js')
var newWord = {
    wordList: ['OZZY', 'POISON', 'METALLICA', 'JOURNEY'],
    hangman: ["\n\n\n\n\n\n\n-------------", "\n |\n |\n |\n |\n |\n |\n |\n-------------", "____________\n |         |\n |\n |\n |\n |\n |\n-------------", "____________\n |         |\n |         O\n |\n |\n |\n |\n |\n-------------", "____________\n |         |\n |         O\n |         |\n |         |\n |\n |\n |\n-------------", "____________\n |         |\n |         O\n |         |\n |         |\n |        ---\n |\n |\n-------------", "____________\n |         |\n |         O\n |       __|\n |         |\n |        ---\n |\n |\n-------------", "____________\n |         |\n |         O\n |       __|__\n |         |\n |        ---\n |\n |\n-------------", "____________\n |         |\n |         O\n |       __|__\n |         |\n |        ---\n |        |\n |\n-------------", "____________\n |         |\n |         O\n |       __|__\n |         |\n |        ---\n |        | |\n |\n-------------"]
}

var hangManDisplay = newWord.hangman
var wordBank = newWord.wordList
var guessesLeft = 10
var lettersPicked = []
var display = 0
var currentWord

beginGame()

function beginGame() {
    console.log("Welcome to 80's RockHangman!")
    if (lettersPicked.length > 0) {
        lettersPicked = []
    }

    inquirer.prompt([
        {
            name: 'play',
            type: 'confirm',
            message: 'Ready to play?'
        }
    ]).then(function (answer) {
        if (answer.play) {
            console.log('You get 10 guesses to guess the right NHL team name.')
            newGame()
        } else {
            console.log('Maybe next time!')
        }
    })
}

function newGame() {
    if (guessesLeft === 10) {
        var randNum = Math.floor(Math.random() * wordBank.length)
        currentWord = new Word(wordBank[randNum])
        currentWord.getLetters()
        console.log(currentWord.wordRender())
        promptUser()
    } else {
        resetGuessesLeft()
        newGame()
    }
}

function resetGuessesLeft() {
    guessesLeft = 10
}

function promptUser() {
    inquirer.prompt([
        {
            name: 'letterPicked',
            type: 'input',
            message: 'Choose a letter',
            validate: function (value) {
                if (isLetter(value)) {
                    return true
                } else {
                    return false
                }
            }
        }
    ]).then(function (ltr) {
        var letterReturned = (ltr.letterPicked).toUpperCase()
        var guessedAlready = false
        for (var i = 0; i < lettersPicked.length; i++) {
            if (letterReturned === lettersPicked[i]) {
                guessedAlready = true
            }
        }

        if (guessedAlready === false) {
            lettersPicked.push(letterReturned)

            var found = currentWord.checkIfLetterFound(letterReturned)

            if (found === 0) {
                console.log('Wrong, try again!')

                guessesLeft--
                display++

                console.log('Guesses Left: ' + guessesLeft)
                console.log(hangManDisplay[display - 1])
                console.log(currentWord.wordRender())
                console.log('Letters guessed: ' + lettersPicked)
            } else {
                console.log('Correct!')

                if (currentWord.checkWord() === true) {
                    console.log(currentWord.wordRender())
                    console.log('----- YOU WIN -----')
                    beginGame()
                } else {
                    console.log('Guesses remaining: ' + guessesLeft)
                    console.log(currentWord.wordRender())
                    console.log('Letters guessed: ' + lettersPicked)
                }
            }

            if (guessesLeft > 0 && currentWord.wordFound === false) {
                promptUser();
            } else if (guessesLeft === 0) {
                console.log('----- GAME OVER -----')
                console.log('The word you were trying to guess was: ' + currentWord.word)
            }
        } else {
            console.log('You"ve guessed that letter already, try again.')
            promptUser();
        }
    })
}
