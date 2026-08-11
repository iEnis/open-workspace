import * as vscode from "vscode";
import { exec } from "child_process";

export function activate(context: vscode.ExtensionContext) {
    const openAll = vscode.commands.registerCommand("open-workspace.openAll", (uri: vscode.Uri) => {
        const folder = uri.fsPath;

        exec(`powershell.exe -NoProfile -Command "Start-Process '${folder}'"`);
        exec(`wt.exe -d "${folder}"`);
    });

    const openTerminal = vscode.commands.registerCommand("open-workspace.openTerminal", (uri: vscode.Uri) => {
        const folder = uri.fsPath;

        exec(`wt.exe -d "${folder}"`);
    });

    context.subscriptions.push(openAll, openTerminal);
}

export function deactivate() {}
