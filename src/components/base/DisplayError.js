import React from "react";
import styled from "styled-components";

import colors from "../../colors";
import remapError from "../../logic/remapError";

const Container = styled.div`
  background: ${colors.errorBg};
  color: ${colors.errorFg};
  padding: 10px;
  font-family: monospace;
  user-select: text;
`;

export default ({ error }) => (
  <Container>{remapError(error).toString()}</Container>
);
