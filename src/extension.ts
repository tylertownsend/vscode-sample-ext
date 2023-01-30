// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

class FilesDataProvider implements vscode.TreeDataProvider<FileNode>, vscode.Disposable {
  private _onDidChangeTreeData: vscode.EventEmitter<FileNode | undefined> = new vscode.EventEmitter<FileNode | undefined>();
  readonly onDidChangeTreeData: vscode.Event<FileNode | undefined> = this._onDidChangeTreeData.event;

  constructor(private files: string[]) {}

  getTreeItem(element: FileNode): vscode.TreeItem {
    return element;
  }
  
  getChildren(element?: FileNode): FileNode[] | Thenable<FileNode[]> {
    if (!element) {
      return this.files.map(file => new FileNode(file));
    }
    return [];
  }

  dispose() {

  }
}

// Define the Tree Item
class FileNode extends vscode.TreeItem {
  constructor(private file: string) {
    super(file, vscode.TreeItemCollapsibleState.None);
  }
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "devpack" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('devpack.helloWorld', () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    vscode.window.showInformationMessage('Hello World from DevPack!');
  });
  context.subscriptions.push(disposable);

  const files = getFiles();
  vscode.window.registerTreeDataProvider('deployment-outline',
    new FilesDataProvider(files));

  // vscode.window.createTreeView(treeViewId, { treeDataProvider: filesDataProvider });
  // vscode.window.registerCustomEditorProvider(
  //   'my-custom-editor', // Unique ID of the editor provider
  //   {
  //     // Implement the `CustomTextEditorProvider` interface
  //     async resolveCustomTextEditor(
  //       document: vscode.TextDocument,
  //       webviewPanel: vscode.WebviewPanel,
  //       _token: vscode.CancellationToken
  //     ): Promise<void> {
  //       // Set the HTML content of the webview
  //       webviewPanel.webview.html = `
  //         <h1>Hello, world!</h1>
  //         <p>This is a custom editor in VSCode.</p>
  //       `;
  //     }
  //   }
  // );

  // let disposable2 = vscode.commands.registerCommand('devpack.createModel', () => {
  //     const panel = vscode.window.createWebviewPanel(
  //       'catCoding',
  //       'Cat Coding',
  //       vscode.ViewColumn.One,
  //       {
  //         enableScripts: true, // Allow running scripts in the webview
  //         retainContextWhenHidden: true, // Keep the webview alive when hidden
  //       }
  //     );

  //     let iteration = 0;
  //     const updateWebview = () => {
  //       const cat = iteration++ % 2 ? 'Compiling Cat' : 'Coding Cat';
  //       panel.title = cat;
  //       // panel.webview.html = getWebviewContent(cat);
  //     };

  //     // Set initial content
  //     updateWebview();

  //     // And schedule updates to the content every second
  //     setInterval(updateWebview, 1000);
  // });
  // context.subscriptions.push(disposable2);
}

const cats = {
  'Coding Cat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
  'Compiling Cat': 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif'
};

function getWebviewContent(cat: keyof typeof cats) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    /* CSS styles for the webview */
  </style>
</head>
<body>
  <h1>Input Form</h1>
  <form id="input-form">
    <!-- Input fields for the user to enter their information -->
    <p>
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" />
    </p>
    <p>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" />
    </p>
    <p>
      <button type="submit">Submit</button>
    </p>
  </form>
  <script>
  </script>
</body>
</html>`;

}

function getFiles() {
  // Get file names under 'src/models/apps' folder
  const folderPath = './src/test';
  const workspaceFolder = path.join('/home/tyler/Desktop/projects/devpack', folderPath);
  const pattern = workspaceFolder + '/*.ts';
  // const result = vscode.workspace.findFiles(pattern);
  const files = fs.readdirSync(workspaceFolder);

  // Show the file names in the Output channel
  const outputChannel = vscode.window.createOutputChannel('Files');
  outputChannel.clear();
  outputChannel.appendLine(`Files under "${folderPath}"`);
  files.forEach(file => outputChannel.appendLine(file));
  outputChannel.show();

  // Register the Tree View
  return files;
}

// function handleData() {
//   // Handle the form submission
//   // const form = document.querySelector('#input-form');
//     vscode.
//     vscode.window.addEve
//     form.addEventListener('submit', (event: any) => {
//     event.preventDefault(); // Prevent the default form submission

//     // Get the input values
//     const name = (document.querySelector('#name')).value;
//     const email = (document.querySelector('#email')).value;
//   });
// }

function inputBox() {
  // Create the input box
  const inputBox = vscode.window.createInputBox();

  // Set the prompt message
  inputBox.prompt = 'Enter your name:';

  // Set the value to be displayed in the input box
  inputBox.value = 'John Doe';

  // Show the input box
  inputBox.show();
}

function getFilePathFromDialogBox() {
  // Show the file open dialog
  const filePath = vscode.window.showOpenDialog({
    canSelectFiles: true, // Allow selecting files
    canSelectFolders: false, // Disallow selecting folders
    canSelectMany: false // Allow only selecting one file
  });

  let returnPath = null;
  filePath.then((result) => {
    // If a file was selected, print its path
    if (result && result.length > 0) {
      console.log(result[0]);
      returnPath = result;
    }
  });

  return returnPath;
}

// This method is called when your extension is deactivated
export function deactivate() {}
