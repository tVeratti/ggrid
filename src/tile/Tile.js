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

  edges = memoize((sides, size) => this.generateSides(sides, size));

  toRad = angle => (90 - angle) * (Math.PI / 180);

  calculateSide = (angle, size) => {
    const rad = this.toRad(angle);
    return size * Math.tan(rad);
  };

  generateSides(numSides, size) {
    const internalAngle = (180 * (numSides - 2)) / numSides;
    const radius = size / 2;
    const edge = this.calculateSide(internalAngle / 2, radius) * 2;

    // Calculate the full distance to a corner point.
    // (Get hypotenus with pythagorean theorem).
    const distance = Math.sqrt(Math.pow(edge / 2, 2) + Math.pow(radius, 2));

    const sides = arr(numSides).map((_, i) => {
      const angle = (i / numSides) * 360;

      // Calculate the position of a point that will
      // be used to create a clip-path of the shape.
      const rad = this.toRad(-angle - internalAngle / (numSides - 2));
      const point = {
        x: (radius + Math.cos(rad) * distance).toFixed(2),
        y: (radius + Math.sin(rad) * distance).toFixed(2)
      };

      return { index: i, angle, point };
    });

    this.radius = radius;
    this.edgeSize = edge;
    this.distance = distance;

    return sides;
  }

  getPoints = edges => {
    const { size } = this.props;

    return edges.map((e, i) => {
      // Sides are clockwise, starting with the
      // bottom edge and rotating around.
      const { point, index } = e;
      return `${point.x},${point.y}`;
    });
  };

  onClick = e => {
    const { coord, onClick } = this.props;
    onClick && onClick(coord);
  };

  renderEdges = edges => {
    const { size, sides } = this.props;

    const edgeNodes = edges.map(side => {
      const sideStyle = {
        width: `${this.edgeSize}px`,
        transform: `
          translateX(-50%)
          rotate(${side.angle}deg)
          translateY(${this.radius}px)
        `
      };

      return (
        <div
          key={`${side.index}-${side.angle}`}
          className="tile__edge"
          style={sideStyle}
        />
      );
    });

    return <div className="tile__edges">{edgeNodes}</div>;
  };

  renderSVG = edges => {
    const { size } = this.props;
    const points = this.getPoints(edges).join(' ');

    return (
      <svg className="tile__face" height={size} width={size}>
        <polygon points={points} />
      </svg>
    );
  };

  render() {
    const { sides, size, coord, isActive, isAdjacent } = this.props;
    const edges = this.edges(sides, size);

    const className = classnames('tile', {
      'tile--active': isActive,
      'tile--adjacent': isAdjacent
    });

    const style = {
      width: `${size}px`,
      height: `${size}px`
    };

    return (
      <div
        className={className}
        style={style}
        ref={tile => (this.tile = tile)}
        onClick={this.onClick}>
        {this.renderSVG(edges)}
        {/* this.renderEdges(edges) */}

        <div className="tile__label">
          {coord[0]},
          {coord[1]}
        </div>
      </div>
    );
  }
}

export default Tile;
