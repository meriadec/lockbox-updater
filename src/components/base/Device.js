import React from "react";
import styled from "styled-components";

import NanoS from "../../icons/interactions/NanoS";

export default ({ label, ...props }) => (
  <DeviceContainer>
    <NanoS width={500} {...props} />
    <Label>{label}</Label>
  </DeviceContainer>
);

const DeviceContainer = styled.div`
  background-color: hsla(0, 0%, 100%, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.div`
  opacity: 0.7;
  font-weight: 600;
  margin-top: 40px;
  padding: 0 20px;
  text-align: center;
`;
