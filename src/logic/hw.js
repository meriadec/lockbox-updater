import manager from "@ledgerhq/live-common/lib/manager";
import { from, of, concat, throwError, combineLatest } from "rxjs";
import { concatMap, tap, delay } from "rxjs/operators";
import { withDevicePolling } from "@ledgerhq/live-common/lib/hw/deviceAccess";
import firmwareUpdatePrepare from "@ledgerhq/live-common/lib/hw/firmwareUpdate-prepare";
import firmwareUpdateMain from "@ledgerhq/live-common/lib/hw/firmwareUpdate-main";
import getDeviceInfo from "@ledgerhq/live-common/lib/hw/getDeviceInfo";
import live_installApp from "@ledgerhq/live-common/lib/hw/installApp";
import live_uninstallApp from "@ledgerhq/live-common/lib/hw/uninstallApp";

import remapError from "./remapError";
import colors from "../colors";

export const withDeviceInfo = withDevicePolling("")(
  transport => from(getDeviceInfo(transport)),
  err => {
    remapError(err);
    if (err.name === "DeviceNotOnDashboard") {
      return false;
    }
    return true;
  },
);

const ALREADY_UP_TO_DATE = "Firmware is already up-to-date.";

export function installFirmware({ addLog, setStep, subscribeProgress }) {
  addLog("Fetching latest firmware...");
  const installSub = withDeviceInfo.pipe(
    concatMap(infos =>
      combineLatest(of(infos), from(manager.getLatestFirmwareForDevice(infos))),
    ),
    concatMap(([infos, latestFirmware]) => {
      if (!latestFirmware) {
        return throwError(new Error(ALREADY_UP_TO_DATE));
      }
      console.log(`INFOS`, infos);
      console.log(`LATEST FIRMWARE`, latestFirmware);
      return infos.isOSU
        ? concat(
            of(null).pipe(
              tap(() => {
                setStep("firmware");
                addLog("Installing final firmware...");
              }),
            ),
            firmwareUpdateMain("", latestFirmware).pipe(
              tap(subscribeProgress("firmware-progress")),
            ),
          )
        : concat(
            of(null).pipe(
              tap(() => {
                setStep("osu");
                addLog("Installing OS updater...");
                addLog("Please allow Ledger Manager on your device.");
              }),
            ),
            firmwareUpdatePrepare("", latestFirmware).pipe(
              tap(subscribeProgress("osu-progress")),
            ),
            of(null).pipe(
              tap(() => {
                addLog("Waiting for device to reboot...");
              }),
            ),
            of(delay(2000)),
            installSub,
          );
    }),
  );

  return installSub;
}

export function uninstallApp({ app, addLog, setStep }) {
  return withDevicePolling("")(
    transport => {
      return from(getDeviceInfo(transport)).pipe(
        concatMap(infos =>
          concat(
            of(null).pipe(
              tap(() => {
                setStep("uninstall-app");
                addLog("Uninstalling app...");
                addLog("Allow Lockbox manager on your device if asked", {
                  color: colors.orange,
                });
              }),
            ),
            live_uninstallApp(transport, infos.targetId, app),
            of(null).pipe(
              tap(() => {
                addLog("Uninstallation completed successfully!", {
                  color: colors.green,
                });
              }),
            ),
          ),
        ),
      );
    },
    () => false,
  );
}

export function installApp({ app, addLog, setStep, subscribeProgress }) {
  return withDevicePolling("")(
    transport => {
      return from(getDeviceInfo(transport)).pipe(
        concatMap(infos =>
          concat(
            of(null).pipe(
              tap(() => {
                setStep("uninstall-app");
                addLog("Uninstalling current app (if exists)...");
                addLog("Allow Lockbox manager on your device if asked", {
                  color: colors.orange,
                });
              }),
            ),
            live_uninstallApp(transport, infos.targetId, app),
            of(null).pipe(
              tap(() => {
                setStep("install-app");
                addLog("Installing app... please wait...");
              }),
            ),
            live_installApp(transport, infos.targetId, app).pipe(
              tap(subscribeProgress("install-app-progress")),
            ),
            of(null).pipe(
              tap(() => {
                addLog("Installation completed successfully!", {
                  color: colors.green,
                });
              }),
            ),
          ),
        ),
      );
    },
    () => false,
  );
}
