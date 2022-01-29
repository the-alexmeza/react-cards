import React, { Component } from "react";

const Card = ({ card }) => {
  return (
    <div id={card.value + "-" + card.suit} className="card">
      <div className="card-body">
        <h4 style={{ color: card.color }}>
          {card.value} of {card.suit}
        </h4>
      </div>
    </div>
  );
};

export default Card;
