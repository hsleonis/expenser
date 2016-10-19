const {Menu} = require('electron')
const path = require('path')

const template = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Expense',
                click (item, focusedWindow) {

                        const modalPath = path.join('file://'+__dirname+'/windows/month/month.html')
                        let win = new BrowserWindow({ })
                        win.on('close', function () { win = null })
                        win.loadURL(modalPath)
                        win.show()

                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Toggle Developer Tools',
                accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                click (item, focusedWindow) {
                    if (focusedWindow) focusedWindow.webContents.toggleDevTools()
                }
            },
            {
                role: 'togglefullscreen'
            },
            {
                label: 'Exit',
                role: 'close'
            }
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Support',
                click () { require('electron').shell.openExternal('http://themeaxe.com') }
            }
        ]
    }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)