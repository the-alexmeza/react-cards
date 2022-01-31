import React from "react";

const Navbar = ({ onStart, onDraw }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          React Cards{" "}
          <button className="btn btn-primary btn-sm m-2" onClick={onStart}>
            Start Game
          </button>
          <button className="btn btn-secondary btn-sm m-2" onClick={onDraw}>
            Draw
          </button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
