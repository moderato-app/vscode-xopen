import * as vscode from 'vscode';
import {exec} from 'child_process';

/**
 * Execute a shell command
 * @param command The command to execute
 * @param outputChannel Optional output channel for logging
 * @returns Promise that resolves when the command completes
 */
export function executeCommand(
  command: string,
  outputChannel?: vscode.OutputChannel
): Promise<void> {
  const log = (message: string) => {
    if (outputChannel) {
      outputChannel.appendLine(`[${new Date().toLocaleTimeString()}] ${message}`);
    } else {
      console.log(message);
    }
  };

  return new Promise((resolve, reject) => {
    const childProcess = exec(command, (error, stdout, stderr) => {
      if (error) {
        const errorMsg = `Error executing command: ${error.message}`;
        log(errorMsg);
        if (stderr) {
          log(`Stderr: ${stderr}`);
        }
        reject(error);
        return;
      }
      if (stdout) {
        log(`Command output: ${stdout.trim()}`);
      }
      if (stderr) {
        log(`Command stderr: ${stderr.trim()}`);
      }
      resolve();
    });

    // Add error handling
    childProcess.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EPIPE') {
        log('Pipe communication disconnected, but this may not affect Xcode startup');
        resolve(); // Continue execution as Xcode may have started normally
      } else {
        log(`Process error: ${error.message}`);
        reject(error);
      }
    });
  });
}
