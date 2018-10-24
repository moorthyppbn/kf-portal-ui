import React from 'react';
import { Chart1 } from './mockData';
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

/**
 * Truncating text and label padding will have to be set for each chart
 * Text is SVG and therefore can't be aligned using textAlign
 * We have to use a combination of textAnchor and padding
 * Little too fuzzy?
 */

const truncCutoff = 14;
const trunc = text => (text.length > truncCutoff ? text.substring(0, truncCutoff) + '...' : text);

const data = Chart1.map(d => {
  return { ...d, id: trunc(d.id) };
});

const Skeleton = () => {
  return (
    <div>
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
          y={340}
          x={480}
          centerTitle
          data={[
            { name: '# Probands', symbol: { fill: '#1f9bb6', type: 'square' } },
            { name: '# Family Members', symbol: { fill: '#e3429b', type: 'square' } },
          ]}
        />
      </VictoryChart>
    </div>
  );
};

export default Skeleton;
