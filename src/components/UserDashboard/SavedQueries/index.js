import React from 'react';
import styled from 'react-emotion';
import { compose, lifecycle } from 'recompose';
import { injectState } from 'freactal';

import provideSavedQueries from 'stateProviders/provideSavedQueries';

import { Box, Link } from 'uikit/Core';
import Column from 'uikit/Column';
import { PromptMessageContainer, PromptMessageContent } from '../styles';

import { CardContentSpinner } from '../styles';

import { DashboardCard } from '../styles';

import QueryBlock from './QueryBlock';
import CardHeader from 'uikit/Card/CardHeader';

const Container = styled(Column)`
  margin: 0 0 15px 0;
  flex: 3;
  border-top: 0;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const FileRepositoryLink = styled(Link)`
  color: ${({ theme }) => theme.primary};
`;

export const MySavedQueries = compose(
  provideSavedQueries,
  injectState,
  lifecycle({
    componentDidMount() {
      const { api } = this.props;
      this.props.effects.getQueries({ egoId: this.props.loggedInUser.egoId, api });
    },
  }),
)(
  ({
    state: { queries, exampleQueries, loadingQueries, deletingIds },
    effects: { getQueries, deleteQuery },
    api,
    theme,
  }) => {
    const Header = <CardHeader title="Saved Queries" badge={queries.length} />;
    return (
      <DashboardCard Header={Header} scrollable>
        {loadingQueries ? (
          <CardContentSpinner />
        ) : (
          <Container>
            {!queries.length ? (
              <Box mt={2}>
                <PromptMessageContainer info mb={'8px'}>
                  <PromptMessageContent>
                    Explore the{' '}
                    <FileRepositoryLink to="/search/file">File Repository</FileRepositoryLink> to
                    save queries!
                  </PromptMessageContent>
                </PromptMessageContainer>
                <Box mt={2} mb={2}>
                  {exampleQueries.map(q => {
                    q.link = `/search${q.content.longUrl.split('/search')[1]}`;
                    return (
                      <QueryBlock
                        key={q.id}
                        query={q}
                        inactive={deletingIds.includes(q.id)}
                        savedTime={false}
                      />
                    );
                  })}
                </Box>
              </Box>
            ) : (
              <Box mt={2} mb={2}>
                {queries
                  .filter(q => q.alias && q.content.Files)
                  .map(q => ({
                    ...q,
                    date: Number(new Date(q.creationDate)),
                    link: `/search${q.content.longUrl.split('/search')[1]}`,
                  }))
                  .slice()
                  .sort((a, b) => b.date - a.date)
                  .map(q => (
                    <QueryBlock key={q.id} query={q} inactive={deletingIds.includes(q.id)} />
                  ))}
              </Box>
            )}
          </Container>
        )}
      </DashboardCard>
    );
  },
);
export default MySavedQueries;
