import * as vscode from 'vscode';
import {exec} from 'child_process';
import * as os from 'os';
import * as fs from 'fs';

const xedPath = '/usr/bin/xed';

function executeCommand(command: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const childProcess = exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('Error executing command:', error);
        console.error('Stderr:', stderr);
        reject(error);
        return;
      }
      if (stdout) {
        console.log('Command output:', stdout);
      }
      if (stderr) {
        console.log('Command stderr:', stderr);
      }
      resolve();
    });

    // Add error handling
    childProcess.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EPIPE') {
        console.log('Pipe communication disconnected, but this may not affect Xcode startup');
        resolve(); // Continue execution as Xcode may have started normally
      } else {
        reject(error);
      }
    });
  });
}

export function activate(context: vscode.ExtensionContext) {

  console.log('Open in Xcode is now active!');

  if (os.platform() !== 'darwin') {
    vscode.window?.showErrorMessage('Xcode is only available on macOS');
    return;
  }

  let openFileDisposable = vscode.commands.registerCommand('open-in-xcode.open-in-xcode', async (uri?: vscode.Uri) => {
    if (os.platform() !== 'darwin') {
      vscode.window.showErrorMessage('Xcode is only available on macOS');
      return;
    }

    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
      vscode.window.showErrorMessage('No workspace folder is opened!');
      return;
    }
    const projectPath = workspaceFolders[0].uri.fsPath;


    let filePath: string | undefined;
    let line = 1;

    if (uri) {
      filePath = uri.fsPath;
      const editor = vscode.window.activeTextEditor;
      if (editor && editor.document.uri.fsPath === filePath) {
        line = editor.selection.active.line + 1;
      }
    } else {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        filePath = editor.document.uri.fsPath;
        line = editor.selection.active.line + 1;
      }
    }
    let command: string;
    if (filePath){
      command = `${xedPath} --line ${line} --project "${projectPath}" "${filePath}"`;
    }else{
      command = `${xedPath} "${projectPath}"`;
    }

    console.log('Executing command:', command);

    try {
      await executeCommand(command);
    } catch (error) {
      const err = error as Error;
      vscode.window.showErrorMessage(`Failed to open Xcode: ${err.message}`);
    }
  });

  context.subscriptions.push(openFileDisposable);
}

export function deactivate() {
}
