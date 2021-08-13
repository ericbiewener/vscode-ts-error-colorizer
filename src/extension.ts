import vsc from "vscode";
import { colorizeTsError } from "./colorize-ts-error";
import { registerCommand } from "./register-command";

export const activate = (ctx: vsc.ExtensionContext) => {
  ctx.subscriptions.push(
    registerCommand("colorizeTsError", colorizeTsError),
  );
};
