import * as vscode from 'vscode';
import * as os from 'os';
import {openInXcode} from './commands/openInXcode';

export function activate(context: vscode.ExtensionContext) {
  // Create output channel for logging inside activate() to handle reactivation properly
  const outputChannel = vscode.window.createOutputChannel('XOpen');
  outputChannel.appendLine('Open in Xcode is now active!');

  if (os.platform() !== 'darwin') {
    vscode.window?.showErrorMessage('Xcode is only available on macOS');
    return;
  }

  const openFileDisposable = vscode.commands.registerCommand(
    'xopen.open-in-xcode',
    async (uri?: vscode.Uri) => {
      await openInXcode(uri, outputChannel);
    }
  );

  context.subscriptions.push(openFileDisposable, outputChannel);
}

export function deactivate() {
}
