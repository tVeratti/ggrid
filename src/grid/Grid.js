import React, { Component } from 'react';
import classnames from 'classnames';
import memoize from 'memoize-one';
import { isEqual } from 'lodash';
import { arr } from '../utils';

import './Grid.scss';

import Tile from '../tile/Tile';

class Grid extends Component {
  static defaultProps = {
    rows: 5,
    columns: 5,
    size: 100
  };

  state = {
    activeCoord: {}
  };

  getCubeCoord(row, col) {
    const x = col;
    const z = row - (col + (col%2)) / 2;
    const y = -x-z;
    return { x, y, z };
  }

  getCubeDistance(a, b) { 
    return (Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z)) / 2
  }

  onTileClick = coord => {
    this.setState({ activeCoord: coord });
  };

  renderTiles = row => {
    const { columns, size, sides } = this.props;
    const { activeCoord } = this.state;

    return arr(columns).map((_, col) => {
      const coord = this.getCubeCoord(row, col);
      const distance = this.getCubeDistance(activeCoord, coord);

      const isAdjacent = distance <= 1;
      const isActive = isEqual(activeCoord, coord);

      return (
        <Tile
          key={`${row}${col}`}
          size={size}
          sides={sides}
          coord={coord}
          isActive={isActive}
          isAdjacent={isAdjacent}
          onClick={this.onTileClick}
        />
      );
    });
  };

  render() {
    const { sides, rows } = this.props;
    const gridClassNames = classnames('grid', {
      'grid--square': sides === 4,
      'grid--hex': sides === 6
    });

    const tiles = arr(rows).map((_, r) => {
      return (
        <div key={r} className="grid__row">
          {this.renderTiles(r)}
        </div>
      );
    });

    return <div className={gridClassNames}>{tiles}</div>;
  }
}

export default Grid;
