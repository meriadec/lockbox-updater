import React, { useEffect, useReducer } from "react";
import styled from "styled-components";

import { getAppIconURL } from "../logic/apps";
import { installApp, uninstallApp } from "../logic/hw";
import ProgressBar from "./base/ProgressBar";
import DisplayError from "./base/DisplayError";
import Button from "./base/Button";
import Spinner from "./base/Spinner";

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

export default ({ appToInstall, appToUninstall, onFinish }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const app = appToInstall || appToUninstall;
  const actionType = appToInstall ? "install" : "uninstall";

  useEffect(() => {
    dispatch({ type: "RESET" });
    const payload = {
      app,
      addLog: (text, { color } = {}) =>
        dispatch({ type: "ADD_LOG", payload: { text, color } }),
      setStep: step => dispatch({ type: "SET_STEP", payload: step }),
      subscribeProgress: step => ({ progress }) => {
        if (progress === 0) {
          dispatch({ type: "SET_STEP", payload: step });
        }
        dispatch({ type: "SET_PROGRESS", payload: progress });
      },
    };
    const action = actionType === "install" ? installApp : uninstallApp;
    const sub = action(payload).subscribe({
      complete: () => dispatch({ type: "SET_COMPLETED" }),
      error: err => dispatch({ type: "ERROR", payload: err }),
    });
    return () => sub.unsubscribe();
  }, [app, dispatch]);

  const inner = state.error ? (
    <>
      <DisplayError error={state.error} />
      <Button
        onClick={onFinish}
        size="small"
        variant="primary"
        style={{ marginTop: 20 }}
      >
        Go back
      </Button>
    </>
  ) : (
    <>
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
      ) : state.step === "install-app-progress" ? (
        <ProgressBar style={{ marginTop: 20 }} progress={state.progress} />
      ) : null}
      {!state.isCompleted && (
        <div style={{ marginTop: 10 }}>
          <Spinner />
        </div>
      )}
    </>
  );

  return (
    <Container>
      <Heading>
        <img width={24} src={getAppIconURL(app)} alt={app.name} />
        <b>Installing {app.name}...</b>
      </Heading>
      {inner}
    </Container>
  );
};

const Heading = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  > * + * {
    margin-left: 5px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
