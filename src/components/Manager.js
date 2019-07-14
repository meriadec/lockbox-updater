import React, { useEffect, useReducer } from "react";
import styled from "styled-components";
import manager from "@ledgerhq/live-common/lib/manager";
import {
  FaCheck,
  FaCloudDownloadAlt,
  FaExclamationTriangle,
} from "react-icons/fa";

import { useDeviceInfo } from "./DeviceInfoContext";
import AppsList from "./AppsList";
import InstallFirmware from "./InstallFirmware";
import Spinner from "./base/Spinner";
import DisplayError from "./base/DisplayError";
import Button from "./base/Button";
import colors from "../colors";

const INITIAL_STATE = {
  isFetchingFirmware: false,
  isInstallingFirmware: false,
  firmware: undefined,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_FIRMWARE_START":
      return { ...state, isFetchingFirmware: true };
    case "FETCH_FIRMWARE_STOP":
      return { ...state, isFetchingFirmware: false };
    case "SET_FIRMWARE":
      return { ...state, firmware: action.payload };
    case "SET_INSTALLING_FIRMWARE":
      return { ...state, isInstallingFirmware: action.payload };
    case "ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default () => {
  const deviceInfo = useDeviceInfo();
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    if (deviceInfo.isBootloader) return;
    let isUnmounted = false;
    const effect = async () => {
      try {
        dispatch({ type: "FETCH_FIRMWARE_START" });
        const now = Date.now();
        const firm = await manager.getLatestFirmwareForDevice(deviceInfo);
        if (isUnmounted) return;
        const elapsed = Date.now() - now;
        const MIN_WAIT = 700;
        await new Promise(r => setTimeout(r, MIN_WAIT - elapsed));
        if (isUnmounted) return;
        dispatch({ type: "SET_FIRMWARE", payload: firm });
      } catch (err) {
        dispatch({ type: "ERROR", payload: err });
      } finally {
        dispatch({ type: "FETCH_FIRMWARE_STOP" });
      }
    };
    effect();
    return () => {
      isUnmounted = true;
    };
  }, [deviceInfo, dispatch]);

  const inner =
    state.isInstallingFirmware || deviceInfo.isBootloader ? (
      <InstallFirmware
        onFinish={() =>
          dispatch({ type: "SET_INSTALLING_FIRMWARE", payload: false })
        }
      />
    ) : (
      <>
        <FirmwareInfo
          isFetching={state.isFetchingFirmware}
          firmware={state.firmware}
          error={state.error}
          onInstallFirm={() =>
            dispatch({ type: "SET_INSTALLING_FIRMWARE", payload: true })
          }
        />
        {!deviceInfo.isOSU && <AppsList />}
      </>
    );

  return <Container>{inner}</Container>;
};

const FirmwareInfo = ({ isFetching, firmware, error, onInstallFirm }) => {
  const deviceInfo = useDeviceInfo();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: 40,
        marginBottom: 40,
      }}
    >
      <Label style={{ marginRight: 5 }}>Firmware version:</Label>
      <Badge style={{ marginRight: 5 }}>
        {deviceInfo.isOSU ? "Update not finished" : deviceInfo.version}
      </Badge>
      <div style={{ fontSize: 13 }}>
        {isFetching ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Spinner />
            <span style={{ marginLeft: 5 }}>Checking for new firmware...</span>
          </div>
        ) : error ? (
          <DisplayError error={error} />
        ) : firmware === null ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaCheck color={colors.green} style={{ marginRight: 5 }} />
            <span>Your device is up-to-date.</span>
          </div>
        ) : firmware ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaExclamationTriangle
              color={colors.orange}
              style={{ marginRight: 5 }}
            />
            <span style={{ color: colors.orange, marginRight: 10 }}>
              Firmware needs to be updated
            </span>
            <Button
              size="small"
              variant="primary"
              Icon={FaCloudDownloadAlt}
              onClick={onInstallFirm}
            >
              Update to firmware {firmware.final.version}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const Container = styled.div`
  > * + * {
    margin-top: 10px;
  }
`;

const Label = styled.div`
  font-size: 13px;
  font-weight: 600;
`;

const Badge = styled.div`
  font-size: 13px;
  font-family: monospace;
  background: hsla(0, 0%, 100%, 0.1);
  border-radius: 16px;
  padding: 0 10px;
  color: ${colors.lightBlue};
  user-select: text;
`;
