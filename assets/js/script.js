/* I used online articles and Tutorials to learn how to create an appropriate code for a matching game that includes all components needed to make the game functional.
I have cited my sources in the acknowledgments section of the ReadMe file extensivelly and in detail!!!!
 Note that I DID NOT copy paste a single line of code, but rather learned from the tutorials to put together a code that would suit this project. */

class MatchTheSpartans {
  /**
   * constructor is called once you create an instance of this object.
   * creates an array out of the collection of card elements.
   * Sets time at the begining of the game and makes it trickle down second by second.
   * Ticks one up every time we click a card.
   * @param {Number} totalTime - time at the begining of the game in seconds.
   * @param {Array} cards - holds array of html card elements.
   */
  constructor(totalTime, cards) {
    this.cardsArray = cards; 
    this.totalTime = totalTime; 
    this.timeRemaining = totalTime; 
    this.timer = document.getElementById("time-remaining"); 
    this.ticker = document.getElementById("flips"); 
  }

  /**
   * Function invoked every time game starts.
   * Sets number of flips to 0, resets times, no cards to check in the begining.
   * Creates empty array to store matching cards.
   */
  startGame() {
    this.totalClicks = 0; 
    this.timeRemaining = this.totalTime; 
    this.cardToCheck = null; 
    this.matchedCards = []; 
    this.busy = true; 

    /**
     * This makes it so that we wait 500 miliseconds before running the function.
     * This delay makes start/restart smoother.
     * This function Shuffles this array of cards to make it random.
     * Starts the countdown.
     * Since busy is false, player can flip cards to check and match.
     * @param {Function} - Takes function as first parameter.
     * @param {Number} - 500 miliseconds as second parameter.
     */
    setTimeout(() => {
      this.shuffleCards(this.cardsArray);
      this.countdown = this.startCountdown();
      this.busy = false;
    }, 500);

    /**
     * This function hides cards so player sees the back and resets time and number of flips when game starts.
     */
    this.hideCards();
    this.timer.innerText = this.timeRemaining; //reseting the timer upon games start back to 100
    this.ticker.innerText = this.totalClicks; //reseting the number of flips upon games start back to 0
  }

  /**
   * This function waits 1000miliseconds before its invoked. Makes the game smooth.
   * @param {Function} - Function waits 1000 miliseconds until function is invoked.
   * @param {Number} - Number of miliseconds we wait until function is invoked.
   * Game over function displays failure message when player fails to match cards within the time given.
   * Function creates timer countdown.
   * Time remaining trickes down one second at a time.
   * Every seconde the time remaining is updated in the display.
   * When time remaining is 0 the game over function is invoked.
   */
  startCountdown() {
    return setInterval(() => {
      this.timeRemaining--; 
      this.timer.innerText = this.timeRemaining; 
      if (this.timeRemaining === 0)
        this.gameOver();
    }, 1000);
  }

  /**
   * This function pops up the game-over/failure message.
   * This function is invoked when player fails to match the cards within the given time (100 seconds).
   * This function resets the time when game is over.
   */
  gameOver() {
    clearInterval(this.countdown);
    document.getElementById("game-over-text").classList.add("visible");
  }

  /**
   * This function pops up the success message.
   * This function is invoked when the player manages to match the cards within the time given.
   * This function resets the time. Displays how many flips it took to win.
   */
  victory() {
    clearInterval(this.countdown);
    document.getElementById("success-text").classList.add("visible"); 
    flips_results.innerText = this.totalClicks;
  }
  /**
   * This function will hide all cards, flip them so the player sees the back.
   */
  hideCards() {
    /**
     * @param {Card} - Represents card HTML element.
     * forEach() will make a function out of every item in the array.
     * The class visible will be removed from ever card in the array so cards will hide.
     */
    this.cardsArray.forEach((card) => {
      card.classList.remove("visible");
    });
  }
  /**
   * This function will flip a card. Canflip card is a boolean.
   * If the canFlipCard Boolean returns true then card is flippable.
   * This function will iterate number of flips and tick one each time player flips.
   * It will update the flip counts to current value.
   * It will make a card visible when clicked.
   * cardToCheck checks if this is the card to check or if this is the card to match.
   * The first card a player check is the to check card. The Second card a player checks is the to match card.
   * @param {Element} card - HTML element representing card.
   */
  flipCard(card) {
    if (this.canFlipCard(card)) {
      this.totalClicks++;
      this.ticker.innerText = this.totalClicks;
      card.classList.add("visible");

      if (this.cardToCheck) {
        this.checkForCardMatch(card);
      } else {
        this.cardToCheck = card;
      }
    }
  }

