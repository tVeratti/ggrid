import React, { Component } from 'react';

import './App.scss';

import Tile from './tile/Tile';
import Grid from './grid/Grid';

class App extends Component {
  state = {
    range: 1
  };

  render() {
    return (
      <div>
        <Grid sides={6} range={this.state.range} />
        <div>
          <label htmlFor="range">Selection Range</label>
          <input
            id="range"
            value={this.state.range}
            onChange={e => this.setState({ range: e.target.value })}
          />
        </div>
      </div>
    );
  }
}

export default App;
