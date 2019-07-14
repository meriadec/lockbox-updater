import fs from "fs";
import { ipcRenderer } from "electron";
const { dialog } = require("electron").remote;

const globalLogs = [`Lockbox Updater - ${new Date().toISOString()}\n`];
const noop = () => {};

export function addGlobalLog(str) {
  globalLogs.push(str);
}

ipcRenderer.on("exportLogs", async () => {
  const p = await dialog.showSaveDialog({
    defaultPath: `lockbox-updater_logs_${Date.now()}.txt`,
  });
  if (p) {
    const content = `${globalLogs.join("\n")}\n`;
    fs.writeFile(p, content, noop);
  }
});
