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

/**
 * Basic spacing for now, can be improved on
 * based on nivo legend spacing
 * 
    let xStep = 0
    let yStep = 0
    if (direction === DIRECTION_ROW) {
        xStep = itemWidth + itemsSpacing
    } else if (direction === DIRECTION_COLUMN) {
        yStep = itemHeight + itemsSpacing
    } 
 */

const DIRECTION_ROW = 'ROW';
const DIRECTION_COLUMN = 'COLUMN';

const Legend = ({
  legends = [],
  itemWidth = 100,
  itemHeight = 40,
  direction = DIRECTION_ROW,
  itemsSpacing = 20,
  style,
}) => (
  <div style={style}>
    <svg
      width={itemWidth * legends.length}
      height={itemHeight * legends.length}
      xmlns="http://www.w3.org/2000/svg"
    >
      {legends.map((l, i) => {
        let xOffset = 0;
        let yOffset = 0;

        if (direction === DIRECTION_ROW) {
          xOffset = itemWidth + itemsSpacing;
        } else if (direction === DIRECTION_COLUMN) {
          yOffset = itemHeight + itemsSpacing;
        }

        const legendItem = (
          <g key={i} height="20" transform={`translate({${i * xOffset},${i * yOffset})`}>
            <SvgSquare fill={l.color} height="20" width="20" x={i * xOffset} y={0} />
            <SvgText textValue={l.title} x={i * xOffset + 22} y={10}>
              {l.title}
            </SvgText>
          </g>
        );

        return legendItem;
      })}
    </svg>
  </div>
);

export default Legend;
