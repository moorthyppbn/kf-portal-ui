import { Component } from 'react';
import { WithStore } from 'pure-react-carousel';

class TabProvider extends Component {
  componentDidUpdate(prevProps) {
    // console.log('prevprops', prevProps, this.props);

    const { carouselStore, currentTabIndex } = this.props;
    if (prevProps.currentTabIndex !== currentTabIndex)
      carouselStore.setStoreState({ currentSlide: currentTabIndex });
  }

  render() {
    return null;
  }
}

export default WithStore(TabProvider);
