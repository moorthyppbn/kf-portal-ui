import React from 'react';
import Component from 'react-component-component';

const ChartWrapper = ({ endpoint = '', children }) => (
  <Component
    initialState={{ data: null }}
    didMount={({ setState }) => {
      fetch('http://localhost:3000/barChart')
        .then(res => res.json())
        .then(data => setState({ data: data }))
        .catch(err => console.log('err', err));
    }}
  >
    {({ state }) =>
      state.data ? React.cloneElement(children, { data: state.data }) : <div>no data :(</div>
    }
  </Component>
);

export default ChartWrapper;
