import React from 'react';
import styled from 'react-emotion';
import { compose, withState } from 'recompose';
import Dropdown, { withDropdownState } from 'uikit/Dropdown';
import Column from 'uikit/Column';
import { FilterInput } from 'uikit/Input';
import SearchFilter from './SearchFilter';
import { Container, Options } from './ui';

const SearchContainer = styled(Column)`
  // SAME AS CONTAINER in UI
  justify-content: center;
  align-items: center;
  border-top: 2px solid blue;
  border-right: 1px solid #d4d6dd;
`;

const SearchInput = styled(FilterInput)`
  width: 100%;
`;

const ItemWrapper = styled('div')`
  width: 100%;
`;

const InputWrapper = styled('div')`
  position: relative;
  width: 315px;
  margin: 0 15px;
`;

const Search = ({
  searchValue,
  setSearchValue,
  toggleDropdown,
  setDropdownVisibility,
  isDropdownVisible,
}) => (
  <SearchContainer>
    <InputWrapper>
      <Dropdown
        items={[<SearchFilter />]}
        showArrow={false}
        isOpen={isDropdownVisible}
        ContainerComponent={Container}
        OptionsContainerComponent={Options}
        ItemWrapperComponent={ItemWrapper}
        onOuterClick={() => setDropdownVisibility(false)}
      >
        <SearchInput
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          placeholder="Search all filters"
          onFocus={toggleDropdown}
          onClearInput={() => setDropdownVisibility(false)}
        />
      </Dropdown>
    </InputWrapper>
  </SearchContainer>
);

export default compose(
  withDropdownState,
  withState('searchValue', 'setSearchValue', ''),
)(Search);
