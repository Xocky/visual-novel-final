const fs = require('fs');
const path = require('path');

console.log('===== Electron Diagnostics =====');

// Проверка установки Electron
try {
  const electronPath = require.resolve('electron');
  console.log('✓ Electron found at:', electronPath);
} catch (e) {
  console.error('✗ Electron not found in node_modules. Please run "npm install".');
}

// Проверка PATH
console.log('PATH variable:', process.env.PATH);

// Проверка бинарников в .bin
const binPath = path.join(__dirname, 'node_modules', '.bin');
console.log('Checking for binaries in:', binPath);

if (fs.existsSync(binPath)) {
    fs.readdir(binPath, (err, files) => {
      if (err) {
        console.error('✗ Error reading .bin directory:', err);
        return;
      }
      
      console.log('Binaries found:', files.join(', '));
      const hasElectron = files.some(f => f.startsWith('electron'));
      console.log(hasElectron ? '✓ Electron binary found in .bin' : '✗ Electron binary MISSING in .bin');
    });
} else {
    console.error(`✗ Directory not found: ${binPath}`);
}

console.log('==============================='); 