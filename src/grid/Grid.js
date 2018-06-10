import React, { Component } from 'react';
import classnames from 'classnames';
import memoize from 'memoize-one';
import { arr } from '../utils';

import './Grid.scss';

import Tile from '../tile/Tile';

class Grid extends Component {
  static defaultProps = {
    sides: 4,
    rows: 3,
    columns: 3,
    size: 100
  };

  render() {
    const { size, sides, rows, columns } = this.props;
    const gridClassNames = classnames('grid', {
      'grid--square': sides === 4,
      'grid--hex': sides === 6
    });

    const tiles = arr(rows).map(c => {
      return (
        <div className="grid__row">
          {arr(columns).map(r => <Tile size={size} sides={sides} />)}
        </div>
      );
    });

    return <div className={gridClassNames}>{tiles}</div>;
  }
}

export default Grid;
