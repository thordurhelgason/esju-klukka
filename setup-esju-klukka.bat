@echo off
REM Esju-Klukka Installation Script
REM This script creates the complete project structure

cd /d %USERPROFILE%

REM Verify repos directory exists first, if not create it
if not exist "%USERPROFILE%\repos" mkdir "%USERPROFILE%\repos"

REM Create main project directory
if not exist "%USERPROFILE%\repos\Esju-Klukka" mkdir "%USERPROFILE%\repos\Esju-Klukka"
cd /d "%USERPROFILE%\repos\Esju-Klukka"

REM Create subdirectories
if not exist "context" mkdir "context"
if not exist "screens" mkdir "screens"
if not exist "assets" mkdir "assets"

echo Project directories created!
echo Location: %USERPROFILE%\repos\Esju-Klukka
echo.
echo Next steps:
echo 1. Copy the generated project files into this directory
echo 2. Run: npm install
echo 3. Run: expo start
