import styled from 'styled-components';

import {$GreyLight, $SecondaryColorLight} from './Variables';

const ModalForm = styled.div`
  z-index: 100;
  position: relative;
  margin-top: 20px;
  padding: 20px;
  width: 500px;
  background: white;
`;

const ModalHeader = styled.div`
  p {
    display: inline-block;
    vertical-align: top;
    margin-right: 20px;
    padding-left: 10px;
    font-size: 24px;
    color: ${$SecondaryColorLight};
  }

  svg {
    display: inline-block;
    cursor: pointer;
    height: 25px;
    width: 25px;
  }

  span {
    &:nth-of-type(1) svg {
      position: absolute;
      right: 20px;
      fill: ${$GreyLight};
    }

    &:nth-of-type(2) svg {
      fill: ${$SecondaryColorLight};
    }
  }
`;

export {
  ModalForm,
  ModalHeader
};
