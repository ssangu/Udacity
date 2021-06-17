let deck; // Array containing the matching cards
let moves; // No. of moves done by the player
let maxMatch; // maximum number of card matches possible
let matched; // variable to hold the matched cards count
let minutes = 0; // variable to hold the minutes count 
let seconds; // variable to hold the seconds count
let scoreTimer; // variable to initialize timer
let openCardList = []; // Array to hold the open cards
let delay; // delay for animating
let stars = 3; // star rating on scale of 1 to 3 with maximum set to 3
let startTimer = true; // startTimer on first click

createDeck(); // On page load create the deck of cards

displayCards(deck); // Display the cards on the deck face down ( hiding the symbol)

/*
 * Create a list that holds all of your cards
 */
function createDeck() {

    deck = ["fa-diamond", "fa-diamond", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-umbrella",
        "fa-umbrella", "fa-leaf", "fa-leaf", "fa-bomb", "fa-bomb", "fa-bicycle", "fa-bicycle",
        "fa-cube", "fa-cube"
    ];
    maxMatch = deck.length / 2;
}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function displayCards(cards) {
    let shuffledCards = shuffle(cards);
    let cardsList = " ";

    shuffledCards.forEach(function(item) {
        cardsList += "<li class=\"card \">" + "<i class=\"fa ";
        cardsList += item + " \"></i></li>";
    });

    $(".deck").append(cardsList);

    moves = 0;
    matched = 0;
    minutes = 0;
    seconds = 0;

}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * Start the clock on the score panel
 *   - increment the seconds with interval of 1 second using setInterval function
 *   - when seconds reaches 60, increment minutes and reset seconds to 0
 *   - update score panel's timer with elapsed minutes and seconds HTML to the page
 */

function scoreClock() {
    seconds++;
    if (seconds === 60) {
        minutes++;
        seconds = 0;
    }

    $(".timer").text(minutes + " min(s) " + seconds + " sec(s)");

}


/*
 * Set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol with function displayCardType(card)
 *  - add the card to a *list* of "open" cards with function addToOpenCards(card)
 *  - if the list already has another card, check to see if the two cards match 
 *                                          with function checkMatch(card1,card2)
 *    + if the cards do match, lock the cards in the open position
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol
 *    + increment the move counter and display it on the page
 *    + if all cards have matched, display a message with the final score
 */

$(".deck").on('click', 'li', function() {
    if (startTimer) {
            scoreTimer = setInterval(scoreClock, 1000);
    }
    startTimer = false;
    displayCardType(this);
});

// Show the card's symbol and add to list of open cards
function displayCardType(card) {
    $(card).addClass("open");
    $(card).addClass("freeze");
    addToOpenCards(card);

}

/*
 * Add card to list of open cards, check whether another card is open, if so then check match 
 *  - add card to open cards list
 *  - check open list array for already open card, if present       
 *      + update the moves counter
 *      + if user has made the first move, start the timer
 *      + as per the number of moves give star rating  
 *      + pass the cards for match checking with checkMatch() function    
 *      
 */
function addToOpenCards(card) {

    openCardList.push(card);

    if (openCardList.length > 1) {
        moves++;
        if (moves === 15 || moves === 20) {
            starRating(moves);

        }
        let card1 = openCardList[0];
        let card2 = openCardList[1];
        openCardList = [];
        checkMatch(card1, card2);
    }

    $(".moves").text(moves + " Move(s)");

}

/* Give star rating based on number of match moves
 *  + less than 15 moves - 3 stars( maximum stars awarded ) 
 *  + 15 and above - 2 stars
 *  + 20 and above - 1 star
 */
function starRating(moves) {

    switch (moves) {

        case 15:
        case 20:
            stars--;
            break;
    }

    // reduce the number stars by marking them grey
    for (let i = 3; i > stars; i--) {
        $("ul li:nth-child(" + i + ")").addClass("no-star");
    }
}

/* Check whether the open cards match
 *  + Get the class attributes(symbol names) of the open cards into card1 and card2
 *  + Check whether the symbol names match
 *      - if they match , add them to match class and lock them in match position
 *          - increment the matched cards counter
 *          - if maximum matches have been made , call displayWinner() function
 *      - if they don't match
 *          - put them face down (hide) their symbol by calling showUnmatchedCards() function
 *              - show the symbols of the unmatched cards
 *              - after some time delay hide their symbols and add back them back to deck 
 */
function checkMatch(card1, card2) {

    let class1 = $(card1).children().attr("class");
    let class2 = $(card2).children().attr("class");

    if (class1 === class2) {
        $(card1).removeClass("open");
        $(card2).removeClass("open");
        $(card1).addClass("match");
        $(card2).addClass("match");
        ++matched;
        if (matched === maxMatch) {
            displayWinner();
        }
    } else {
        showUnmatchedCards(card1, card2);
        delay = setTimeout(function() {
            addBackToDeck(card1, card2);
        }, 1000);

    }
}

// Show the unmatched cards symbol
function showUnmatchedCards(card1, card2) {

    $(card1).addClass("unmatch");
    $(card2).addClass("unmatch");
    $(".card").css("pointer-events","none");
}

// Hide the unmatched cards symbol and add them back to deck
function addBackToDeck(card1, card2) {
    $(".card").css("pointer-events","auto");
    $(card1).removeClass("open");
    $(card2).removeClass("open");
    $(card1).removeClass("unmatch");
    $(card2).removeClass("unmatch");
    $(card1).removeClass("freeze");
    $(card2).removeClass("freeze");

}

/* 
 * Display greetings along with winning stats
 *  + stop the timer
 *  + get the minutes and seconds count from timer
 *  + get the moves count
 *  + get the stars count
 *  + display the stats in the results modal and give option to "play again" 
 */
function displayWinner() {
    // stop the clock
    clearInterval(scoreTimer);
    // display results via results modal
    $("#myModal").css("display", "block");
    let winMsg = "Congratulations!" + " You have won with " + moves + " moves" + " in " + minutes + "m " + seconds + "s";
    $(".result").text(winMsg);
    // ask whether user wants to play again, if so reset the cards deck(game board)
    $("#play-btn").on('click', function() {
        resetGame();
    });
}

// Call the function resetGame() to restart the game from beginning
$(".restart").on('click', function() {
    resetGame();
});

/*
 * Reset the game to initial state on click of restart button
 *  - reset the card deck , score panel and results display modal
 *      + remove cards from the deck
 *      + reset the stars, timer, moves counter 
 *      + reset the results display modal
 *  -display the new deck of cards with all reset values
 */
function resetGame() {
    // remove cards from deck
    $(".deck").empty();
    // remove any card added to the open cards list
    openCardList = [];
    // reset the score panel
    moves = 0;
    minutes = 0;
    seconds = 0;
    stars = 3;
    startTimer = true;
    clearInterval(scoreTimer);
    // reset the stars of display modal
    if ($("ul li").hasClass("no-star")) {
        $("ul li").removeClass("no-star");
    }
    // hide the results display modal
    $(".modal").css('display', 'none');

    // display the deck with reset values
    displayCards(deck);
    $(".moves").text(moves + " Move(s)");
    $(".timer").text(minutes + " min(s) " + seconds + " sec(s)");
}