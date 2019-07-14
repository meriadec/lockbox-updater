import axios from "axios";
import { listen as listenLogs } from "@ledgerhq/logs";
import { setNetwork } from "@ledgerhq/live-common/lib/network";
import { registerTransportModule } from "@ledgerhq/live-common/lib/hw";
import { setEnv } from "@ledgerhq/live-common/lib/env";

import HidProxy from "./HidProxy";

setEnv("FORCE_PROVIDER", 11);

listenLogs((...log) => {
  console.log(...log); // eslint-disable-line no-console
});

setNetwork((...args) => {
  console.log("[network]", args); // eslint-disable-line no-console
  return axios(...args);
});

let t;

registerTransportModule({
  id: "hid",
  open: async () => {
    t = await HidProxy.open();
    return t;
  },
  disconnect: () => t.close(),
});
