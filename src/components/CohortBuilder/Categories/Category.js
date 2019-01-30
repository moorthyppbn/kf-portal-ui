import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Column from 'uikit/Column';
import Dropdown from 'uikit/Dropdown';
import { compose, withState } from 'recompose';
import { items } from './mocks';
import { withDropdownMultiPane } from 'uikit/Dropdown';
import Filter from './Filter';
import CategoryRow from './CategoryRow';
import { union } from 'lodash';
import { Container, Options, ItemWrapper } from './ui';

const Title = styled('h3')`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.default}, sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #404c9a;
`;

const CategoryButton = styled(Column)`
  align-items: center;
`;

const Category = ({
  title,
  children,
  color,
  toggleDropdown,
  isDropdownVisible,
  setDropdownVisibility,
  toggleExpanded,
  toggleExpandedDropdown,
  setActiveIndex,
  activeIndex,
  setExpanded,
  showExpanded,
  setAppliedFilters,
  appliedFilters,
}) => (
  <React.Fragment>
    <Dropdown
      {...{
        multiLevel: true,
        onOuterClick: () => {
          setExpanded(false);
          setDropdownVisibility(false);
        },
        isOpen: isDropdownVisible,
        onToggle: toggleDropdown,
        setActiveIndex,
        activeIndex,
        setExpanded,
        showExpanded,
        showArrow: false,
        items: items.map((item, i) => (
          <CategoryRow active={appliedFilters.includes(i)} title={item.name} />
        )),
        expandedItems: items.map((item, i) => (
          <Filter
            onCancel={toggleExpandedDropdown}
            onBack={toggleExpanded}
            onApply={active => {
              toggleExpanded();
              const newAppliedFilters = active
                ? union([i], appliedFilters)
                : appliedFilters.filter(af => af != i);
              setAppliedFilters(newAppliedFilters);
            }}
          >
            {item.expanded}
          </Filter>
        )),
        ContainerComponent: Container,
        OptionsContainerComponent: Options,
        ItemWrapperComponent: ItemWrapper,
      }}
    >
      <CategoryButton>
        {children}
        <Title> {title}</Title>
      </CategoryButton>
    </Dropdown>
  </React.Fragment>
);

Category.propTypes = {
  title: PropTypes.string.isRequired,
  // /color: PropTypes.string.isRequired,
};

export default compose(
  withDropdownMultiPane,
  compose(withState('appliedFilters', 'setAppliedFilters', [])),
)(Category);
