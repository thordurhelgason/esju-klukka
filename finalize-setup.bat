@echo off
setlocal enabledelayedexpansion

set REPO_PATH=C:\Users\Þórður Örn\Desktop\repos

REM Move and rename files to proper locations
echo Organizing project files...

REM Move package.json
if exist "%REPO_PATH%\Esju-Klukka-package.json" (
    move "%REPO_PATH%\Esju-Klukka-package.json" "%REPO_PATH%\package.json" >nul
    echo ✓ Renamed package.json
)

REM Move app.json
if exist "%REPO_PATH%\Esju-Klukka-app.json" (
    move "%REPO_PATH%\Esju-Klukka-app.json" "%REPO_PATH%\app.json" >nul
    echo ✓ Renamed app.json
)

REM Move App.js
if exist "%REPO_PATH%\Esju-Klukka-App.js" (
    move "%REPO_PATH%\Esju-Klukka-App.js" "%REPO_PATH%\App.js" >nul
    echo ✓ Renamed App.js
)

REM Move TimeContext.js to context folder
if exist "%REPO_PATH%\Esju-Klukka-TimeContext.js" (
    move "%REPO_PATH%\Esju-Klukka-TimeContext.js" "%REPO_PATH%\context\TimeContext.js" >nul
    echo ✓ Moved TimeContext.js to context/
)

REM Move EmployeeScreen.js to screens folder
if exist "%REPO_PATH%\Esju-Klukka-EmployeeScreen.js" (
    move "%REPO_PATH%\Esju-Klukka-EmployeeScreen.js" "%REPO_PATH%\screens\EmployeeScreen.js" >nul
    echo ✓ Moved EmployeeScreen.js to screens/
)

REM Move ManagerScreen.js to screens folder
if exist "%REPO_PATH%\Esju-Klukka-ManagerScreen.js" (
    move "%REPO_PATH%\Esju-Klukka-ManagerScreen.js" "%REPO_PATH%\screens\ManagerScreen.js" >nul
    echo ✓ Moved ManagerScreen.js to screens/
)

REM Move README.md
if exist "%REPO_PATH%\Esju-Klukka-README.md" (
    move "%REPO_PATH%\Esju-Klukka-README.md" "%REPO_PATH%\README.md" >nul
    echo ✓ Renamed README.md
)

echo.
echo Project structure organized!
echo Location: %REPO_PATH%
echo.
echo Ready to install dependencies. Run: npm install
pause
