import {exec} from 'child_process';

/**
 * Execute a shell command
 * @param command The command to execute
 * @returns Promise that resolves when the command completes
 */
export function executeCommand(command: string): Promise<void> {
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
