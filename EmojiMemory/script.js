const game = {
    fruits: ['1.svg',
        '2.svg',
        '3.svg',
        '4.svg',
        '5.svg',
        '6.svg',
        '7.svg',
        '8.svg',
    ],
    music: ['1.svg',
        '2.svg',
        '3.svg',
        '4.svg',
        '5.svg',
        '6.svg',
        '7.svg',
        '8.svg',
    ],
    animals: ['1.svg',
        '2.svg',
        '3.svg',
        '4.svg',
        '5.svg',
        '6.svg',
        '7.svg',
        '8.svg',
    ],
    emoji: null,
    array: [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7],
    moves: 0,
    score: 0,
    canClick: true,
    canClick: true,
    gameEl: document.querySelector('.game'),
    deleteCard(card) {
        card[0].innerHTML = ''
        card[1].innerHTML = ''
        card[0].classList.remove('flip')
        card[0].classList.remove('flip')
        this.canClick = true
        this.score += 1
        this.moves += 1
        this.setScore()
    },
    resetCard(card) {
        card[0].classList.remove('flip')
        card[0].classList.remove('flip')
        this.canClick = true
        this.moves += 1
        this.setScore()
    },
    checkIfTheSame() {
        if (this.canClick) {
            let flippedCards = document.getElementsByClassName('flip')
            if (flippedCards.length === 2) {
                this.canClick = false
                if (flippedCards[0].innerHTML === flippedCards[1].innerHTML) {
                    setTimeout(() => this.deleteCard(flippedCards), 1000)

                } else {
                    setTimeout(() => this.resetCard(flippedCards), 1000)
                }


            }
        }
    },
    flip(div) {
        let flippedCards = document.getElementsByClassName('flip')
        if (flippedCards.length < 2 && !div.currentTarget.innerHTML == '') {

            div.currentTarget.classList.add('flip')

        }
        if (flippedCards.length === 2) {
            this.checkIfTheSame()
        }

    },
    makeCards() {
        for (let i = 0; i <= 15; i++) {
            let newDiv = document.createElement('div')
            newDiv.classList.add('card')
            let newFront = document.createElement('img')
            let newBack = document.createElement('img')
            newFront.classList.add('front')
            newBack.classList.add('back')
            newBack.src = '1F600.svg'
            newDiv.appendChild(newFront)
            newDiv.appendChild(newBack)
            this.gameEl.appendChild(newDiv)

            newDiv.addEventListener('click', div => this.flip(div))
        }
    },
    switchImages(i) {
        switch (this.emoji) {
            case 0:
                return `fruits/${this.fruits[this.array[i]]}`
            case 1:
                return `music/${this.music[this.array[i]]}`
            case 2:
                return `animal/${this.animals[this.array[i]]}`
        }
    },
    giveImages() {
        this.shuffle(this.array)
        let frontEl = document.querySelectorAll('.front')
        for (let i = 0; i <= this.array.length - 1; i++) {
            frontEl[i].src = this.switchImages(i)
        }
    },

    startGame() {
        this.score = 0
        this.moves = 0
        this.setScore()
        this.gameEl.innerHTML = ''
        this.makeCards()
        this.giveImages()
    },
    setScore() {
        let movesEl = document.getElementById('moves-el')
        let scoreEl = document.getElementById('score-el')
        movesEl.textContent = `Moves: ${this.moves}`
        scoreEl.textContent = `Score: ${this.score}`
        if (this.score == 8) {
            movesEl.textContent = 'YOU WIN!'
            scoreEl.textContent = `Score: ${this.score} Moves: ${this.moves}`
        }
    },
    shuffle(array) {
        let currentIndex = array.length,
            randomIndex;

        while (currentIndex != 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]
            ];
        }

        return array;
    }
}
document.querySelector('.game-container').style.display = 'none'
document.querySelector('button').addEventListener('click', function () {
    game.startGame()
})
document.getElementById('fruits').addEventListener('click', function () {
    document.querySelector('.start').style.display = 'none'
    document.querySelector('.game-container').style.display = 'flex'
    game.emoji = 0
    game.startGame()
})
document.getElementById('music').addEventListener('click', function () {
    document.querySelector('.start').style.display = 'none'
    document.querySelector('.game-container').style.display = 'flex'
    game.emoji = 1
    game.startGame()
})
document.getElementById('animals').addEventListener('click', function () {
    document.querySelector('.start').style.display = 'none'
    document.querySelector('.game-container').style.display = 'flex'
    game.emoji = 2
    game.startGame()
})
document.getElementById('back').addEventListener('click', function () {
    document.querySelector('.start').style.display = ''
    document.querySelector('.game-container').style.display = 'none'
    game.emoji = null
    game.startGame()
})