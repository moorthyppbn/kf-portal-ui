import React, { Component } from 'react';

import CardHeader from 'uikit/Card/CardHeader';
import CardContent from 'uikit/Card/CardContent';
import { CardWrapper, HeaderWrapper } from 'uikit/Card/styles';
import posed, { PoseGroup } from 'react-pose';
import LoadingSpinner from 'uikit/LoadingSpinner';
import TabMenu from './TabMenu';
import IndexDots from './IndexDots';

//const slideDirection = x => x;
const offset = 100;
const duration = 1750 * 4;

const getStartPosition = (selectedTabIndex, tabIndex) => {
  console.log('selected tab', selectedTabIndex, 'tab', tabIndex);
  return selectedTabIndex > tabIndex ? '-100%' : '100%';
};

const AnimatedChild = posed.div({
  enter: { x: 0, transition: { x: { duration: duration } } },
  exit: { x: '-100%', transition: { x: { duration: duration } } },
});

class Multicard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      badgeNumber: null,
      currentTabIndex: 0,
      title: '',
      loading: true,
    };

    this.animatedTabs = [];

    this.setBadge = this.setBadge.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setIndex = this.setIndex.bind(this);
  }

  componentDidMount() {
    this.setTitle();

    console.log('CDM', this.props);
    const tabs = this.props.tabs;
    const animatedTabs = tabs.map((tab, i) => (
      <PoseGroup>
        <AnimatedChild key={i} tabIndex={i}>
          {tab.component({
            setTitle: this.setTitle,
            setBadge: this.setBadge,
            setIndex: this.setIndex,
          })}
        </AnimatedChild>
      </PoseGroup>
    ));

    this.animatedTabs = animatedTabs;
    console.log('animatedTabs', animatedTabs);
    //setInterval(() => this.setState({ currentTabIndex: this.state.currentTabIndex === 0 ? 1 : 0 }), 4000);
    this.setState({ loading: false });
    console.log('state', this.state);
  }

  setBadge(n) {
    if (n !== this.state.badgeNumber) this.setState({ badgeNumber: n });
  }

  setIndex(i) {
    this.setState({ currentTabIndex: i });
  }

  setTitle(title = this.props.tabs[this.state.currentTabIndex].title) {
    this.setState({ title });
  }

  componentDidUpdate(prevProps, prevState) {
    // tab has updated
    if (prevState.currentTabIndex !== this.state.currentTabIndex) {
      this.setTitle();
    }
  }

  render() {
    const { loading, currentTabIndex, title, badgeNumber } = this.state;
    const { tabs, inactive, className, scrollable } = this.props;

    const activeTab = loading ? null : this.animatedTabs[currentTabIndex];

    //console.log('active component', activeTab);
    return (
      <div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <CardWrapper className={className} inactive={inactive}>
            <HeaderWrapper inactive={inactive}>
              <CardHeader title={title} badge={badgeNumber}>
                {!inactive &&
                  tabs.map((tab, i) => (
                    <TabMenu
                      key={i}
                      active={i === currentTabIndex}
                      onClick={() => this.setIndex(i)}
                      title={tab.nav}
                    />
                  ))}
              </CardHeader>
            </HeaderWrapper>
            <CardContent scrollable={scrollable}>{activeTab}</CardContent>
            {inactive ? null : <IndexDots index={currentTabIndex} items={tabs.length} />}
          </CardWrapper>
        )}
      </div>
    );
  }
}

export default Multicard;
