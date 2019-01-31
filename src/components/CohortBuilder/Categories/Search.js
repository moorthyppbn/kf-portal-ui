import React from 'react';
import styled from 'react-emotion';
import { compose, withState } from 'recompose';
import Dropdown, { withDropdownState } from 'uikit/Dropdown';
import Column from 'uikit/Column';
import { FilterInput } from 'uikit/Input';
import SearchFilter from './SearchFilter';
import { Container, Options } from './ui';

const SearchContainer = styled(Column)`
  justify-content: center;
  align-items: center;
  border-top: 2px solid blue;
  border-right: 1px solid #d4d6dd;
`;

const ContainerComponent = styled(Container)`
  border-radius: 10px;
  height: calc(100%- 10px);
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
}) => {
  const searchInputRef = React.createRef();

  const closeSearch = () => {
    console.log('close', searchInputRef);
    searchInputRef.current.focus();
    setDropdownVisibility(false);
  }

  return (
    <SearchContainer>
      <InputWrapper>
        <Dropdown
          items={[
            <SearchFilter
              onCancel={closeSearch}
              onApply={() => console.log('apply')}
            />,
          ]}
          showArrow={false}
          isOpen={isDropdownVisible}
          ContainerComponent={ContainerComponent}
          OptionsContainerComponent={Options}
          ItemWrapperComponent={ItemWrapper}
          onOuterClick={closeSearch}
        >
          <SearchInput
            ref={this.searchInputRef}
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
};

export default compose(
  withDropdownState,
  withState('searchValue', 'setSearchValue', ''),
)(Search);
