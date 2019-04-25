/*
 * Create a list that will holds all of the cards
 */
const cardNodeLIst = document.querySelectorAll('.cards');
const cardArray = Array.from(cardNodeLIst);
const deck = document.querySelector('.deck')

const shuffleButton = document.querySelector('.restart');

let openCards = [];

const scoreBoard = document.querySelector('.moves');
let moves = 0;

const starBoard = document.querySelector('.stars');

let pair = 0;

var modal = document.querySelector('#myModal');
var span = document.querySelector(".close");

// Shuffle function from http://stackoverflow.com/a/2450976
// takes a list as an input returns the shuffled list
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// shuffle the list of cards using the provided "shuffle" method below
function shuffleCard() {
    while (deck.firstChild) {
        deck.firstChild.remove();
    }
    // stores a shuffled list of cards
    let shuffledCardList = shuffle(cardArray);

    // loop through each shuffle list of cards and append it to the deck
    var docFrag = document.createDocumentFragment();
    for (let i = 0; i < shuffledCardList.length; i++) {
        docFrag.appendChild(shuffledCardList[i]);
    }
    deck.appendChild(docFrag);
}

// reload the window
function reset() {
    location.reload(false);
}

// shuffle the card when the page gets loaded
document.addEventListener('DOMContentLoaded', shuffleCard);
// shuffle the card when reload gets clicked
shuffleButton.addEventListener('click', reset);


/*
 * Add interactivity to the card
 */


function finalScore() {
    setTimeout(function () {
        // window.alert(`Final Score is ${moves}`)
        document.querySelector('.modalMoves').textContent = moves;
        let finalStar = document.querySelector('.stars').innerHTML;
        const modalStar = document.querySelector('.modalStars');
        modalStar.innerHTML = finalStar;
        span.addEventListener('click', function () {
            modal.style.display = "none";
        })
        window.addEventListener('click', function () {
            modal.style.display = "none";
        })
        modal.style.display = "block"
    }, 400)

}

// update the stars earned based on no. of moves 
function updateStar() {
    let starChild = starBoard.querySelectorAll('.fa');
    if (moves > 35) {
        starChild[0].classList.replace('fa-star', 'fa-star-o');
    } else if (moves > 20) {
        starChild[1].classList.replace('fa-star', 'fa-star-o');
    } else if (moves > 15) {
        starChild[2].classList.replace('fa-star', 'fa-star-o');
    }
}

//  update score in the score-panel
function updateScore() {
    moves++;
    scoreBoard.textContent = moves;
    updateStar();
}

// locak the card in the open position
function lockIcon() {
    for (const card of openCards) {
        card.classList.add('match', 'jello');
        card.classList.remove('open', 'show', 'flip');
        setTimeout(function () {
            card.classList.remove('jello');
        },600)
    }
    openCards = [];
}

// hide cards after 200ms
function hideIcons() {
    setTimeout(function alret() {
        for (const card of openCards) {
            card.classList.remove('open', 'show', 'flip', 'wobble');
        }
        openCards = [];
    }, 700)

}

// after opening 2 cards hide the card if not matched, lock as open otherwise
function openCardList(card) {
    // add the card to open cards list
    if (openCards[0] !== card && openCards.length <3 && !card.classList.contains('match')) {
        openCards.push(card);
    }
    // check the match of card after 2 cards is opened
    if (openCards.length === 2) {
        console.log("2 open");
        updateScore();
        if (openCards[0].childNodes[0].classList[1] == openCards[1].childNodes[0].classList[1]) {
            console.log('Matched');
            lockIcon();
            pair++;
            if (pair === 8) {
                finalScore();
            }
        } else {
            console.log('Not Macthed');
            for (const card of openCards) {
                card.classList.add('wobble');
            }
            hideIcons();
        }

    }
}

//  show the hidden card icon
function showIcon(card) {
    if (!card.classList.contains('match') && openCards.length <2) {
        card.classList.add('open', 'show', 'flip');
        openCardList(card);
    }
    
}

// call showIcon Func when card is clicked
deck.addEventListener('click', function (event) {
    if (event.target.nodeName === 'LI') {
        showIcon(event.target);
    }
})
