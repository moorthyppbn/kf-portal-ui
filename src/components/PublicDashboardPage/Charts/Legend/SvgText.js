import React from 'react';
import PropTypes from 'prop-types';

const defaultStyle = {
  fontSize: '11px',
  pointerEvents: 'none',
  userSelect: 'none',
};

const SvgText = ({
  textAnchor = 'start',
  alignmentBaseline = 'middle',
  x = '0',
  y = '0',
  style = defaultStyle,
  fill = 'black',
  children,
}) => (
  <text
    textAnchor={textAnchor}
    alignmentBaseline={alignmentBaseline}
    x={x}
    y={y}
    style={style}
    fill={fill}
  >
    {children}
  </text>
);

SvgText.propTypes = {
  textAnchor: PropTypes.string,
  x: PropTypes.string,
  y: PropTypes.string,
  style: PropTypes.string,
  textValue: PropTypes.string,
  fill: PropTypes.object,
};

export default SvgText;
