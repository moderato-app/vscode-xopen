import * as fs from 'fs';
import * as path from 'path';

/**
 * Check if the project directory contains Xcode project files
 * @param projectPath The project directory path
 * @returns Returns true if Xcode project files are found
 */
export function isXcodeProject(projectPath: string): boolean {
  try {
    // Check for Package.swift
    const packageSwiftPath = path.join(projectPath, 'Package.swift');
    if (fs.existsSync(packageSwiftPath)) {
      return true;
    }

    // Check for .xcodeproj or .xcworkspace directories
    const files = fs.readdirSync(projectPath);
    for (const file of files) {
      if (file.endsWith('.xcodeproj') || file.endsWith('.xcworkspace')) {
        const fullPath = path.join(projectPath, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          return true;
        }
      }
    }

    return false;
  } catch (error) {
    console.error('Error checking Xcode project:', error);
    return false;
  }
}
