import React from 'react';
import { Chart1, nivoSample } from './mockData';
import {
  VictoryBar,
  VictoryStack,
  VictoryChart,
  VictoryAxis,
  VictoryLegend,
  VictoryPortal,
  LineSegment,
} from 'victory';
import { theme } from './theme';
import { ResponsiveBar } from '@nivo/bar';
import { AxisTick } from '@nivo/axes';
import HorizontalBar from './Charts/HorizontalBar';
/**
 * Truncating text and label padding will have to be set for each chart
 * Text is SVG and therefore can't be aligned using textAlign
 * We have to use a combination of textAnchor and padding
 * Little too fuzzy? --- Yes
 */

const truncCutoff = 14;
const trunc = text => (text.length > truncCutoff ? text.substring(0, truncCutoff) + '...' : text);

const data = Chart1.map(d => {
  return { ...d, id: trunc(d.id) };
});

const Skeleton = () => {
  return (
    <div>
      <div style={{ width: '600px', height: '500px' }}>
        {<HorizontalBar theme={theme} data={data} />}
      </div>
      <div style={{ width: '600px', height: '500px' }}>{}</div>
      <div style={{ width: '600px', height: '500px' }}>{}</div>

      {/*
      <div style={{ width: '800px', height: '700px' }}>
        <ResponsiveBar
          data={Chart1}
          keys={['probands', 'familyMembers']}
          indexBy="id"
          margin={{
            top: 50,
            right: 130,
            bottom: 80,
            left: 260,
          }}
          defs={[
            {
              id: 'blue',
              color: 'blue',
            },
            {
              id: 'red',
              color: 'red',
            },
          ]}
          fill={[
            {
              match: {
                id: 'probands',
              },
              id: 'blue',
            },
            {
              match: {
                id: 'familyMembers',
              },
              id: 'red',
            },
          ]}
          padding={0.3}
          layout="horizontal"
          borderColor="inherit:darker(1.6)"
          axisBottom={{
            orient: 'bottom',
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            renderTick: props => {
              console.log(props, 'props');
              const {
                value: _value,
                x,
                y,
                opacity,
                rotate,
                format,
                lineX,
                lineY,
                onClick,
                textX,
                textY,
                textBaseline,
                textAnchor,
                theme,
              } = this.props;

              let value = _value;
              if (format !== undefined) {
                value = format(value);
              }

              let gStyle = { opacity };
              if (onClick) {
                gStyle['cursor'] = 'pointer';
              }

              return (
                <g
                  transform={`translate(${x},${y})`}
                  {...(onClick ? { onClick: e => onClick(e, value) } : {})}
                  style={gStyle}
                >
                  <line x1={0} x2={lineX} y1={0} y2={lineY} style={theme.axis.ticks.line} />
                  <text
                    alignmentBaseline={textBaseline}
                    textAnchor={textAnchor}
                    transform={`translate(${textX},${textY}) rotate(${rotate})`}
                    style={theme.axis.ticks.text}
                  >
                    {value}
                  </text>
                </g>
              );
            },
          }}
          enableGridX={true}
          enableGridY={true}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="inherit:darker(1.6)"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 63,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
        </div>*/}
    </div>
  );
};

export default Skeleton;
