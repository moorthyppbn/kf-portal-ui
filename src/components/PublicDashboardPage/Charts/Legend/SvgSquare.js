import React from 'react';
import PropTypes from 'prop-types';

const SvgSquare = ({ x = '0', y = '0', fill = 'black', width = '20', height = '20' }) => (
  <rect
    x={x}
    y={y}
    fill={fill}
    strokeWidth="0"
    stroke="transparent"
    width={width}
    height={height}
    style={{ pointerEvents: 'none' }}
  />
);

SvgSquare.propTypes = {
  x: PropTypes.string,
  y: PropTypes.string,
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default SvgSquare;
