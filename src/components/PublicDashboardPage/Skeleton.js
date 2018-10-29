import React from 'react';
import { Chart1, nivoSample } from './mockData';
import HorizontalBar from './Charts/HorizontalBar';
import { ResponsiveBar } from '@nivo/bar';

import Component from 'react-component-component';
import ChartWrapper from './ChartWrapper';

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
    <ChartWrapper>
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
    </ChartWrapper>
  </div>
);

export default Skeleton;
