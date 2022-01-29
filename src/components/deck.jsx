import React, { Component } from "react";
import Card from "./card";

const Deck = ({ cards, onShuffle }) => {
  return (
    <div id="deck">
      <button className="btn btn-primary btn-sm m-2" onClick={onShuffle}>
        Shuffle
      </button>
      <hr></hr>
      <div id="cards">
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default Deck;
