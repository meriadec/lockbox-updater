import React, { useContext, useState, createContext } from "react";

const DeviceInfoContext = createContext(null);
const SetDeviceInfoContext = createContext(null);

export default ({ children }) => {
  const [deviceInfo, setDeviceInfo] = useState(null);
  return (
    <DeviceInfoContext.Provider value={deviceInfo}>
      <SetDeviceInfoContext.Provider value={setDeviceInfo}>
        {children}
      </SetDeviceInfoContext.Provider>
    </DeviceInfoContext.Provider>
  );
};

export const useDeviceInfo = () => useContext(DeviceInfoContext);
export const useSetDeviceInfo = () => useContext(SetDeviceInfoContext);
