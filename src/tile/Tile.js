import React, { Component } from 'react';
import classnames from 'classnames';
import memoize from 'memoize-one';
import { arr } from '../utils';

import './Tile.scss';

class Tile extends Component {
  static defaultProps = {
    sides: 4,
    size: 100
  };

  shape = memoize((sides, size) => this.generateSides(sides, size));

  calculateSide = (angle, size) => {
    const rad = (90 - angle) * (Math.PI / 180);
    return size * Math.tan(rad);
  };

  generateSides(numSides, size) {
    const internalAngle = (180 * (numSides - 2)) / numSides;

    this.radius = size / 2;
    this.length = this.calculateSide(internalAngle / 2, this.radius) * 2;

    console.log(this.length);

    return arr(numSides).map((_, i) => {
      const angle = (i / numSides) * 360;
      return { index: i, angle };
    });
  }

  renderSide = side => {
    const { size, sides } = this.props;

    const sideStyle = {
      width: `${this.length}px`,
      transform: `
        translate(-50%)
        rotate(${side.angle}deg)
        translateY(${this.radius}px)
      `
    };

    return (
      <div
        key={`${side.index}-${side.angle}`}
        className="tile__side"
        style={sideStyle}>
        <div className="tile__side-face" />
      </div>
    );
  };

  render() {
    const { sides, size } = this.props;
    const sidesNodes = this.shape(sides, size).map(this.renderSide);

    const tileStyle = {
      width: `${size}px`,
      height: `${size}px`
    };

    return (
      <div className="tile" style={tileStyle}>
        {sidesNodes}
      </div>
    );
  }
}

export default Tile;
