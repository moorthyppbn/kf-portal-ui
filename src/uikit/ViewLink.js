import React from 'react';
import styled from 'react-emotion';

const Link = styled('div')`
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 500;
  color: #cc3399;
  border-bottom: ${({ active }) => (active ? '1px solid #cc3399' : null)};

  &:hover {
    cursor: pointer;
  }
`;

const ViewLink = ({ children, icon, onClick, active }) => (
  <Link active={active} onClick={onClick}>
    {children}
  </Link>
);

export default ViewLink;
