const { app, BrowserWindow } = require('electron');
const path = require('path');

console.log('[Electron] Starting...');
console.log('[Electron] Process versions:', process.versions);

function createWindow() {
  console.log('[Electron] Creating window...');
  
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'), // preload не используется, пока можно убрать
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  const isDev = process.argv.includes('--dev');

  // В режиме разработки всегда загружаем с локального сервера React
  if (isDev) {
    console.log('[Electron] Loading from dev server: http://localhost:3000');
    win.loadURL('http://localhost:3000');
    // Автоматически открываем инструменты разработчика для отладки
    win.webContents.openDevTools();
  } 
  // В режиме продакшена (после сборки) загружаем файл
  else {
    const buildPath = path.join(__dirname, '../build/index.html');
    console.log(`[Electron] Loading from build: ${buildPath}`);
    win.loadFile(buildPath);
  }
}

app.whenReady().then(() => {
  console.log('[Electron] App is ready');
  createWindow();
});

app.on('window-all-closed', () => {
  console.log('[Electron] All windows closed');
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
});

// Глобальный обработчик неперехваченных исключений
process.on('uncaughtException', (err) => {
  console.error('Electron Crash:', err);
  
  // Автовосстановление
  setTimeout(() => {
    app.relaunch();
    app.exit(0);
  }, 1000);
}); 