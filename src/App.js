import logo from "./logo.svg";
import "./App.css";
import Deck from "./components/deck";
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
  };

  handleShuffle = () => {
    let cards = [...this.state.cards];
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    this.setState({ cards });
  };

  render() {
    return (
      <div>
        <Deck cards={this.state.cards} onShuffle={this.handleShuffle} />
      </div>
    );
  }
}

export default App;
