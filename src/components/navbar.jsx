import React from "react";

const Navbar = ({ onShuffle, onDraw, onDiscard }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          React Cards{" "}
          <button className="btn btn-primary btn-sm m-2" onClick={onShuffle}>
            Shuffle Deck
          </button>
          <button className="btn btn-secondary btn-sm m-2" onClick={onDraw}>
            Draw
          </button>
          <button className="btn btn-danger btn-sm m-2" onClick={onDiscard}>
            Discard
          </button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
