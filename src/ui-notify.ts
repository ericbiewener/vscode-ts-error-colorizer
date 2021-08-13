import vsc from "vscode";

export const uiNotify = {
  info: (msg: string) => {
    vsc.window.showInformationMessage(msg);
  },

  error: (msg: string, error?: Error) => {
    vsc.window.showErrorMessage(msg);
    if (error) {
      console.error(error);
    }
  },
};
