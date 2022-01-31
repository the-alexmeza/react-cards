import React, { Component } from "react";
import Navbar from "./navbar";
import Deck from "./deck";

class Game extends Component {
  makeDeck = () => {
    const CARD_SUITS = ["Clubs", "Diamonds", "Hearts", "Spades"];
    const CARD_VALUES = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
      "A",
    ];
    let deck = [];
    let id = 1;
    CARD_SUITS.forEach((cardSuit) => {
      CARD_VALUES.forEach((cardValue) => {
        deck.push({
          id: id,
          value: cardValue,
          suit: cardSuit,
          color: this.getTextColor(cardSuit),
        });
        id++;
      });
    });
    return deck;
  };

  calculateWinner = (playerCard, computerCard) => {
    // RETURNS: P if player, C if computer, W if war
    const CARD_SUITS = ["Clubs", "Diamonds", "Hearts", "Spades"];
    const CARD_VALUES = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
      "A",
    ];
    if (
      CARD_VALUES.indexOf(playerCard.value) >
      CARD_VALUES.indexOf(computerCard.value)
    )
      return "P";
    if (
      CARD_VALUES.indexOf(playerCard.value) <
      CARD_VALUES.indexOf(computerCard.value)
    )
      return "C";
    return "W";
  };

  // Shuffle a deck
  shuffleDeck = (cards) => {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  };

  dealCards = (deck) => {
    let playerHand = deck.filter((i, idx) => {
      return idx % 2 == 0;
    });
    let computerHand = deck.filter((i, idx) => {
      return idx % 2 == 1;
    });
    this.setState({ cards: computerHand, hand: playerHand });
  };

  handleStart = () => {
    const deck = this.shuffleDeck(this.makeDeck());
    this.dealCards(deck);
    this.setState({ gameInProgress: true });
  };

  addToWinnerDeck = (deck, pot) => {
    pot.forEach((card) => deck.push(card));
    return deck;
  };

  handlePlay = () => {
    if (!this.state.cards.length) return;
    let hand = [...this.state.hand];
    let cards = [...this.state.cards];
    let computerCard = cards.shift(); // Drawing from index 0
    let playerCard = hand.shift();
    let winner = this.calculateWinner(playerCard, computerCard);
    if (winner === "P")
      hand = this.addToWinnerDeck(hand, [playerCard, computerCard]);
    else if (winner === "C")
      cards = this.addToWinnerDeck(cards, [playerCard, computerCard]);
    else {
      // War mechanic
      let pot = [computerCard, playerCard];
      while (winner === "W") {
        // Blind cards
        pot.push(hand.shift(), cards.shift());
        // Cards to compare
        playerCard = hand.shift();
        computerCard = cards.shift();
        // Make sure to push to pot, otherwise the cards will disapper :o
        pot.push(playerCard, computerCard);
        winner = this.calculateWinner(playerCard, computerCard);
      }
      if (winner === "P") hand = this.addToWinnerDeck(hand, pot);
      else if (winner === "C") cards = this.addToWinnerDeck(cards, pot);
    }
    this.setState({ cards, hand });
  };

  getTextColor = (suit) => {
    if (suit === "Spades" || suit === "Clubs") {
      return "black";
    }
    return "red";
  };

  state = {
    gameInProgress: false, // consider making a board & landing page component
    cards: [],
    hand: [],
  };

  render() {
    return (
      <div>
        <Navbar onStart={this.handleStart} onDraw={this.handlePlay} />
        <div className="container">
          <Deck cards={this.state.hand}>
            <h4>Your Hand - {this.state.hand.length}</h4>
            <p>
              {this.state.gameInProgress === false ? "Game not started." : ""}
            </p>
          </Deck>
          <hr></hr>
          <Deck cards={this.state.cards}>
            <h4>Computer - {this.state.cards.length}</h4>
            <p>
              {this.state.gameInProgress === false ? "Game not started." : ""}
            </p>
          </Deck>
        </div>
      </div>
    );
  }
}

export default Game;
