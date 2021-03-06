import React from 'react';
import styled from 'react-emotion';

import Row from 'uikit/Row';
import Column from 'uikit/Column';
import ExternalLink from 'uikit/ExternalLink';
import ProgressBar from 'chartkit/components/ProgressBar';

export const StudyCol = styled(Column)`
  font-family: ${({ theme }) => theme.fonts.details};
  padding: 10px 10px 10px 0;
`;

const Name = styled('div')`
  color: #343434;
  font-size: 14px;
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.details};
  margin-bottom: 5px;
`;

const StudyCount = styled('div')`
  font-family: ${({ theme }) => theme.fonts.details};
  font-size: 13px;
  color: #74757d;
`;

const Codes = styled(StudyCount)`
  font-family: ${({ theme }) => theme.fonts.details};
  font-size: 12px;
  font-weight: 600;
  color: #343434;
  margin-bottom: 5px;
`;

const NumberLink = styled(ExternalLink)`
  text-decoration: underline;
`;

const Study = ({
  name,
  studyId,
  consentCodes = [],
  total,
  authorized,
  onStudyAuthorizedClick = () => {},
  onStudyTotalClick = () => {},
}) => (
  <StudyCol>
    <Row justifyContent="space-between" pl={0}>
      <Name>{name}</Name>
      <StudyCount>
        Authorized:{' '}
        <NumberLink
          onClick={() => {
            onStudyAuthorizedClick(studyId, 'NumberLink');
          }}
          hasExternalIcon={false}
        >
          {authorized.toLocaleString()}
        </NumberLink>
        {' / '}
        <NumberLink onClick={onStudyTotalClick} hasExternalIcon={false}>
          {total.toLocaleString()}
        </NumberLink>{' '}
        files
      </StudyCount>
    </Row>
    <Codes>Consent Codes: {consentCodes.join(', ')}</Codes>
    <ProgressBar
      analyticsTracking={{ category: `Authorized Studies`, label: `studyId: ${studyId}` }}
      onClick={() => {
        onStudyAuthorizedClick(studyId, 'ProgressBar');
      }}
      percent={(authorized / total) * 100}
      height={10}
    />
  </StudyCol>
);

export default Study;
