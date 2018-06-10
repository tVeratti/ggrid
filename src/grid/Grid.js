import React, { Component } from 'react';
import classnames from 'classnames';
import memoize from 'memoize-one';
import { isEqual } from 'lodash';
import { arr } from '../utils';

import './Grid.scss';

import Tile from '../tile/Tile';

class Grid extends Component {
  static defaultProps = {
    sides: 4,
    rows: 5,
    columns: 5,
    size: 75
  };

  state = {
    activeCoord: []
  };

  onTileClick = coord => {
    this.setState({ activeCoord: coord });
  };

  renderTiles = row => {
    const { columns, size, sides } = this.props;
    const { activeCoord } = this.state;

    return arr(columns).map((_, col) => {
      const coord = [col, row]; // [x, y]
      const isActive = isEqual(activeCoord, coord);

      const distance = {
        x: Math.abs(activeCoord[0] - coord[0]),
        y: Math.abs(activeCoord[1] - coord[1])
      };

      let isAdjacent = distance.x <= 1 && distance.y <= 1;

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
