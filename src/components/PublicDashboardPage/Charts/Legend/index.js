import React from 'react';
import SvgSquare from './SvgSquare';
import SvgText from './SvgText';

/**
 *
[{
  title: Proband
  color: '#e3429b'
}]

- TODO: horizontal or vertical
- TODO: positioning offsets
*/
const Legend = ({ legends }) => (
  <svg width="100" height="40" xmlns="http://www.w3.org/2000/svg">
    {legends.map((l, i) => {
      return (
        <g key={i} height="20">
          <SvgSquare fill={l.color} height="20" width="20" x="0" y="0" />
          <SvgText textValue={l.title} x="22" y="10">
            {l.title}
          </SvgText>
        </g>
      );
    })}
  </svg>
);

export default Legend;
