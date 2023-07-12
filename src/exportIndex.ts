import * as vscode from "vscode";
import * as fs from "fs";

export const commandOfExportIndex = vscode.commands.registerCommand(
  "exportIndex",
  (uri) => {
    const filePath = uri.path.substring(1);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      const files = fs.readdirSync(filePath);

      const strs: string[] = [];

      for (const file of files) {
        if (file === "index.ts") {
          continue;
        }
        strs.push(`export * from "./${file.split(".")[0]}";`);
      }
      fs.writeFileSync(filePath + "/index.ts", strs.join("\n\r"));
    }
  }
);
