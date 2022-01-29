import logo from "./logo.svg";
import "./App.css";
import Deck from "./components/deck";
import Navbar from "./components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";

class App extends Component {
  makeDeck = () => {
    const CARD_SUITS = ["Hearts", "Clubs", "Spades", "Diamonds"];
    const CARD_VALUES = [
      "A",
      "1",
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
  getTextColor = (suit) => {
    if (suit === "Spades" || suit === "Clubs") {
      return "black";
    }
    return "red";
  };

  state = {
    cards: this.makeDeck(),
    hand: [],
  };

  handleShuffle = () => {
    let cards = [...this.state.cards];
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    this.setState({ cards });
  };

  handleDraw = () => {
    if (!this.state.cards.length) return;
    let hand = [...this.state.hand];
    let cards = [...this.state.cards];
    const card = cards.shift(); // Drawing from index 0
    hand.push(card);
    this.setState({ cards, hand });
  };

  handleDiscard = () => {
    // todo: find out how to make this method not repetitive
    if (!this.state.hand.length) return;
    let hand = [...this.state.hand];
    let cards = [...this.state.cards];
    const card = hand.shift(); // Discard from index 0
    cards.push(card);
    this.setState({ cards, hand });
  };

  render() {
    return (
      <div>
        <Navbar
          onShuffle={this.handleShuffle}
          onDraw={this.handleDraw}
          onDiscard={this.handleDiscard}
        />
        <div className="container">
          <Deck cards={this.state.hand}>
            <h4>Your Hand</h4>
            <p>
              {this.state.hand.length === 0 ? "You do not have any cards!" : ""}
            </p>
          </Deck>
          <hr></hr>
          <Deck cards={this.state.cards}>
            <h4>Deck</h4>
            <p>{this.state.cards.length === 0 ? "The deck is empty!" : ""}</p>
          </Deck>
        </div>
      </div>
    );
  }
}

export default App;
