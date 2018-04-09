import React, { Component } from 'react';

import Gameboard from './components/Gameboard/Gameboard';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Gameboard />
      </div>
    );
  }
}

export default App;
