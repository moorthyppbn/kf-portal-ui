import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
import styled from 'react-emotion';

const CardBlock = styled('div')``;

const spinner = (
  <Spinner
    fadeIn="none"
    name="circle"
    color="#a9adc0"
    style={{
      width: 30,
      height: 30,
      margin: 'auto',
      marginBottom: 20,
    }}
  />
);

const Card = (title = null, isLoading = false, children = null, styles = {}) =>
  isLoading ? spinner : <CardBlock>{children}</CardBlock>;

export default Card;

Card.propTypes = {
  title: PropTypes.string,
  isLoading: PropTypes.bool,
  children: PropTypes.children,
  styles: PropTypes.object,
};
