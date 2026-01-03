import * as vscode from 'vscode';
import * as os from 'os';
import {openInXcode} from './commands/openInXcode';

export function activate(context: vscode.ExtensionContext) {
  console.log('Open in Xcode is now active!');

  if (os.platform() !== 'darwin') {
    vscode.window?.showErrorMessage('Xcode is only available on macOS');
    return;
  }

  const openFileDisposable = vscode.commands.registerCommand(
    'xopen.open-in-xcode',
    async (uri?: vscode.Uri) => {
      await openInXcode(uri);
    }
  );

  context.subscriptions.push(openFileDisposable);
}

export function deactivate() {
}
