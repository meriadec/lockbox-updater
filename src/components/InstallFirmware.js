import React, { useEffect, useReducer } from "react";
import styled from "styled-components";

import { installFirmware, withDeviceInfo } from "../logic/hw";
import { useSetDeviceInfo } from "./DeviceInfoContext";
import colors from "../colors";
import Device from "./base/Device";
import Button from "./base/Button";
import DisplayError from "./base/DisplayError";
import Spinner from "./base/Spinner";
import ProgressBar from "./base/ProgressBar";

const DEVICE_HELPERS = [
  {
    steps: ["idle", "osu", "osu-progress", "firmware", "firmware-progress"],
    props: {
      label: "Keep your device connected to your computer",
      wire: "wired",
    },
  },
  {
    steps: ["osu-accept"],
    props: {
      label: "Accept the update on your device, and tap your PIN code",
      wire: "wired",
      action: "accept",
    },
  },

  {
    steps: ["disconnect-mcu"],
    props: {
      label:
        "Disconnect your device, and re-connect it while holding the left button",
      wire: "connecting",
      action: "left",
    },
  },
];

let logsNonce = 0;

const INITIAL_STATE = {
  step: "idle",
  progress: 0,
  isCompleted: false,
  error: null,
  logs: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_LOG":
      return {
        ...state,
        logs: [...state.logs, { id: logsNonce++, ...action.payload }],
      };
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "SET_PROGRESS":
      return { ...state, progress: action.payload };
    case "SET_COMPLETED":
      return { ...state, isCompleted: true };
    case "ERROR":
      return { ...state, error: action.payload };
    case "RESET":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default ({ onFinish }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const setDeviceInfo = useSetDeviceInfo();

  useEffect(() => {
    const sub = installFirmware({
      addLog: (text, { color } = {}) =>
        dispatch({ type: "ADD_LOG", payload: { text, color } }),
      setStep: step => dispatch({ type: "SET_STEP", payload: step }),
      subscribeProgress: step => ({ progress }) => {
        if (progress === 0) {
          dispatch({ type: "SET_STEP", payload: step });
        }
        dispatch({ type: "SET_PROGRESS", payload: progress });
      },
    }).subscribe({
      complete: async () => {
        dispatch({ type: "SET_COMPLETED" });
        const deviceInfo = await withDeviceInfo.toPromise();
        setDeviceInfo(deviceInfo);
      },
      error: err => dispatch({ type: "ERROR", payload: err }),
    });
    return () => sub.unsubscribe();
  }, []);

  const deviceHelper = DEVICE_HELPERS.find(h => h.steps.includes(state.step));

  const inner = state.error ? (
    <div>
      <DisplayError error={state.error} />
      <Button
        onClick={onFinish}
        size="small"
        variant="primary"
        style={{ marginTop: 20 }}
      >
        Go back
      </Button>
    </div>
  ) : (
    <Container>
      <div>
        <div>
          {state.logs.map(log => (
            <div key={log.id} style={{ color: log.color }}>
              - {log.text}
            </div>
          ))}
        </div>
        {state.isCompleted ? (
          <Button
            onClick={onFinish}
            size="small"
            variant="primary"
            style={{ marginTop: 20 }}
          >
            Go back
          </Button>
        ) : state.step.includes("progress") ? (
          <ProgressBar style={{ marginTop: 20 }} progress={state.progress} />
        ) : null}
        {!state.isCompleted && (
          <div style={{ marginTop: 10 }}>
            <Spinner />
          </div>
        )}
      </div>
      {deviceHelper && <Device {...deviceHelper.props} />}
    </Container>
  );

  return (
    <>
      <Heading>Firmware update</Heading>
      {inner}
    </>
  );
};

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  > * {
    flex: 1;
  }
  > * + * {
    margin-left: 20px;
  }
`;

const Heading = styled.div`
  color: ${colors.lightBlue};
  font-weight: 600;
  padding: 20px 0;
`;
