export default function remapError(err) {
  if (err.name === "DeviceOnDashboardExpected") {
    err.message = "Please allow Ledger Manager on your device";
  }
  if (err.name === "DeviceSocketNoBulkStatus") {
    err.message = "Resource unavailable";
  }
  if (err.name === "TransportError") {
    err.message = "No device found";
  }
  if (err.name === "ManagerUninstallBTCDep") {
    err.message =
      "Can't uninstall BTC app because it is required by another app";
  }
  if (err.name === "ManagerNotEnoughSpace") {
    err.message = "Not enough space left on device.";
  }
  if (err.name === "TransportStatusError" && err.statusCode === 0x6fb1) {
    err.name = "DeviceNotOnDashboard";
    err.message = "Please ensure your device is on Dashboard";
  }
  if (err.name === "ManagerAppRelyOnBTC") {
    err.message = "Please first install the Bitcoin app";
  }
  return err;
}