  /**
   * If the  card we clicked to check equals  card we clicked to match cards are matched.
   * Else the card we clicked to check does not equal the card we clicked to match, cards are missmatched.
   * When cards are missmatched cardToCheck become null, i.e no card to check so cards are flipped again.
   * @param {Element} card - Represents HTML card element.
   */
  checkForCardMatch(card) {
    if (this.getCardType(card) === this.getCardType(this.cardToCheck))
      this.cardMatch(card, this.cardToCheck);
    else this.cardMismatch(card, this.cardToCheck);
    this.cardToCheck = null;
  }
  /**
   * When card 1 matches card two they are both sent to the empty matchedCards array in startGame().
   * If matched cards array = cards array, i.e if all cards are matched the victory() function is invoked.
   * @param {Element} card1 - represents the first card player flips.
   * @param {Element} card2 - represents the second card player flips.
   */
  cardMatch(card1, card2) {
    this.matchedCards.push(card1); 
    this.matchedCards.push(card2);

    if (this.matchedCards.length === this.cardsArray.length)
      this.victory();
  }

  /**
   * When card1 does not equal card2 they are missmatched.
   * When cards are missmatched the visible class is removed and they are flipped/hidden again.
   * @param {Element} card1 - represents the first card player flips.
   * @param {Element} card2 - represents the second card player flips.
   */
  cardMismatch(card1, card2) {
    this.busy = true;
    
    /**
     * This will create a 1000milisecond delay for smoothness before missmatch are flipped.
     * @param {Function} - Function will wait 1000miliseconds until it is run.
     * @param {Number} - Number of miliseconds we wait.
     */
    setTimeout(() => {
      card1.classList.remove("visible");
      card2.classList.remove("visible");
      this.busy = false;
    }, 1000); 
  }

  /**
   * Fisher yates algorithm to shuffle an array of n elements from indices 0 to n-1, i.e the length of the array,
   * for i, the last element all the way to the begining of the array, looping backwards.
   * for each iteration we create a random integer greater than or equal to 0 and lesser or equal to i.
   * We are not shuffling the array but the display order of the cards.
   * We exchange the random item of the array with the one we are currently on.
   * @param {Array} cardsArray - Holds the html elements representing the cards.
   */
  shuffleCards(cardsArray) {
    for (let i = cardsArray.length - 1; i > 0; i--) {
      let randIndex = Math.floor(Math.random() * (i + 1));
      cardsArray[randIndex].style.order = i;
      cardsArray[i].style.order = randIndex;
    }
  }

  /**
   * Uses the src of the img using the class card value in order to match or missmatch it with another img.
   * @param {Element} card - HTML element representing a card.
   */
  getCardType(card) {
    return card.getElementsByClassName("card-value")[0].src;
  }

  /**
   *Everything in the return function needs to return false in order for canFlipCard to be true.
   * If everything in return function is false then canFlipCard is true.
   * Player cand flip the card.
   * @param {Element} card - HTML element representing a card.
   */
  canFlipCard(card) {
    return (
      !this.busy &&
      !this.matchedCards.includes(card) &&
      card !== this.cardToCheck
    );
  }
}

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready); 
} else {
  ready();
}

function ready() {
  let overlays = Array.from(document.getElementsByClassName("overlay-text")); //grabs html collection of elements and create arrays out of it.
  let cards = Array.from(document.getElementsByClassName("card")); //grabs html collection of elements and create arrays out of it.
  let game = new MatchTheSpartans(100, cards); //instance of this MatchTheSpartans object.
  let flips_results = document.getElementById('flips_results');

  overlays.forEach((overlay) => {
    //loop over arrays and add click event listeners. Foreach() creates a function for every item of the array.
    overlay.addEventListener("click", () => {
      //creates event listener triggered once clicked.
      overlay.classList.remove("visible"); //once clicked removes the visible class, so content is hidden(flipped again).
      game.startGame(); //starts game when click on overlay, calls startGame()fucntion.
    });
  });

  cards.forEach((card) => {
    //Foreach() creates a function for every item of the array.
    card.addEventListener("click", () => {
      //add event listener that tiggers when clicked
      game.flipCard(card); //flips card element
    });
  });
}
