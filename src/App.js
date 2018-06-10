import React, { Component } from 'react';

import './App.scss';

import Tile from './tile/Tile';
import Grid from './grid/Grid';

class App extends Component {
  render() {
    return (
      <div>
        <Grid sides={4} size={100} />
        <Grid sides={6} size={100} />
      </div>
    );
  }
}

export default App;
