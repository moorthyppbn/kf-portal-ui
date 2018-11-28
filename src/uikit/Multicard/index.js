import React, { Component } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import CardHeader from 'uikit/Card/CardHeader';
import CardContent from 'uikit/Card/CardContent';
import { CardWrapper, HeaderWrapper } from 'uikit/Card/styles';
import LoadingSpinner from 'uikit/LoadingSpinner';
import TabMenu from './TabMenu';
import IndexDots from './IndexDots';
import TabProvider from './TabProvider';

class Multicard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      badgeNumber: null,
      currentTabIndex: 0,
      title: '',
    };

    this.setBadge = this.setBadge.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setIndex = this.setIndex.bind(this);
  }

  componentDidMount() {
    this.setTitle();
    /*setInterval(
      () => this.setState({ currentTabIndex: this.state.currentTabIndex === 0 ? 1 : 0 }),
      3000,
    );*/
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
            <CarouselProvider
              naturalSlideWidth={100}
              naturalSlideHeight={50}
              totalSlides={tabs.length}
            >
              <TabProvider currentTabIndex={currentTabIndex} />
              <CardContent scrollable={scrollable}>
                <Slider>
                  {tabs &&
                    tabs.map((tab, i) => (
                      <Slide index={0}>
                        {tab.component({
                          setTitle: this.setTitle,
                          setBadge: this.setBadge,
                          setIndex: this.setIndex,
                        })}
                      </Slide>
                    ))}
                </Slider>
              </CardContent>
            </CarouselProvider>
            {inactive ? null : <IndexDots index={currentTabIndex} items={tabs.length} />}
          </CardWrapper>
        )}
      </div>
    );
  }
}

export default Multicard;
