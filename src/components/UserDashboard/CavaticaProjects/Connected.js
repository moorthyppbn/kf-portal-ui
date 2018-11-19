import React, { Fragment } from 'react';
import { compose, lifecycle, withState } from 'recompose';

import { injectState } from 'freactal';
import { withTheme } from 'emotion-theming';

import LoadingSpinner from 'uikit/LoadingSpinner';
import Column from 'uikit/Column';
import ExternalLink from 'uikit/ExternalLink';
import { getProjects as getCavaticaProjects, getMembers } from 'services/cavatica';

import {
  PromptMessageContainer,
  PromptMessageHeading,
  PromptMessageContent,
} from 'uikit/PromptMessage';
import { withApi } from 'services/api';
import Info from '../Info';
import ProjectList from './ProjectList';

const enhance = compose(
  injectState,
  withTheme,
  withState('projectList', 'setProjectList', []),
  withState('loading', 'setLoading', false),
  withApi,
  lifecycle({
    async componentDidMount() {
      const { setProjectList, setLoading } = this.props;
      setLoading(true);
      getCavaticaProjects()
        .then(projects => {
          getMembers({ project: p.id }))
        .then(m => ({ ...p, members: members.items.length }))
        .then(p => {
          setProjectList(mergedProjects);
          setLoading(false);
        });
      
    }),
  }),
);

const Connected = ({ state, effects, theme, loading, projectList, setBadge, ...props }) => {
  console.log('project list', projectList);
  setBadge(projectList ? projectList.length : null);

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Column>
          {projectList && projectList.length > 0 ? (
            <ProjectList projects={projectList} />
          ) : (
            <Column>
              <PromptMessageContainer mb={0} width={'100%'}>
                <PromptMessageHeading mb={10}>
                  You are connected to CAVATICA, but you don’t have any projects yet.
                </PromptMessageHeading>
                <PromptMessageContent>
                  <ul>
                    <li>
                      <ExternalLink
                        href={'https://kidsfirstdrc.org/support/studies-and-access/'}
                        hasExternalIcon={false}
                      >
                        Create a CAVATICA Project
                      </ExternalLink>{' '}
                      easily from the portal.
                    </li>
                    <li>
                      Or join one of the
                      <ExternalLink
                        href={'https://cavatica.sbgenomics.com/public/controlled-projects#q'}
                        hasExternalIcon={false}
                      >
                        {' '}
                        CAVATICA public controlled projects
                      </ExternalLink>
                    </li>
                  </ul>
                </PromptMessageContent>
              </PromptMessageContainer>
              <Info
                link={{
                  url:
                    'https://kidsfirstdrc.org/support/studies-and-access/#applying-for-data-access',
                  text: 'applying for data access.',
                }}
              />
            </Column>
          )}
        </Column>
      )}
    </div>
  );
};

export default enhance(Connected);