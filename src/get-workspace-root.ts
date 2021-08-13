import vsc from "vscode";

export const getWorkspaceRoot = () => {
  const { workspaceFolders } = vsc.workspace;
  const workspaceFolder = workspaceFolders ? workspaceFolders[0] : null;
  if (!workspaceFolder) {
    throw new Error("No workspace folders");
  }
  return workspaceFolder.uri.fsPath;
};
