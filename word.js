var Letter = function (ltr) {
    this.letter = ltr
    this.appear = false
    this.letterRender = function () {
        if (this.letter == ' ') {
            this.appear = true
            return '  '
        } if (this.appear === false) {
            return ' _ '
        } else {
            return this.letter
        }
    }
}

function Word(wrd) {
    this.word = wrd
    this.letters = []
    this.wordFound = false
    this.getLetters = function () {
        for (var i = 0; i < this.word.length; i++) {
            var newLetter = new Letter(this.word[i]);
            this.letters.push(newLetter);
        }
    }
    this.checkWord = function () {
        if (this.letters.every(function (lttr) {
            return lttr.appear === true;
        })) {
            this.wordFound = true;
            return true;
        }
    }
    this.checkIfLetterFound = function (guessedLetter) {
        var whatToReturn = 0
        this.letters.forEach(function (lttr) {
            if (lttr.letter === guessedLetter) {
                lttr.appear = true
                whatToReturn++
            }
        })

        return whatToReturn
    }

    this.wordRender = function () {
        var display = ''
        this.letters.forEach(function (lttr) {
            var currentLetter = lttr.letterRender()
            display += currentLetter
        })
        return display
    }
}

module.exports = Word
