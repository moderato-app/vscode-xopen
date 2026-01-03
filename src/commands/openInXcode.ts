import * as vscode from 'vscode';
import * as os from 'os';
import {executeCommand} from '../utils/command';
import {isXcodeProject} from '../utils/xcode';

const xedPath = '/usr/bin/xed';

/**
 * Open file or project in Xcode
 * @param uri Optional URI of the file to open
 * @param outputChannel Optional output channel for logging
 */
export async function openInXcode(
  uri?: vscode.Uri,
  outputChannel?: vscode.OutputChannel
): Promise<void> {
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
  let column = 1;

  if (uri) {
    filePath = uri.fsPath;
    const editor = vscode.window.activeTextEditor;
    if (editor && editor.document.uri.fsPath === filePath) {
      line = editor.selection.active.line + 1;
      column = editor.selection.active.character + 1;
    }
  } else {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      filePath = editor.document.uri.fsPath;
      line = editor.selection.active.line + 1;
      column = editor.selection.active.character + 1;
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

  const log = (message: string) => {
    if (outputChannel) {
      outputChannel.appendLine(`[${new Date().toLocaleTimeString()}] ${message}`);
    } else {
      console.log(message);
    }
  };

  log(`Executing command: ${command}`);
  log(`Opening file: ${filePath || 'project'}, line: ${line}, column: ${column}`);

  try {
    await executeCommand(command, outputChannel);
    // Move caret to specific column using AppleScript
    if (filePath && column > 1) {
      log(`Moving caret to column ${column}`);
      await moveCaretToColumn(column, outputChannel);
    }
  } catch (error) {
    const err = error as Error;
    const errorMsg = `Failed to open Xcode: ${err.message}`;
    log(`ERROR: ${errorMsg}`);
    vscode.window.showErrorMessage(errorMsg);
  }
}

/**
 * Move caret to a specific column in Xcode using AppleScript
 * @param column The target column (1-based)
 * @param outputChannel Optional output channel for logging
 */
async function moveCaretToColumn(
  column: number,
  outputChannel?: vscode.OutputChannel
): Promise<void> {
  // AppleScript to move caret to the specified column
  // First move to beginning of line (Cmd+Left), then move right (column - 1) times
  const appleScript = `
    tell application "Xcode" to activate
    delay 0.6
    tell application "System Events"
      -- Move to beginning of line (Cmd+Left Arrow)
      key code 123 using {command down}
      -- Move right to the target column
      repeat ${column - 1} times
        key code 124
      end repeat
    end tell
  `;

  const command = `osascript -e '${appleScript.replace(/'/g, "'\\''")}'`;

  try {
    await executeCommand(command, outputChannel);
  } catch (error) {
    // Silently fail if AppleScript execution fails (e.g., accessibility permissions)
    const warningMsg = `AppleScript caret adjustment failed or was blocked by Accessibility: ${error}`;
    if (outputChannel) {
      outputChannel.appendLine(`WARNING: ${warningMsg}`);
    } else {
      console.warn(warningMsg);
    }
  }
}
