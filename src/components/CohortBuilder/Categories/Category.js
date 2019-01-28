import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Column from 'uikit/Column';
import Dropdown from 'uikit/Dropdown';
import { items } from './mocks';

const Container = styled(Column)`
  flex: 1;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #d4d6dd;
  border-top: 1px solid ${({ color }) => (color ? color : 'white')};
  position: relative;
  white-space: nowrap;
  z-index: auto;
`;

const Label = styled('div')``;

const Options = styled('div')`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 100%;
  cursor: pointer;
  text-align: left;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 5.9px 0.1px #bbbbbb;

  > div:not(:last-child) {
    border-bottom: 1px solid #d4d6dd;
  }
`;

const ItemWrapper = styled('div')`
  display: flex;
  padding: 17px 10px 17px 23px;
  font-size: 12px;
  color: #343434;
  font-weight: 500;
`;

const Title = styled('h3')`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.default}, sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #404c9a;
`;

const Category = ({ title, color }) => (
  <Dropdown
    items={items.map((item, i) => (
      <div>{item.name}</div>
    ))}
    ContainerComponent={Container}
    OptionsContainerComponent={Options}
    ItemWrapperComponent={ItemWrapper}
    showArrow={false}
  >
    <Title> {title}</Title>
  </Dropdown>
);

Category.propTypes = {
  title: PropTypes.string.isRequired,
  // /color: PropTypes.string.isRequired,
};

export default Category;
