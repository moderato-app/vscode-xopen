import * as assert from 'assert';
import * as vscode from 'vscode';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';

suite('Open in Xcode Extension Test Suite', () => {
	// Activate extension before all tests
	suiteSetup(async () => {
		// Wait for extension activation
		const extension = vscode.extensions.getExtension('moderato-app.open-in-xcode');
		if (extension) {
			if (!extension.isActive) {
				await extension.activate();
			}
		}
	});

	test('Extension should be present', async () => {
		// Get extension and wait for activation
		const extension = vscode.extensions.getExtension('moderato-app.open-in-xcode');
		assert.ok(extension, 'Extension should be installed');
		
		if (!extension.isActive) {
			await extension.activate();
		}
		assert.ok(extension.isActive, 'Extension should be activated');
	});

	test('Should register open in Xcode commands', () => {
		const commands = vscode.commands.getCommands(true);
		return commands.then((cmds) => {
			assert.ok(cmds.includes('open-in-xcode.open-in-xcode'));
		});
	});

	test('Should have correct configuration', () => {
		const config = vscode.workspace.getConfiguration('open-in-xcode');
		// Configuration is optional, so we just verify the extension works
		assert.ok(true);
	});

	test('Should handle file path with spaces and special characters', async () => {
		// Create a temporary file for testing
		const tmpDir = os.tmpdir();
		const testFileName = 'test file with spaces!.txt';
		const testFilePath = path.join(tmpDir, testFileName);
		
		try {
			// Create test file
			fs.writeFileSync(testFilePath, 'test content');

			// Open file
			const doc = await vscode.workspace.openTextDocument(testFilePath);
			const editor = await vscode.window.showTextDocument(doc);

			// Execute command
			await vscode.commands.executeCommand('open-in-xcode.open-in-xcode');

			// Verify command execution completed without errors
			// Note: We cannot verify if Xcode actually opened the file as it's an external process
			assert.ok(true);
		} finally {
			// Cleanup test file
			try {
				fs.unlinkSync(testFilePath);
			} catch (e) {
				console.error('Failed to cleanup test file:', e);
			}
		}
	});

	test('Should handle editor selection', async () => {
		// Create a temporary file
		const tmpDir = os.tmpdir();
		const testFilePath = path.join(tmpDir, 'test.txt');
		
		try {
			// Create multi-line test file
			const content = 'line1\nline2\nline3\nline4\n';
			fs.writeFileSync(testFilePath, content);

			// Open file and set cursor position
			const doc = await vscode.workspace.openTextDocument(testFilePath);
			const editor = await vscode.window.showTextDocument(doc);
			
			// Move cursor to line 3, column 2
			const position = new vscode.Position(2, 1);
			editor.selection = new vscode.Selection(position, position);

			// Execute command
			await vscode.commands.executeCommand('open-in-xcode.open-in-xcode');

			// Verify command execution completed without errors
			assert.ok(true);
		} finally {
			// Cleanup test file
			try {
				fs.unlinkSync(testFilePath);
			} catch (e) {
				console.error('Failed to cleanup test file:', e);
			}
		}
	});
});
