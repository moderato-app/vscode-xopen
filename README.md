[![Visual Studio Marketplace](https://img.shields.io/visual-studio-marketplace/v/moderato-app.xopen?label=VS%20Marketplace&style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=moderato-app.xopen)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/moderato-app.xopen?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=moderato-app.xopen)

# XOpen: A vscode extension that opens current line in Xcode

## Usage

Press `⌥ Option` twice

To change the shortcut, go to `Settings` -> `Keyboard Shortcuts` and search for `xopen`.

XOpen also works with Cursor and Windsurf. 
## Installation

* [VSCode Extension Marketplace ](https://marketplace.visualstudio.com/items?itemName=moderato-app.xopen) 
 
* [Open VSX Registry](https://open-vsx.org/extension/moderato-app/xopen)

* [GitHub Releases](https://github.com/moderato-app/vscode-xopen/releases)
  * Download the latest extension package `.vsix`
  * In VSCode, select `Extensions`
  * Drag and drop the `.vsix` file

## Q&A / Troubleshooting

### Xcode Cannot Position to Column

If Xcode opens but cannot position to the correct column, you can try to enable the following permissions:

**1. Accessibility:** `System Settings` → `Privacy & Security` → `Accessibility` → Enable **VSCode**

<img src="doc/accessibility.png" alt="Accessibility Settings" style="width: 400px;">

**2. Automation:** `System Settings` → `Privacy & Security` → `Automation` → Enable **Xcode** for **VSCode**

<img src="doc/automation.png" alt="Automation Settings" style="width: 400px;">

**Note:** Restart VSCode after enabling permissions.

## Credits

* [switch2idea](https://github.com/qczone/switch2idea), a Cursor extension that enables smooth switching between Cursor and IDEA.

## License

This extension is licensed under the [MIT License](LICENSE).