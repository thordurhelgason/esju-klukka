@echo off
setlocal enabledelayedexpansion

REM Move all Esju-Klukka files to repos folder

set DESKTOP=%USERPROFILE%\Desktop
set REPOS_FOLDER=%DESKTOP%\repos

REM Create repos folder if it doesn't exist
if not exist "%REPOS_FOLDER%" (
    mkdir "%REPOS_FOLDER%"
    echo Created folder: %REPOS_FOLDER%
)

REM Move all Esju-Klukka files
for %%F in ("%DESKTOP%\Esju-Klukka-*") do (
    move "%%F" "%REPOS_FOLDER%\" >nul
    echo Moved: %%~nxF
)

REM Move setup script
if exist "%DESKTOP%\setup-esju-klukka.bat" (
    move "%DESKTOP%\setup-esju-klukka.bat" "%REPOS_FOLDER%\" >nul
    echo Moved: setup-esju-klukka.bat
)

echo.
echo All files moved to: %REPOS_FOLDER%
echo.
echo Contents:
dir "%REPOS_FOLDER%"

pause
