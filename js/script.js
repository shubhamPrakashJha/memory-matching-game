/*
 * Create a list that will holds all of the cards
 */
const cardNodeLIst = document.querySelectorAll('.cards');
const cardArray = Array.from(cardNodeLIst);
const deck = document.querySelector('.deck')

const shuffleButton = document.querySelector('.restart');

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

