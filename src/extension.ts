import * as vscode from "vscode";
import { exec } from "child_process";

function fOpenTerminal(path: string) {
    if (process.platform === "win32") {
        exec(`wt.exe -d "${path}"`);
    } else {
        vscode.commands.executeCommand("openInTerminal", path);
    }
}

function fOpenFileBrowser(path: string) {
    vscode.commands.executeCommand("revealFileInOS", path);
}

export function activate(context: vscode.ExtensionContext) {
    const openAll = vscode.commands.registerCommand("open-workspace.openAll", (uri: vscode.Uri) => {
        const folder = uri.fsPath;

        fOpenTerminal(folder);
        fOpenFileBrowser(folder);
        // exec(`powershell.exe -NoProfile -Command "Start-Process '${folder}'"`);
        // exec(`wt.exe -d "${folder}"`);
    });

    const openTerminal = vscode.commands.registerCommand("open-workspace.openTerminal", (uri: vscode.Uri) => {
        const folder = uri.fsPath;

        fOpenTerminal(folder);
        // exec(`wt.exe -d "${folder}"`);
    });

    context.subscriptions.push(openAll, openTerminal);
}

export function deactivate() {}
