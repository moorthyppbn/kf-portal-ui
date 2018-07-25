import * as React from 'react';
import { compose, lifecycle, withState } from 'recompose';

import { getUser as getGen3User } from 'services/gen3';
import { css } from 'emotion';
import { injectState } from 'freactal';
import { withTheme } from 'emotion-theming';
import CheckIcon from 'react-icons/lib/fa/check-circle';
import { get } from 'lodash';
import Query from '@arranger/components/dist/Query';
import styled from 'react-emotion';
import studiesStack from 'assets/icon-studies-grey.svg';

import { withApi } from 'services/api';
import { LoadingSpinner } from './UserIntegrations';
import Row from 'uikit/Row';
import Column from 'uikit/Column';
import { toGqlString } from 'services/utils';
import ExternalLink from 'uikit/ExternalLink';
import RightChevron from 'icons/DoubleChevronRightIcon';
import { withHistory } from 'services/history';
import { Route, Switch, Redirect } from 'react-router-dom';

const styles = css`
  table {
    border-collapse: collapse;
  }
  span.title {
    font-weight: bold;
    padding: 15px;
  }
`;

const ItemRowContainer = styled(Row)`
  min-height: 60px;
  padding-right: 10%;
  &:not(:last-child) {
    border-bottom: solid 1px ${({ theme }) => theme.borderGrey};
  }
`;

const StudiesIcon = styled(`img`)`
  height: 20px;
`;

const Spinner = () => (
  <Row justifyContent={'center'}>
    <LoadingSpinner width={20} height={20} />
  </Row>
);

const enhance = compose(
  injectState,
  withTheme,
  withState('gen3Key', 'setGen3Key', undefined),
  withState('userDetails', 'setUserDetails', {}),
  withState('loading', 'setLoading', false),
  withApi,
  lifecycle({
    async componentDidMount() {
      const { setUserDetails, api, setLoading } = this.props;
      setLoading(true);
      let userDetails = await getGen3User(api);
      setLoading(false);
      setUserDetails(userDetails);
    },
  }),
);

const sqonForStudy = studyId => ({
  op: 'and',
  content: [
    {
      op: 'in',
      content: {
        field: 'participants.study.external_id',
        value: [studyId],
      },
    },
  ],
});

const Gen3ProjectList = compose(withApi, withTheme, withHistory)(
  ({ projectIds, api, theme, history }) => (
    <Query
      renderError
      api={api}
      projectId={'june_13'}
      name={`gen3ItemQuery`}
      shouldFetch={true}
      query={`
      query (${projectIds.map(id => `$${toGqlString(id)}_sqon: JSON`).join(', ')}){
        file {${projectIds
          .map(
            id => `${toGqlString(id)}: aggregations(filters: ${`$${toGqlString(id)}_sqon`}) {
              participants__study__name {
                buckets {
                  key
                }
              }
            }
          `,
          )
          .join('')}
        }
      }
    `}
      variables={projectIds.reduce(
        (acc, id) => ({
          ...acc,
          [`${toGqlString(id)}_sqon`]: sqonForStudy(id),
        }),
        {},
      )}
      render={({ loading, data }) => {
        const aggregations = get(data, 'file');
        return aggregations ? (
          projectIds
            .filter(id =>
              get(aggregations, `${toGqlString(id)}.participants__study__name.buckets.length`),
            )
            .map(id => {
              const studyNameBuckets = get(
                aggregations,
                `${toGqlString(id)}.participants__study__name.buckets`,
              );
              const studyName = studyNameBuckets[0];
              const sqon = sqonForStudy(id);
              return (
                <ItemRowContainer>
                  <Column justifyContent="center" p={20}>
                    <StudiesIcon src={studiesStack} />
                  </Column>
                  <Column flex={1} justifyContent="center" pr={10}>
                    <span>
                      <strong>{studyName ? `${studyName.key} ` : ''}</strong>({id})
                    </span>
                  </Column>
                  <Column justifyContent="center">
                    <ExternalLink hasExternalIcon={false}>
                      <span
                        onClick={() =>
                          history.push(`/search/file?sqon=${encodeURI(JSON.stringify(sqon))}`)
                        }
                      >
                        View data files <RightChevron width={10} fill={theme.primary} />
                      </span>
                    </ExternalLink>
                  </Column>
                </ItemRowContainer>
              );
            })
        ) : (
          <Spinner />
        );
      }}
    />
  ),
);

const Gen3ConnectionDetails = ({
  state,
  effects,
  theme,
  userDetails,
  setUserDetails,
  loading,
  ...props
}) => (
  <div css={styles}>
    {loading ? (
      <Spinner />
    ) : (
      <Column>
        <Row>
          <div
            css={`
              color: ${theme.active};
              padding: 10px;
            `}
          >
            <CheckIcon size={20} />
            <span> Connected account: {userDetails.name}</span>
          </div>
        </Row>
        <Row>
          <span className="title">
            {' '}
            You can download and analyze controlled data from the following studies:
          </span>
        </Row>
        <Column pl={15}>
          {userDetails.projects ? (
            <Gen3ProjectList projectIds={Object.keys(userDetails.projects)} />
          ) : (
            <tr />
          )}
        </Column>
      </Column>
    )}
  </div>
);

export default enhance(Gen3ConnectionDetails);
