import React from "react";
import styled, { keyframes } from "styled-components";
import { FaSpinner } from "react-icons/fa";

const rotating = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Rotating = styled.div`
  font-size: 16px;
  display: inline-flex;
  padding: 5px 0;
  animation: 750ms linear ${rotating} infinite;
`;

export default () => (
  <Rotating>
    <FaSpinner />
  </Rotating>
);
