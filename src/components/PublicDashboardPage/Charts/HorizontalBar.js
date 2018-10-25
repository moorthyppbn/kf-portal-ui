import React from 'react';
import {
  VictoryBar,
  VictoryStack,
  VictoryChart,
  VictoryAxis,
  VictoryLegend,
  VictoryPortal,
  LineSegment,
} from 'victory';

const HorizontalBar = ({ theme, data }) => (
  <VictoryChart theme={theme} padding={{ left: 220, right: 20 }} domainPadding={20}>
    <VictoryAxis
      crossAxis={false}
      domain={{ x: [0, 1250] }}
      tickValues={[0, 250, 500, 750, 1000, 1250]}
      padding={50}
      axisComponent={
        <VictoryPortal>
          <LineSegment />
        </VictoryPortal>
      }
    />
    <VictoryStack colorScale={['#1f9bb6', '#e3429b']} horizontal>
      <VictoryBar barWidth={16} data={data} x="id" y="probands" />
      <VictoryBar barWidth={16} data={data} x="id" y="familyMembers" />
    </VictoryStack>

    <VictoryAxis dependentAxis />

    <VictoryLegend
      y={280}
      x={220}
      centerTitle
      data={[
        { name: '# Probands', symbol: { fill: '#1f9bb6', type: 'square' } },
        { name: '# Family Members', symbol: { fill: '#e3429b', type: 'square' } },
      ]}
    />
  </VictoryChart>
);

export default HorizontalBar;
