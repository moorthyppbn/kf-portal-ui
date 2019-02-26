import React from 'react';
import styled from 'react-emotion';
import { omit } from 'lodash';
import { memoize } from 'lodash';
import AdvancedSqonBuilder from '@arranger/components/dist/AdvancedSqonBuilder';
import ExtendedMappingProvider from '@arranger/components/dist/utils/ExtendedMappingProvider';
import { withApi } from 'services/api';
import { arrangerProjectId } from 'common/injectGlobals';
import { FieldFilterContainer, ARRANGER_API_PARTICIPANT_INDEX_NAME } from '../common';

const extendedMappingToDisplayNameMap = memoize(extendedMapping =>
  extendedMapping.reduce((acc, { field, displayName }) => {
    acc[field] = displayName;
    return acc;
  }, {}),
);

const SqonBuilderContainer = styled('div')`
  > .sqonBuilder .sqonEntry .actionButtonsContainer {
    box-sizing: border-box;
  }
`;

const StyledFieldFilterContainer = styled(FieldFilterContainer)`
  left: auto;
  right: 0px;
`;

/**
 * this component should mimic the AdvancedSqonBuilder's API directly
 **/
const SqonBuilder = withApi(({ api, ...rest }) => {
  const onSqonRemoveClick = ({ indexToRemove, dependentIndices }) => {
    if (dependentIndices.length) {
      // temporary demo until design is available
      return window.confirm(
        `
Are you sure you want to remove query #${indexToRemove} ? 
The queries ${dependentIndices.map(i => `#${i}`).join(', ')} depend on it`,
      )
        ? Promise.resolve()
        : Promise.reject();
    } else {
      return Promise.resolve();
    }
  };
  return (
    <SqonBuilderContainer>
      <ExtendedMappingProvider
        api={api}
        projectId={arrangerProjectId}
        graphqlField={ARRANGER_API_PARTICIPANT_INDEX_NAME}
        useCache={true}
      >
        {({ loading, extendedMapping }) =>
          loading ? (
            'loading'
          ) : (
            <AdvancedSqonBuilder
              api={api}
              arrangerProjectId={arrangerProjectId}
              arrangerProjectIndex={ARRANGER_API_PARTICIPANT_INDEX_NAME}
              getSqonDeleteConfirmation={onSqonRemoveClick}
              FieldOpModifierContainer={props => (
                <StyledFieldFilterContainer showHeader={false} {...props} />
              )}
              fieldDisplayNameMap={extendedMappingToDisplayNameMap(extendedMapping)}
              {...rest}
            />
          )
        }
      </ExtendedMappingProvider>
    </SqonBuilderContainer>
  );
});

SqonBuilder.propTypes = omit(AdvancedSqonBuilder.propTypes, [
  'api',
  'arrangerProjectId',
  'arrangerProjectIndex',
  'getSqonDeleteConfirmation',
  'fieldDisplayNameMap',
]);

export default SqonBuilder;