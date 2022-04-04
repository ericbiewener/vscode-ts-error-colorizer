import vsc from "vscode";
import { webviewHtml } from "./webview-html";

/**
 * We have to propagate the panel and editor around together so that we can re-find the selection in
 * the editor associated with an open panel.
 */

const getDiagnostic = async ({ document, selection }: vsc.TextEditor) => {
  const tsError = vsc.languages
    .getDiagnostics(document.uri)
    .filter((d) => d.source === "ts" && d.range.intersection(selection))[0];

  return tsError;
};

const getWebviewHtml = (input: string) =>
  webviewHtml.replace("<REPLACE>", `\`${input}\``);

export const colorizeTsError = async (
  panel?: vsc.WebviewPanel,
  editor = vsc.window.activeTextEditor
) => {
  if (!editor) return;

  const diagnostic = await getDiagnostic(editor);
  if (!diagnostic?.message) {
    // All errors are fixed!
    if (panel) panel.dispose()
    return;
  }

  if (!panel) {
    panel = vsc.window.createWebviewPanel(
      "tsErrorColorizer",
      "TS Error Colorizer",
      vsc.ViewColumn.One,
      { enableScripts: true }
    );

    listenForDiagnosticsChange(panel, editor);
  }

  panel.webview.html = getWebviewHtml(diagnostic.message);
};

const listenForDiagnosticsChange = (
  panel: vsc.WebviewPanel,
  editor: vsc.TextEditor
) => {
  const listener = vsc.languages.onDidChangeDiagnostics(() => {
    colorizeTsError(panel, editor);
  });

  panel.onDidDispose(listener.dispose);
};
