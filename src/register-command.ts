import vsc from "vscode";
import { uiNotify } from "./ui-notify";

const EXT_ID = "tsErrorColorizer";

export const registerCommand = (cmd: string, fn: () => void) =>
  vsc.commands.registerCommand(`${EXT_ID}.${cmd}`, async () => {
    try {
      return await fn();
    } catch (e) {
      // VS Code has an error swallowing problem, so we catch and manually log.
      uiNotify.error(`Simple Import extension error!`, e);
      throw e;
    }
  });
