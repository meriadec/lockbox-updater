import React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";
import { FaPowerOff } from "react-icons/fa";

import DeviceInfoContext, {
  useDeviceInfo,
  useSetDeviceInfo,
} from "./DeviceInfoContext";
import ConnectDevice from "./ConnectDevice";
import Button from "./base/Button";
import ErrorBoundary from "./base/ErrorBoundary";
import Manager from "./Manager";

const App = () => (
  <ErrorBoundary>
    <DeviceInfoContext>
      <Container>
        <Heading />
        <Inner>
          <Content />
        </Inner>
      </Container>
    </DeviceInfoContext>
  </ErrorBoundary>
);

const Heading = () => {
  const deviceInfo = useDeviceInfo();
  const setDeviceInfo = useSetDeviceInfo();
  const onDisconnect = async () => {
    await new Promise(r => setTimeout(r, 200));
    setDeviceInfo(null);
  };
  return (
    <HeadingContainer>
      <h1>
        Blockchain Lockbox
        <sup>™</sup>
      </h1>
      {deviceInfo && (
        <Button Icon={FaPowerOff} onClick={onDisconnect}>
          Disconnect
        </Button>
      )}
    </HeadingContainer>
  );
};

const Content = () => {
  const deviceInfo = useDeviceInfo();
  return deviceInfo ? <Manager /> : <ConnectDevice />;
};

const Container = styled.div`
  padding: 40px;
  flex-grow: 1;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
`;

const Inner = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const HeadingContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: flex-end;
  padding-bottom: 10px;
  justify-content: space-between;
  border-bottom: 2px solid hsla(0, 0%, 100%, 0.1);
  margin-bottom: 10px;

  h1 {
    color: white;
    font-size: 24px;
    font-weight: 700;
    sup {
      position: absolute;
    }
  }
`;

export default hot(App);
