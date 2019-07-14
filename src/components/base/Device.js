import React from "react";
import styled from "styled-components";

import NanoS from "../../icons/interactions/NanoS";

export default props => (
  <DeviceContainer>
    <NanoS width={500} {...props} />
  </DeviceContainer>
);

const DeviceContainer = styled.div`
  background-color: hsla(0, 0%, 100%, 0.1);
  padding: 20px;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
