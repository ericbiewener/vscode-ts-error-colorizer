import vsc from "vscode";
import { OffsetRange } from "./types";

const offsetToPos = (offset: number) =>
  vsc.window.activeTextEditor!.document.positionAt(offset);

const offsetToRange = ({ start, end }: OffsetRange) =>
  new vsc.Range(offsetToPos(start), offsetToPos(end));

export const insertText = (text: string, offsetRange: OffsetRange) =>
  vsc.window.activeTextEditor?.edit((builder) => {
    builder.replace(offsetToRange(offsetRange), text);

    // if (end !== undefined) {
    //   builder.replace(offsetToRange(start, end), text);
    // } else {
    //   builder.insert(offsetToPos(start), text)
    // }
  });
