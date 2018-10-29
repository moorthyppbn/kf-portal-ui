import React, { Fragment } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import PropTypes from 'prop-types';
import Legend from './Legend';

const HorizontalBar = ({
  data,
  keys,
  colors,
  tickValues,
  maxValue,
  legendItemWidth,
  legends,
  ...overrides
}) => (
  <Fragment>
    <ResponsiveBar
      data={data}
      keys={keys}
      indexBy="id"
      margin={{
        top: 40,
        right: 40,
        bottom: 40,
        left: 40,
      }}
      padding={0.3}
      colors={colors}
      colorBy="id"
      layout="horizontal"
      borderColor="inherit:darker(1.6)"
      axisBottom={{
        orient: 'bottom',
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        tickValues: tickValues,
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        renderTick: tick => {
          const { value, format, key, x, y, theme } = tick;
          console.log('tick', tick);
          // Custom formatting
          let renderedValue = value;
          if (format !== undefined) {
            renderedValue = format(value);
          }

          const xOffset = 160;

          return (
            <g key={key} transform={`translate(${x - xOffset},${y})`}>
              <text textAnchor="start" alignmentBaseline="middle" style={theme.axis.ticks.text}>
                {renderedValue}
              </text>
            </g>
          );
        },
      }}
      enableGridX={true}
      gridXValues={tickValues}
      maxValue={maxValue || tickValues[tickValues.length - 1] + 100}
      enableGridY={false}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor="inherit:darker(1.6)"
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      tooltip={null}
      isInteractive={false}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: 'yellow',
              strokeWidth: 2,
            },
          },
        },
        grid: {
          line: {
            stroke: '#e7e8ec',
            strokeWidth: 2,
          },
        },
      }}
    />

    {!legends ? null : (
      <Legend style={{ marginLeft: 260 }} itemWidth={legendItemWidth} legends={legends} />
    )}
  </Fragment>
);

HorizontalBar.propTypes = {
  maxValue: PropTypes.number,
  tickValues: PropTypes.arrayOf(PropTypes.number),
  data: PropTypes.array,
  keys: PropTypes.arrayOf(PropTypes.string),
  colors: PropTypes.arrayOf(PropTypes.string),
};

export default HorizontalBar;
