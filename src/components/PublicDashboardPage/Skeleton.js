import React from 'react';
import { Chart1, nivoSample } from './mockData';
import HorizontalBar from './Charts/HorizontalBar';
import { ResponsiveBar } from '@nivo/bar';

import Component from 'react-component-component';

/**
 * Truncating text and label padding will have to be set for each chart
 * Text is SVG and therefore can't be aligned using textAlign
 * We have to use a combination of textAnchor and padding
 * Little too fuzzy? --- Yes
 */

const truncCutoff = 22;
const trunc = text => (text.length > truncCutoff ? text.substring(0, truncCutoff) + '...' : text);

const data = Chart1.map(d => {
  return { ...d, id: trunc(d.id) };
});

const Skeleton = () => (
  <div style={{ height: '500px', width: '500px' }}>
    {/* <ResponsiveBar
      data={data}
      keys={['probands', 'familyMembers']}
      indexBy="id"
      margin={{
        top: 50,
        right: 130,
        bottom: 50,
        left: 60,
      }}
      padding={0.3}
      layout="horizontal"
      colors={['#1f9bb6', '#e3429b']}
      colorBy="id"
      borderColor="inherit:darker(1.6)"
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        tickValues: [0, 250, 500, 750, 1000, 1250],
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
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
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor="inherit:darker(1.6)"
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      maxValue={1250}
      enableGridX={true}
      gridXValues={[0, 250, 500, 750, 1000, 1250]}
    />
    */}

    {
      <HorizontalBar
        data={data}
        keys={['probands', 'familyMembers']}
        colors={['#1f9bb6', '#e3429b']}
        tickValues={[0, 250, 500, 750, 1000, 1250]}
        maxValue={1250}
        legends={[
          { title: '# Probands', color: '#1f9bb6' },
          { title: '# Family Members', color: '#e3429b' },
        ]}
        legendItemWidth={100}
      />
    }
  </div>
);

export default Skeleton;
