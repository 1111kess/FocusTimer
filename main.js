const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 1100,
    height: 750,
    minWidth: 900,
    minHeight: 600,
    backgroundColor: '#f4f4f5',
    title: '专注计时器',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  // 加载你原来的 HTML
  win.loadFile('index.html');

  // 可选：隐藏菜单栏，让它更像一个小组件
  win.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 关闭所有窗口时退出（mac 保留常见行为）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});