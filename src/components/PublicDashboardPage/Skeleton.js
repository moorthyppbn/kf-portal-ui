import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Chart1 } from './mockData';
import * as V from 'victory';
import { VictoryBar, VictoryStack, VictoryChart, VictoryAxis } from 'victory';

const Skeleton = () => {
  const labels = Chart1.map(d => d.id);
  const probands = Chart1.map(d => d.probands);
  const familyMembers = Chart1.map(d => d.familyMembers);

  return (
    /*
  <div style={{ height: '200px' }}>
    <div style={{ height: '100%', width: '100%' }}>
      <ResponsiveBar
        data={Chart1}
        keys={['probands', 'familyMembers']}
        margin={{
          top: 50,
          right: 130,
          bottom: 50,
          left: 60,
        }}
        margin={{
          left: 250,
        }}
        maxValue={1200}
        padding={0.3}
        layout="horizontal"
        colorBy={node => (node.id === 'probands' ? '#1f9bb6' : '#e3429b')}
        borderColor="inherit:darker(1.6)"
        enableGridX={true}
        enableGridY={false}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="inherit:darker(1.6)"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        axisBottom={{
          orient: 'bottom',
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 0,
          tickPadding: 50,
          tickRotation: 0,
        }}
        legends={[
          {
            dataFrom: 'legendText',
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 0,
            itemsSpacing: 40,
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
      />{' '}
    </div>
  </div>*/
    <div>
      <VictoryChart height={400} width={400} domainPadding={{ x: 30, y: 20 }}>
        <VictoryStack colorScale={['#e3429b', '#1f9bb6']} horizontal>
          <VictoryBar data={Chart1} x="id" y="probands" />
          <VictoryBar data={Chart1} x="id" y="familyMembers" />
        </VictoryStack>
      </VictoryChart>
    </div>
  );
};

export default Skeleton;
