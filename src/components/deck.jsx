import React, { Component } from "react";
import Card from "./card";

const Deck = ({ cards, children }) => {
  return (
    <div>
      <hr></hr>
      <div>
        {children}
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default Deck;
