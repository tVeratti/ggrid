import React, { Component } from 'react';
import classnames from 'classnames';
import memoize from 'memoize-one';
import { arr } from '../utils';

import './Tile.scss';

class Tile extends Component {
  static defaultProps = {
    sides: 4,
    size: 100,
    coord: {}
  };

  onClick = e => {
    const { coord, onClick } = this.props;
    onClick && onClick(coord);
  };

  renderSVG = () => {
    const { size } = this.props;
    const viewBox = `-100 -87 200 174`;
    const height = size * 0.87;

    return (
      <svg
        className="tile__face"
        height={height}
        width={size}
        viewBox={viewBox}>
        <polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87" />
      </svg>
    );
  };

  render() {
    const { sides, size, coord, isActive, isAdjacent } = this.props;

    const className = classnames('tile', {
      'tile--active': isActive,
      'tile--adjacent': isAdjacent
    });

    const isSmall = size < 86;
    const style = {
      width: `${size}px`,
      height: `${size * 0.86}px`,
      marginLeft: `-${Math.ceil(size / 4)}px`
    };

    return (
      <div
        className={className}
        style={style}
        ref={tile => (this.tile = tile)}
        onClick={this.onClick}>
        {this.renderSVG()}
        {/* this.renderEdges(edges) */}
        <div className="tile__label" />
      </div>
    );
  }
}

export default Tile;
