import vsc from "vscode";
import fs from "fs/promises";
import { uiNotify } from "./ui-notify";
import { webviewHtml } from "./webview-html";

const getInput = async () => {
  const editor = vsc.window.activeTextEditor;
  if (!editor) return;

  const sel = editor.selection

  const tsError = vsc.languages
    .getDiagnostics(editor.document.uri)
    .filter((d) => d.source === "ts" && d.range.intersection(sel))[0];

  return tsError?.message
};

const getWebviewHtml = (input: string) => webviewHtml.replace('<REPLACE>', `\`${input}\``)

export const colorizeTsError = async () => {
  const input =  await getInput()
  if (!input) return
  
  const panel = vsc.window.createWebviewPanel(
    "tsErrorColorizer",
    "TS Error Colorizer",
    vsc.ViewColumn.One,
    { enableScripts: true }
  );

  panel.webview.html = getWebviewHtml(input);
  console.info('::', panel.webview.html)
};
