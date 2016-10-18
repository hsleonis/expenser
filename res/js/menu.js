const {Menu} = require('electron')

const template = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Expense',
                click (item, focusedWindow) {
                    if (!focusedWindow) {
                        const modalPath = path.join('file://', __dirname, '../../sections/windows/modal.html')
                        let win = new BrowserWindow({ frame: false })
                        win.on('close', function () { win = null })
                        win.loadURL(modalPath)
                        win.show()
                    }
                }
            },
            {
                type: 'separator'
            },
            {
                role: 'togglefullscreen'
            },
            {
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