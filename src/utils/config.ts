import { workspace } from 'vscode'

export const getConfig: any = (configName: string) => {
  const config = workspace.getConfiguration('stopWork').get(configName)
  return config
}
