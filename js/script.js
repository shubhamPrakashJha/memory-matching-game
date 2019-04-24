/*
 * Create a list that will holds all of the cards
 */
const cardNodeLIst = document.querySelectorAll('.cards');
const cardArray = Array.from(cardNodeLIst);
const deck = document.querySelector('.deck')

const shuffleButton = document.querySelector('.restart');

let openCards = [];

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
// locak the card in the open position
function lockIcon() {
    for (const card of openCards) {
        card.classList.add('match');
        card.classList.remove('open', 'show');
    }
    openCards = [];
}

// hide cards after 200ms
function hideIcons() {
    setTimeout(function alret() {
        for (const card of openCards) {
            card.classList.remove('open', 'show');
        }
        openCards = [];
    }, 200)

}

// after opening 2 cards hide the card if not matched, lock as open otherwise
function openCardList(card) {
    // add the card to open cards list
    if (openCards[0] !== card) {
        openCards.push(card);
    }
    // check the match of card after 2 cards is opened
    if (openCards.length === 2) {
        console.log("2 open");
        if (openCards[0].childNodes[0].classList[1] == openCards[1].childNodes[0].classList[1]) {
            console.log('Matched');
            lockIcon();
        } else {
            console.log('Not Macthed');
            hideIcons();
        }

    }
}

//  show the hidden card icon
function showIcon(card) {
    card.classList.add('open', 'show');
    openCardList(card)
}

// call showIcon Func when card is clicked
deck.addEventListener('click', function (event) {
    if (event.target.nodeName === 'LI') {
        showIcon(event.target);
    }
})
