@echo off
echo ==============================
echo AI Forester App Troubleshooter
echo ==============================
echo.
echo This script will help troubleshoot Expo startup issues
echo.

echo 1. Clearing watchman watches (if installed)...
watchman watch-del-all 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo Watchman not installed or not in PATH - skipping
) else (
  echo Watchman watches cleared
)
echo.

echo 2. Clearing Metro cache...
rmdir /s /q node_modules\.cache 2>nul
echo Metro cache cleared
echo.

echo 3. Starting Expo with tunnel and clear cache options...
echo This will establish a secure connection through Expo's servers
echo.
echo Press Ctrl+C to stop the server when done
echo.
npx expo start --tunnel --clear

