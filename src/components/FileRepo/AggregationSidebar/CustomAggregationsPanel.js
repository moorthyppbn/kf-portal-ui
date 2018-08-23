import React from 'react';
import { compose } from 'recompose';
import { injectState } from 'freactal';
import { withTheme } from 'emotion-theming';
import Component from 'react-component-component';
import styled from 'react-emotion';

import { AggregationsList } from '@arranger/components/dist/Arranger';
import Query from '@arranger/components/dist/Query';

import { CLINICAL_FILTERS, FILE_FILTERS } from './aggsConfig';
import { withApi } from 'services/api';
import Row from 'uikit/Row';
import Column from 'uikit/Column';
import { Span } from 'uikit/Core';

const TabsRow = styled(({ className, ...props }) => (
  <Row flexStrink={0} {...props} className={`${className} tabs-titles`} />
))`
  padding-left: 10px;
  border-bottom: solid 3px ${({ theme }) => theme.primaryHover};
  text-align: center;
  font-size: 12px;
`;
const Tab = styled(({ className, selected, ...props }) => (
  <Row
    {...props}
    center
    width={'100%'}
    className={`tabs-title ${className} ${selected ? 'active-tab' : ''}`}
  />
))`
  padding: 5px;
`;

const Tabs = ({ selectedTab, onTabSelect, options }) => (
  <TabsRow>
    {options.map(({ id, display }) => (
      <Tab onClick={() => onTabSelect({ id })} selected={selectedTab === id}>
        <Span>{display}</Span>
      </Tab>
    ))}
  </TabsRow>
);

export default compose(injectState, withTheme, withApi)(
  ({
    api,
    sqon,
    containerRef,
    setSQON = () => {},
    onValueChange = () => {},
    projectId,
    graphqlField,
  }) => (
    <Query
      renderError
      shouldFetch={true}
      api={api}
      projectId={projectId}
      name={`aggsIntrospection`}
      query={`
        query dataTypes {
          __schema {
            types {
              name
              fields {
                name
                type {
                  name
                }
              }
            }
          }
        }
      `}
      render={({ loading, data }) => {
        const containerRef = React.createRef();
        if (data) {
          const { __schema: { types } } = data;
          const gqlAggregationFields = types.find(
            ({ name }) => name === `${graphqlField}Aggregations`,
          ).fields;
          const extendAggsConfig = config =>
            config.filter(({ show }) => show).map(config => ({
              ...config,
              type: gqlAggregationFields.find(fileAggField => config.field === fileAggField.name)
                .type.name,
            }));
          const extendedClinicalFilterConfigs = extendAggsConfig(CLINICAL_FILTERS);
          const extendedFileFilterConfigs = extendAggsConfig(FILE_FILTERS);
          return (
            <Component initialState={{ selectedTab: 'CLINICAL' }}>
              {({ state: { selectedTab }, setState }) => {
                const aggConfigToRender =
                  selectedTab === 'FILE'
                    ? extendedFileFilterConfigs
                    : extendedClinicalFilterConfigs;
                return (
                  <Column>
                    <Tabs
                      selectedTab={selectedTab}
                      options={[
                        { id: 'CLINICAL', display: 'Clinical Filters' },
                        { id: 'FILE', display: 'File Filters' },
                      ]}
                      onTabSelect={({ id }) => setState({ selectedTab: id })}
                    />
                    <Column scrollY innerRef={containerRef}>
                      <AggregationsList
                        {...{
                          onValueChange: onValueChange,
                          setSQON: setSQON,
                          sqon,
                          projectId,
                          graphqlField,
                          api,
                          containerRef,
                          aggs: aggConfigToRender,
                          debounceTime: 300,
                        }}
                      />
                    </Column>
                  </Column>
                );
              }}
            </Component>
          );
        } else {
          return null;
        }
      }}
    />
  ),
);