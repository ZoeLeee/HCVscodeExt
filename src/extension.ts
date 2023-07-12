//ref:https://segmentfault.com/a/1190000040720760
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { commandOfCreateComponentFolder } from "./createComponentFolder";
import { commandOfExportIndex } from "./exportIndex";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log("插件已经被激活");

  // 将命令放入其上下文对象中，使其生效
  context.subscriptions.push(commandOfCreateComponentFolder);
  context.subscriptions.push(commandOfExportIndex);

}

// this method is called when your extension is deactivated
export function deactivate() {}
