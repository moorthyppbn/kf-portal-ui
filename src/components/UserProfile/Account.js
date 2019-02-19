import * as React from 'react';
import { compose, withState } from 'recompose';
import { Trans } from 'react-i18next';
import { injectState } from 'freactal';

import { CardHeader } from './ui';
import UserIntegrations from './UserIntegrations';
import IntegrationTable from './UserIntegrations/IntegrationTable';
import Gen3Integration from './UserIntegrations/Items/Gen3Integration';
import DcfIntegration from './UserIntegrations/Items/DcfIntegration';
import CavaticaIntegration from './UserIntegrations/Items/CavaticaIntegration';
import ConnectedWithBadge from './ConnectedWithBadge';

import { Box } from 'uikit/Core';
import Row from 'uikit/Row';
import Column from 'uikit/Column';
import Input from 'uikit/Input';

import ExternalLink from 'uikit/ExternalLink';
import { Span, Paragraph, Div } from 'uikit/Core';
import gen3Logo from 'assets/logo-gen3.svg';
import { cavaticaWebRoot, gen3WebRoot } from 'common/injectGlobals';

const SettingsSection = x => <Column justifyContent="stretch" w="100%" pb={4} {...x} />;

export default compose(
  injectState,
  withState('mode', 'setMode', 'account'),
)(({ profile, submit, mode, setMode, state: { loginProvider } }) => (
  <Box style={{ maxWidth: 1050 }} pr={4} pl={0} pt="8px">
    <SettingsSection>
      <CardHeader mb="43px">
        <Trans>Settings</Trans>
      </CardHeader>
      <Column>
        Email Address:
        <Row alignItems="center" mt={2}>
          <Input disabled value={profile.email} />
          <Box ml={3}>
            <ConnectedWithBadge provider={loginProvider} />
          </Box>
        </Row>
      </Column>
    </SettingsSection>

    <SettingsSection>
      <CardHeader mt="22px" mb="31px">
        <Trans>Data Repository Integrations</Trans>
      </CardHeader>

      <IntegrationTable>
        <Gen3Integration />
        <DcfIntegration />
      </IntegrationTable>
    </SettingsSection>

    <SettingsSection>
      <CardHeader mt="22px" mb="31px">
        <Trans>Application Integrations</Trans>
      </CardHeader>

      <IntegrationTable>
        <CavaticaIntegration />
      </IntegrationTable>
    </SettingsSection>
  </Box>
));
