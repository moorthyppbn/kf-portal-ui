import React from 'react';
import styled from 'react-emotion';
import Pie from 'chartkit/components/Pie';

import { demographicPiesMock, topDiagnosesBarMock } from './mock';
import Card from 'uikit/Card';
import { CardWrapper } from 'uikit/Card/styles';
import { Col, Row } from 'react-grid-system';

import theme from 'theme/defaultTheme';
import HorizontalBar from 'chartkit/components/HorizontalBar';

const participantTooltip = data => {
  const participants = data.familyMembers + data.probands;
  return `${participants.toLocaleString()} Participant${participants > 1 ? 's' : ''}`;
};


const CardSlot = styled(Card)`
  height: 305px;
`;

const CardSlotPies = styled(CardWrapper)`
    height: 305px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 10px;
`;

const LongCard = styled(Card)`
  height: 100%;
`;

const md = 4;
const lg = 4;

const Summary = () => (
  <Row nogutter>
    <Col sm={12} md={9} lg={9}>
      <Row nogutter>
        <Col sm={12} md={md} lg={lg}>
          <CardSlot title="Overall Survival">
          </CardSlot>
        </Col>
        <Col sm={12} md={md} lg={lg}>
          <CardSlot title="Studies">
          </CardSlot>
        </Col>
        <Col sm={12} md={md} lg={lg}>
          <CardSlot title="Most Frequent Diagnoses">
            <HorizontalBar style={{maxWidth: '100px'}}
              data={topDiagnosesBarMock}
              indexBy="label"
              keys={['probands', 'familyMembers']}
              tooltipFormatter={participantTooltip}
              sortByValue={true}
              tickInterval={4}
              colors={[theme.chartColors.blue, theme.chartColors.purple]}
              xTickTextLength={28}
              legends={[
                { title: 'Probands', color: theme.chartColors.blue },
                { title: 'Family Members', color: theme.chartColors.purple },
              ]}
              padding={0.4}
            />
          </CardSlot>
        </Col>
        <Col sm={12} md={md} lg={lg}>
          <CardSlotPies>
            <Pie style={{height: '42%', width: '50%', marginBottom: '10px', marginTop: '5px'}} title={"Gender"} data={demographicPiesMock.gender} colors={['#F79122','#FFFFFF']} />
            <Pie style={{height: '42%', width: '50%', marginBottom: '10px', marginTop: '5px'}} title={"Ethnicity"} data={demographicPiesMock.ethnicity} colors={['#2B388F','#FFFFFF']} />
            <Pie style={{height: '42%', width: '50%'}} title={"Race"} data={demographicPiesMock.race} colors={['#A6278F','#FFFFFF']} />
            <Pie style={{height: '42%', width: '50%'}} title={"Family Composition"} data={demographicPiesMock.familyComposition} colors={['#00ACEB','#FFFFFF']} />
          </CardSlotPies>
        </Col>
        <Col sm={12} md={md} lg={lg}>
          <CardSlot title="File Breakdown">
          </CardSlot>
        </Col>
        <Col sm={12} md={md} lg={lg}>
          <CardSlot title="Age at Diagnosis">
          </CardSlot>
        </Col>
      </Row>
    </Col>
    <Col sm={12} md={3} lg={3}>
      <LongCard title="Phenotypes">Long Card</LongCard>
    </Col>
  </Row>
);

export default Summary;
