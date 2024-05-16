import type { ExtensionContext } from 'vscode'
import { StatusBarAlignment, commands, window, workspace } from 'vscode'
import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'
import { diffTime } from './utils/diffTime'
import { getConfig } from './utils/config'

dayjs.extend(RelativeTime)
let runTimer: NodeJS.Timer
let updateSecond: number

export function activate(context: ExtensionContext) {
  let flag = true
  const disposable = commands.registerCommand('stop-work', () => {
    window.showInformationMessage('💰人生不摆烂，快乐少一半')
  })
  const homeBarItem = window.createStatusBarItem(StatusBarAlignment.Left, 10000)
  // homeBarItem.command = 'stop-work'

  const updateHomeBarItem = () => {
    updateSecond = getConfig('updateSecond') || 10
    const dayMoney: number = getConfig('dayMoney') || 20
    const startTime: string = getConfig('startTime') || '9:00'
    const stopTime: string = getConfig('stopTime') || '18:00'

    const start = dayjs(`${dayjs().format('YYYY-MM-DD')} ${startTime}`)
    const stop = dayjs(`${dayjs().format('YYYY-MM-DD')} ${stopTime}`)

    const niumaTotal = diffTime(start, stop).remainTime

    // 剩余时间
    const { h, m } = diffTime(dayjs(), stop)
    const niumaTime = diffTime(start, dayjs()).remainTime
    const madeMoney = (niumaTime / niumaTotal * dayMoney).toFixed(4)
    homeBarItem.text = `🏃${h}小时${m}分 💰${madeMoney}元`
    if (h === 0 && m === 15 && flag) {
      window.showInformationMessage('还有15分钟下班，快逃')
      flag = false
    }

    if (niumaTime / niumaTotal > 1) {
      const { h, m } = diffTime(stop, dayjs())
      homeBarItem.text = `🐮${dayMoney}元 🐎加班${h}小时${m}分`
    }
    homeBarItem.show()
  }

  updateHomeBarItem()

  runTimer && clearInterval(runTimer)
  runTimer = setInterval(() => {
    updateHomeBarItem()
  }, updateSecond * 1000)

  const configChange = workspace.onDidChangeConfiguration(() => {
    updateHomeBarItem()
    runTimer && clearInterval(runTimer)
    runTimer = setInterval(() => {
      updateHomeBarItem()
    }, updateSecond * 1000)
  })
  context.subscriptions.push(disposable, homeBarItem, configChange)
}

export function deactivate() {
  runTimer && clearInterval(runTimer)
}
