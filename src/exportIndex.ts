import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export const commandOfExportIndex = vscode.commands.registerCommand(
  "exportIndex",
  (uri) => {
    try {
      let filePath = uri.path;

      if (process.platform === "win32") {
        filePath = filePath.substring(1);
      }

      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        const files = fs.readdirSync(filePath);

        const strs: string[] = [];

        for (const file of files) {
          if (file === "index.ts" || file === "index.tsx") {
            continue;
          }

          if (file === "node_modules") {
            continue;
          }

          const url = filePath + "/" + file;

          const stat2 = fs.statSync(url);

          if (stat2.isDirectory()) {
            strs.push(`export * from "./${file}";`);
          } else {
            if (path.extname(file) !== ".ts" && path.extname(file) !== ".tsx") {
              continue;
            }

            const fileName = path.basename(file, path.extname(file));

            strs.push(`export * from "./${fileName}";`);
          }
        }

        const content = strs.join(
          process.platform === "win32" || true ? "\n\r" : "\n"
        );

        fs.writeFileSync(filePath + "/index.ts", content);
      }
    } catch (err) {
      console.log("err: ", err);
    }
  }
);
