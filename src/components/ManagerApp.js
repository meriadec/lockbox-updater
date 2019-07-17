import React from "react";
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";

import { getAppIconURL } from "../logic/apps";
import Button from "./base/Button";

export default ({ app, onInstall, onUninstall }) => {
  return (
    <Container>
      <div style={{ width: 50, height: 50 }}>
        <img width={50} src={getAppIconURL(app)} alt={app.name} />
      </div>
      <span>{app.name}</span>
      <ButtonsContainer>
        <Button size="small" onClick={onUninstall}>
          <FaTrash />
        </Button>
        <Button variant="primary" size="small" onClick={onInstall}>
          Install
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 200px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-top: 50px;
  flex-direction: column;
  background-color: hsla(0, 0%, 100%, 0.1);
  font-size: 13px;
  line-height: 13px;
  border-radius: 4px;
  position: relative;
  > * + * {
    margin-top: 10px;
  }
`;

const ButtonsContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > * + * {
    margin-left: 10px;
  }
`;
