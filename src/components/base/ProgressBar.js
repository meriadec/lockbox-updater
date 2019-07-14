import React from "react";
import styled from "styled-components";

import Spinner from "./Spinner";
import colors, { opacity } from "../../colors";

export default ({ progress, indeterminate, style }) => (
  <Container style={style}>
    <Inner>
      <Bar
        style={{
          transform: `scaleX(${indeterminate ? 1 : progress || 0})`,
          backgroundColor: indeterminate ? "red" : undefined,
          transition:
            !indeterminate && progress > 0 ? "50ms linear transform" : "none",
        }}
      />
      <Percent>
        {indeterminate ? <Spinner /> : `${Math.round(progress * 100)}%`}
      </Percent>
    </Inner>
  </Container>
);

const Container = styled.div`
  background: hsla(0, 0%, 0%, 0.2);
  border: 1px solid hsla(0, 0%, 100%, 0.1);
  padding: 2px;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  min-width: 300px;
`;

const Inner = styled.div`
  height: 36px;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Percent = styled.div`
  font-size: 13px;
  position: relative;
  color: white;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.3);
  padding: 0 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Bar = styled.div`
  background: ${opacity(colors.blue, 0.4)};
  transform-origin: center left;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
