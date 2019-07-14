import React, { useState } from "react";
import styled from "styled-components";
import { FaUsb } from "react-icons/fa";

import Button from "./base/Button";
import DisplayError from "./base/DisplayError";
import { useSetDeviceInfo } from "./DeviceInfoContext";
import { withDeviceInfo } from "../logic/hw";

export default () => {
  const [error, setError] = useState(null);
  const setDeviceInfo = useSetDeviceInfo();

  const handleClick = async () => {
    try {
      const deviceInfo = await withDeviceInfo.toPromise();
      await new Promise(r => setTimeout(r, 300));
      setDeviceInfo(deviceInfo);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Card>
      <div style={{ marginBottom: 20, maxWidth: 400, textAlign: "center" }}>
        {
          "Connect the device to your computer, tap your PIN code, go to Dashboard, then click "
        }
        <b>Get started</b>.
      </div>
      <Button Icon={FaUsb} onClick={handleClick}>
        Get started
      </Button>
      {error && (
        <div style={{ marginTop: 20 }}>
          <DisplayError error={error} />
        </div>
      )}
    </Card>
  );
};

const Card = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  padding-top: 100px;
`;
