# XOpen: A vscode extension that opens current line in Xcode

[![Visual Studio Marketplace](https://img.shields.io/visual-studio-marketplace/v/moderato-app.xopen?label=VS%20Marketplace&style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=moderato-app.xopen)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/moderato-app.xopen?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=moderato-app.xopen)

## Shortcut

* Double tap `⌥ Option`

To change the shortcut, go to `Settings` -> `Keyboard Shortcuts`, search for `open in xcode` and change the shortcut.

## 🛠️ Installation Guide

### Method 1: From Extension Marketplace

1. Click [here](https://marketplace.visualstudio.com/items?itemName=moderato-app.xopen) to install
2. Search for "open in xcode"

### Method 2: Local Installation

1. Download the latest extension package `.vsix`
2. In Cursor, select `Extensions`
3. Drag and drop the `.vsix` file

## ❓ Q&A / Troubleshooting

### Xcode Cannot Position to Column

If Xcode opens but cannot position to the correct column, you can try to enable the following permissions:

**1. Accessibility:** `System Settings` → `Privacy & Security` → `Accessibility` → Enable **Cursor** (or **Code**)

<img src="https://github.com/user-attachments/assets/d7e0f39e-50c9-4a50-9577-a91cef904381" alt="Accessibility Settings" style="width: 400px;">

**2. Automation:** `System Settings` → `Privacy & Security` → `Automation` → Enable **Xcode** for **Cursor** (or **Code**)

<img src="https://github.com/user-attachments/assets/a78de260-c59f-4a7c-b701-c689c5816cf4" alt="Automation Settings" style="width: 400px;">

**Note:** Restart Cursor/VSCode after enabling permissions.

## Credits

* [switch2idea](https://github.com/qczone/switch2idea), a Cursor extension that enables smooth switching between Cursor and IDEA.

## License

This extension is licensed under the [MIT License](LICENSE).