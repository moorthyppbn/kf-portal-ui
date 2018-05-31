import * as React from 'react';
import styled from 'react-emotion';
import { injectState } from 'freactal';
import { compose } from 'recompose';

import { ModalFooter } from '../Modal/index.js';
import { AdvancedFacetView } from '@arranger/components/dist/Arranger';
import { provideLocalSqon } from 'stateProviders';

const enhance = compose(provideLocalSqon, injectState);

const AfvContainer = styled('div')`
  flex: 1;
  display: flex;
  position: relative;

  * {
    box-sizing: border-box;
  }

  .advancedFacetViewWrapper {
    padding: 0px;
  }
  .advancedFacetViewWrapper .facetViewWrapper .treeViewPanel {
    border-bottom: none;
  }
  .afvModalContent {
    position: absolute;
    width: 100%;
  }

  .afvStatContainer .statContainer {
    background: none;
    padding: none;
    border: none;
  }

  .afvStatContainer .statContainer .stat {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

class AdvancedFacetViewModalContent extends React.Component {
  onOverlayClick = e => {
    const { closeModal = () => {} } = this.props;
    if (e.target === this.overLay) {
      closeModal();
    }
  };

  render() {
    const {
      effects,
      state: { localSqon },
      closeModal = () => {},
      onSqonSubmit = () => {},
      ...props
    } = this.props;
    return (
      <React.Fragment>
        <AfvContainer className={`afvModalContent`}>
          <AdvancedFacetView
            {...props}
            sqon={localSqon}
            onSqonChange={({ sqon }) => effects.setAdvancedFacetSqon(sqon)}
          />
        </AfvContainer>
        <ModalFooter
          {...{
            unsetModal: closeModal,
            handleSubmit: e => onSqonSubmit({ sqon: localSqon }),
            submitText: 'View Results',
          }}
        />
      </React.Fragment>
    );
  }
}

export default enhance(AdvancedFacetViewModalContent);
