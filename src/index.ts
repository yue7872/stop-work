import type { ExtensionContext } from 'vscode'
import { commands, window, workspace } from 'vscode'

export function activate(context: ExtensionContext) {
  const disposable = commands.registerCommand('stop-work', () => {
    const openWindow = window.createTerminal('stop-work')
    const projectRoot = workspace.workspaceFolders![0].uri.path

    // ssh地址转换为https地址
    openWindow.sendText(`ls`)
    openWindow.show()
    window.showInformationMessage(`hello world! ${projectRoot}`)
  })

  context.subscriptions.push(disposable)
}

export function deactivate() {

}
