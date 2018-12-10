import React from 'react';
import ReactTable from 'react-table';
import { withTheme } from 'emotion-theming';

import StyleWrapper from './StyleWrapper';

const Table = withTheme(({ data, columns, styles, striped = false }) => (
  <StyleWrapper styles={styles}>
    <ReactTable
      data={data}
      columns={columns}
      sortable={false}
      showPagination={false}
      multiSort={false}
      resizable={false}
      className={true ? '-striped' : ''}
      minRows={1}
    />
  </StyleWrapper>
));

export default Table;
