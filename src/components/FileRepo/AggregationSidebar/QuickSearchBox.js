import React from 'react';
import { compose } from 'recompose';
import { withTheme } from 'emotion-theming';
import Spinner from 'react-spinkit';

import { QuickSearch, AggsWrapper } from '@arranger/components/dist/Arranger';

import Row from 'uikit/Row';
import { FilterInput } from 'uikit/Input';
import UploadIdsButton from './UploadIdsButton';

const QuickSearchBox = compose(withTheme)(
  ({
    header,
    theme,
    setSQON,
    translateSQONValue,
    effects,
    state,
    graphqlField,
    uploadableFields = null,
    ...props
  }) => (
    <AggsWrapper displayName={header}>
      <QuickSearch
        {...{ ...props, setSQON, translateSQONValue }}
        InputComponent={FilterInput}
        placeholder="Enter Identifiers"
        LoadingIcon={
          <Spinner fadeIn="none" name="circle" color="#a9adc0" style={{ width: 15, height: 15 }} />
        }
      />
      <Row justifyContent="flex-end">
        <UploadIdsButton
          {...{ theme, effects, state, setSQON, uploadableFields, graphqlField, ...props }}
        />
      </Row>
    </AggsWrapper>
  ),
);

export default QuickSearchBox;
