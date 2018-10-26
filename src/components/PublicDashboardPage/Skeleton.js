import React, { Component } from 'react';
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
import SvgText from 'svg-text';
import Legend from './Charts/Legend';

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

class Skeleton extends Component {
  constructor(props) {
    super(props);
    this.svgRef = React.createRef();
  }

  render() {
    return (
      <div>
        <div style={{ width: '0', height: '0' }}>
          {/*<HorizontalBar theme={theme} data={data} />*/}
        </div>

        {
          <div style={{ width: '800px', height: '700px' }}>
            <ResponsiveBar
              data={Chart1}
              keys={['probands', 'familyMembers']}
              indexBy="id"
              margin={{
                top: 50,
                right: 10,
                bottom: 80,
                left: 260,
              }}
              padding={{
                left: 50,
              }}
              /* defs={[
              //
              // type is a required attribute
              //
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
            ]}*/
              padding={0.3}
              layout="horizontal"
              borderColor="inherit:darker(1.6)"
              axisBottom={{
                orient: 'bottom',
                tickSize: 0,
                tickPadding: 5,
                tickRotation: 0,
                tickValues: [0, 250, 500, 750, 1000, 1250],
              }}
              axisLeft={{
                tickSize: 0,
                tickPadding: 5,
                tickRotation: 0,
                renderTick: tick => {
                  console.log('tick', tick);
                  const { value, format, key, x, y, theme } = tick;

                  // Allow custom formatting
                  let renderedValue = value;
                  if (format !== undefined) {
                    renderedValue = format(value);
                  }

                  const xOffset = 160;

                  return (
                    <g key={key} transform={`translate(${x - xOffset},${y})`}>
                      <text
                        textAnchor="start"
                        alignmentBaseline="middle"
                        style={theme.axis.ticks.text}
                      >
                        {renderedValue}
                      </text>
                    </g>
                  );
                },
              }}
              enableGridX={true}
              gridXValues={[0, 250, 500, 750, 1000, 1250]}
              maxValue={1350}
              enableGridY={false}
              enableLabel={false}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor="inherit:darker(1.6)"
              animate={true}
              motionStiffness={90}
              motionDamping={15}
              theme={{
                axis: {
                  domain: {
                    line: {
                      stroke: '#a9acbe',
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
          </div>
        }

        <Legend
          legends={[
            { title: 'Probands', color: '#1f9bb6' },
            { title: 'Family Members', color: '#e3429b' },
          ]}
        />
      </div>
    );
  }
}

export default Skeleton;
