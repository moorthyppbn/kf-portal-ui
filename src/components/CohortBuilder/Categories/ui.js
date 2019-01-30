import styled from 'react-emotion';
import Column from 'uikit/Column';

export const Container = styled(Column)`
  flex: 1;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #d4d6dd;
  border-top: 1px solid ${({ color }) => (color ? color : 'white')};
  position: relative;
  white-space: nowrap;
  z-index: auto;
`;

export const Options = styled('div')`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 100%;
  cursor: pointer;
  text-align: left;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 5.9px 0.1px #bbbbbb;

  > div:not(:last-child) {
    border-bottom: 1px solid #d4d6dd;
  }
`;

export const ItemWrapper = styled('div')`
  display: flex;
  padding: 17px 10px 17px 23px;
  font-size: 12px;
  color: #343434;
  font-weight: 500;
`;
