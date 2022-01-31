import logo from "./logo.svg";
import "./App.css";
import Game from "./components/game.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";

class App extends Component {
  render() {
    return <Game />;
  }
}

export default App;
