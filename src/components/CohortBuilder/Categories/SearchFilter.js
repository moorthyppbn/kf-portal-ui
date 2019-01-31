import React from 'react';
import Filter from './Filter';

const SearchFilter = ({ onCancel, onApply }) => (
  <Filter {...{ onCancel, onApply }}>Search Filter</Filter>
);

export default SearchFilter;
