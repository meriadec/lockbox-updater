import React, { useEffect, useReducer } from "react";
import manager from "@ledgerhq/live-common/lib/manager";
import styled from "styled-components";

import colors from "../colors";
import { useDeviceInfo } from "./DeviceInfoContext";
import ManagerApp from "./ManagerApp";
import ManageApp from "./ManageApp";
import DisplayError from "./base/DisplayError";
import Spinner from "./base/Spinner";

const DEV_MODE = false;

const INITIAL_STATE = {
  isFetchingApps: false,
  error: null,
  apps: [],
  appToInstall: null,
  appToUninstall: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "APP_FETCH_START":
      return { ...state, isFetchingApps: true };
    case "APP_FETCH_STOP":
      return { ...state, isFetchingApps: false };
    case "SET_APPS_LIST":
      return { ...state, apps: action.payload };
    case "SET_APP_TO_INSTALL":
      return { ...state, appToInstall: action.payload, appToUninstall: null };
    case "SET_APP_TO_UNINSTALL":
      return { ...state, appToUninstall: action.payload, appToInstall: null };
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
    let isUnmounted = false;
    const effect = async () => {
      try {
        dispatch({ type: "APP_FETCH_START" });
        const now = Date.now();
        const apps = await manager.getAppsList(deviceInfo, DEV_MODE, () => []);
        if (isUnmounted) return;
        const elapsed = Date.now() - now;
        const MIN_WAIT = 500;
        await new Promise(r => setTimeout(r, MIN_WAIT - elapsed));
        if (isUnmounted) return;
        dispatch({ type: "SET_APPS_LIST", payload: apps });
      } catch (error) {
        dispatch({ type: "ERROR", payload: error });
      } finally {
        dispatch({ type: "APP_FETCH_STOP" });
      }
    };
    effect();
    return () => {
      isUnmounted = true;
    };
  }, [deviceInfo, dispatch]);

  return (
    <Container>
      <h2>Install apps</h2>
      {state.isFetchingApps ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Spinner />
          <span style={{ marginLeft: 5 }}>{"Fetching list..."}</span>
        </div>
      ) : state.appToInstall || state.appToUninstall ? (
        <ManageApp
          appToInstall={state.appToInstall}
          appToUninstall={state.appToUninstall}
          onFinish={() => {
            dispatch({ type: "SET_APP_TO_INSTALL", payload: null });
          }}
        />
      ) : state.error ? (
        <DisplayError error={state.error} />
      ) : state.apps.length ? (
        <List>
          {state.apps.map(app => (
            <ManagerApp
              key={app.id}
              app={app}
              onInstall={() => {
                dispatch({ type: "SET_APP_TO_INSTALL", payload: app });
              }}
              onUninstall={() => {
                dispatch({ type: "SET_APP_TO_UNINSTALL", payload: app });
              }}
            />
          ))}
        </List>
      ) : (
        <div>No app available.</div>
      )}
    </Container>
  );
};

const Container = styled.div`
  h2 {
    font-weight: 700;
    color: ${colors.lightBlue};
    margin-bottom: 20px;
  }
`;

const List = styled.div`
  margin: -10px;
  display: flex;
  flex-wrap: wrap;
  > * {
    margin: 10px;
  }
`;
