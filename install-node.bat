@echo off
REM Install Node.js using Chocolatey

echo Installing Node.js and npm...
echo This requires administrator privileges.
echo.

REM Check if Chocolatey is installed
where choco >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Chocolatey not found. Installing Chocolatey first...
    powershell -Command "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))"
)

REM Install Node.js
choco install nodejs -y

echo.
echo ✓ Installation complete!
echo.
node --version
npm --version
echo.
echo You can now run: npm install
echo.
pause
