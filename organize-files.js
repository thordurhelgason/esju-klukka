#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const desktopPath = path.join(process.env.USERPROFILE || process.env.HOME, 'Desktop');
const reposPath = path.join(desktopPath, 'repos');

// Create repos directory structure
const dirs = [reposPath, path.join(reposPath, 'context'), path.join(reposPath, 'screens'), path.join(reposPath, 'assets')];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✓ Created: ${dir}`);
  }
});

// Files to move
const files = [
  { src: 'Esju-Klukka-package.json', dest: 'package.json' },
  { src: 'Esju-Klukka-app.json', dest: 'app.json' },
  { src: 'Esju-Klukka-App.js', dest: 'App.js' },
  { src: 'Esju-Klukka-TimeContext.js', dest: 'context/TimeContext.js' },
  { src: 'Esju-Klukka-EmployeeScreen.js', dest: 'screens/EmployeeScreen.js' },
  { src: 'Esju-Klukka-ManagerScreen.js', dest: 'screens/ManagerScreen.js' },
  { src: 'Esju-Klukka-README.md', dest: 'README.md' },
  { src: 'setup-esju-klukka.bat', dest: 'setup.bat' },
  { src: 'move-files.bat', dest: 'move-files-backup.bat' },
];

// Copy files
files.forEach(file => {
  const srcPath = path.join(desktopPath, file.src);
  const destPath = path.join(reposPath, file.dest);
  
  if (fs.existsSync(srcPath)) {
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(srcPath, destPath);
    console.log(`✓ Moved: ${file.src} → ${file.dest}`);
  } else {
    console.log(`✗ Not found: ${file.src}`);
  }
});

console.log(`\n✓ All files organized in: ${reposPath}`);
console.log(`\nNext steps:`);
console.log(`  1. cd ${reposPath}`);
console.log(`  2. npm install`);
console.log(`  3. npm start`);
