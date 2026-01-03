import * as vscode from 'vscode';
import * as os from 'os';
import {executeCommand} from '../utils/command';
import {isXcodeProject} from '../utils/xcode';

const xedPath = '/usr/bin/xed';

/**
 * Open file or project in Xcode
 * @param uri Optional URI of the file to open
 */
export async function openInXcode(uri?: vscode.Uri): Promise<void> {
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

  const isXcode = isXcodeProject(projectPath);
  let command: string;

  if (filePath) {
    if (isXcode) {
      command = `${xedPath} --line ${line} --project "${projectPath}" "${filePath}"`;
    } else {
      command = `${xedPath} --line ${line} "${filePath}"`;
    }
  } else {
    command = `${xedPath} "${projectPath}"`;
  }

  console.log('Executing command:', command);

  try {
    await executeCommand(command);
  } catch (error) {
    const err = error as Error;
    vscode.window.showErrorMessage(`Failed to open Xcode: ${err.message}`);
  }
}
