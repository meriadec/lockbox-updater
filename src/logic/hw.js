import React from "react";
import manager from "@ledgerhq/live-common/lib/manager";
import { from, of, concat, combineLatest, empty } from "rxjs";
import { concatMap, tap, delay } from "rxjs/operators";
import { withDevicePolling } from "@ledgerhq/live-common/lib/hw/deviceAccess";
import getDeviceInfo from "@ledgerhq/live-common/lib/hw/getDeviceInfo";
import live_installApp from "@ledgerhq/live-common/lib/hw/installApp";
import live_uninstallApp from "@ledgerhq/live-common/lib/hw/uninstallApp";
import firmwareUpdatePrepare from "@ledgerhq/live-common/lib/hw/firmwareUpdate-prepare";
import firmwareUpdateMain from "@ledgerhq/live-common/lib/hw/firmwareUpdate-main";
import firmwareUpdateRepair from "@ledgerhq/live-common/lib/hw/firmwareUpdate-repair";

import remapError from "./remapError";
import colors from "../colors";

const getLatestFirmware = infos =>
  from(manager.getLatestFirmwareForDevice(infos));

const wait2s = of({ type: "wait" }).pipe(delay(2000));

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

const waitForBootloader = withDeviceInfo.pipe(
  concatMap(deviceInfo =>
    deviceInfo.isBootloader ? empty() : concat(wait2s, waitForBootloader),
  ),
);

export function installFirmware({ addLog, setStep, subscribeProgress }) {
  addLog("Fetching latest firmware...");
  const installSub = withDeviceInfo.pipe(
    concatMap(infos => {
      return combineLatest(
        of(infos),
        infos.isBootloader
          ? concat(
              firmwareUpdateRepair({ version: null }),
              withDeviceInfo.pipe(getLatestFirmware),
            )
          : getLatestFirmware(infos),
      );
    }),
    concatMap(([infos, latestFirmware]) => {
      if (!latestFirmware) {
        addLog(`Firmware is up to date (${infos.version})`, {
          color: colors.green,
        });
        return empty();
      }
      console.log(`INFOS`, infos);
      console.log(`LATEST FIRMWARE`, latestFirmware);
      return infos.isOSU
        ? concat(
            of(null).pipe(
              tap(() => {
                setStep("firmware");
                if (latestFirmware.shouldFlashMCU) {
                  setStep("disconnect-mcu");
                  addLog(
                    <>
                      Please <b>disconnect</b> your device, and reconnect it
                      while pressing left button
                    </>,
                    { color: colors.orange },
                  );
                }
              }),
            ),
            latestFirmware.shouldFlashMCU ? waitForBootloader : empty(),
            of(null).pipe(
              tap(() => {
                addLog("Installing final firmware...");
              }),
            ),
            firmwareUpdateMain("", latestFirmware).pipe(
              tap(({ progress }) => {
                if (progress === 1) {
                  addLog("Tap your PIN to access your device.");
                }
              }),
              tap(subscribeProgress("firmware-progress")),
            ),
            of(delay(2000)),
            installSub,
          )
        : concat(
            of(null).pipe(
              tap(() => {
                setStep("osu");
                addLog("Installing OS updater...");
                addLog("Allow Lockbox manager on your device if asked", {
                  color: colors.orange,
                });
              }),
            ),
            firmwareUpdatePrepare("", latestFirmware).pipe(
              tap(e => {
                if (e.displayedOnDevice) {
                  addLog(
                    "Accept the update on your device, and tap your PIN code",
                    {
                      color: colors.orange,
                    },
                  );
                  setStep("osu-accept");
                }
              }),
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
