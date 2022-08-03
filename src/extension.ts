//ref:https://segmentfault.com/a/1190000040720760
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log("插件已经被激活");

  const commandOfCreateComponentFolder = vscode.commands.registerCommand(
    "createComponentFolder",
    (uri) => {
      // 文件路径
      let filePath = uri.path.substring(1);

      const stats = fs.statSync(filePath);
      const isDir = stats.isDirectory();
      if (!isDir) {
        console.log("filePath: ", filePath);
        filePath = path.dirname(filePath);
      }
      vscode.window
        .showInputBox({
          // 这个对象中所有参数都是可选参数
          password: false, // 输入内容是否是密码
          ignoreFocusOut: false, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
          placeHolder: "输入组件名称", // 在输入框内的提示信息
          prompt: isDir
            ? "将在该目录下创建组件目录"
            : "将在该文件同级目录下创建文件", // 在输入框下方的提示信息
          validateInput: (test) => {
            if (!/^[A-Za-z].*/.test(test)) {
              return "必须字母开头";
            }

            if (test.length === 0) {
              return "目录名不能为空";
            }
            return null;
          },
        })
        .then(function (msg) {
          const dir = filePath + "/" + msg;
          fs.mkdirSync(dir);
          const cname = msg![0].toUpperCase() + msg?.slice(1);
          fs.writeFile(
            dir + "/index.tsx",
            `import React, { useState } from "react";
          
interface ${cname}Props {
  
}

const ${cname}: React.FC<${cname}Props> = () => {
  return (
    <div></div>
  );
};`,
            { encoding: "utf-8" },
            (err) => {
              console.log(err);
            }
          );

          fs.writeFile(
            dir + "/index.md",
            `---
nav:
  title: Components
  path: /components
---

## ${cname}`,
            { encoding: "utf-8" },
            (err) => {
              console.log(err);
            }
          );

          const testdir = dir + "/__test__";
          fs.mkdirSync(testdir);

          fs.writeFile(
            testdir + "/index.test.tsx",
            `import React from 'react';
import { render, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { ${cname} } from '../';

describe('${cname}', () => {
  it('${cname}', async () => {

  });
});`,
            { encoding: "utf-8" },
            (err) => {
              console.log(err);
            }
          );
        });
    }
  );

  // 将命令放入其上下文对象中，使其生效
  context.subscriptions.push(commandOfCreateComponentFolder);
}

// this method is called when your extension is deactivated
export function deactivate() {}
