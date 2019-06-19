const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let window = null

// Wait until the app is ready
app.once('ready', () => {
  // Create a new window
  window = new BrowserWindow({
    // Set the initial width to 500px
    width: 700,
    // Set the initial height to 400px
    height: 500,
    // set the title bar style
    titleBarStyle: 'hiddenInset',
    // Don't show the window until it's ready, this prevents any white flickering
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  window.setMenu(null);
  window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  window.once('ready-to-show', () => {
    window.show()
  })
})
