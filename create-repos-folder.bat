@echo off
REM Create repos folder structure on Desktop

setlocal enabledelayedexpansion
set DESKTOP=%USERPROFILE%\Desktop

REM Create main repos folder
if not exist "%DESKTOP%\repos" (
    mkdir "%DESKTOP%\repos"
    echo Created repos folder
)

REM Create subdirectories
if not exist "%DESKTOP%\repos\context" mkdir "%DESKTOP%\repos\context"
if not exist "%DESKTOP%\repos\screens" mkdir "%DESKTOP%\repos\screens"
if not exist "%DESKTOP%\repos\assets" mkdir "%DESKTOP%\repos\assets"

echo.
echo Folder structure created successfully!
echo Location: %DESKTOP%\repos
echo.
echo Now run the CopilotCLI to copy the files or manually copy them from:
echo %DESKTOP%\Esju-Klukka-* to %DESKTOP%\repos\
echo.
pause
