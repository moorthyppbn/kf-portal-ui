import React from 'react';
import styled from 'react-emotion';
import Search from './Search';
import Category from './Category';
import Row from 'uikit/Row';
import QuickFilterIcon from 'icons/QuickFilterIcon';
import StudyIcon from 'icons/StudyIcon';
import BiospecimenIcon from 'icons/BiospecimenIcon';
import ClinicalIcon from 'icons/ClinicalIcon';
import UploadIcon from 'icons/UploadIcon';

const Container = styled(Row)`
  height: 72px;
  width: 100%;
  border-left: 1px solid #d4d6dd;
  border-bottom: 1px solid #d4d6dd;
  background-color: white;
`;

const Categories = () => (
  <Container>
    <Search />
    <Category title="Quick Filters" color="">
      <QuickFilterIcon fill="#404c9a" />
    </Category>
    <Category title="Study" color={''}>
      <StudyIcon fill="#dd1f2a" />
    </Category>
    <Category title="Demographic" color={''} />
    <Category title="Clinical" color={''}>
      <ClinicalIcon fill="#0caceb" />
    </Category>
    <Category title="Biospecimens" color={''}>
      <BiospecimenIcon fill="#f79122" />
    </Category>
    <Category title="Available Data" color={''} />
    <Category title="Upload IDs" color={''}>
      <UploadIcon fill="#edb500" />
    </Category>
  </Container>
);

export default Categories;
