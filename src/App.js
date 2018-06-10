import React, { Component } from 'react';

import './App.scss';

import Tile from './tile/Tile';

class App extends Component {
  render() {
    return (
      <div>
        <Tile />
        <Tile sides={6} />
        <Tile sides={8} />
        <Tile sides={12} />
      </div>
    );
  }
}

export default App;
