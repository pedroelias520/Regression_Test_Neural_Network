const { Console } = require('console')
const { app, BrowserWindow , session, ipcMain} = require('electron')
const path = require('path')
const windowsStateKeeper = require('electron-window-state')

var win
function createWindow () {
  let ses = session.defaultSession
  let getCookies = () => {
    ses.cookies.get({}).then(cookies => {console.log(cookies)}).catch(erros => {
      console.log(erros)
    })
  }


  let windowState = windowsStateKeeper({
    defaultWidth:1280,defaultHeight:720
  })

  console.log(windowState.height)
  console.log(windowState.width)
      win = new BrowserWindow({
      fullscreen:false,   
      width: 1280,
      height: 720,
      minWidth: windowState.width/2,
      minHeight:windowState.height/2,      
      resizable:false,
      maximizable:false,     
      useContentSize:false,       
      frame:false,
      transparent:true,         
      webPreferences: {
        nodeIntegration:true,
        contextIsolation: false
      }
    })
          
    //windowState.manage(win)
    win.loadFile('index.html')        
  }

  app.whenReady().then(() => {    
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
    })
  })

  app.on('before-quit', () => {
    console.log("Quiting the app")
  })

  app.on('browser-window-focus', () =>{
    app.relaunch()
  })
  
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  ipcMain.on('ExitApp',()=>{
    app.quit()
  })

  ipcMain.on('Products',()=>{
    const addProduts = new BrowserWindow({
      width: 800,
      height: 600,
      minWidth: 100,
      minHeight:200,      
      parent: win,
      modal:true,   
      show:false,
      frame:false,        
      webPreferences: {
        nodeIntegration:true,
        contextIsolation:false  
      }
    })
    
    addProduts.loadFile('public/screens/secondary_window.html')
    addProduts.show()
  })

  ipcMain.on('ToText',()=>{
    
  })