@echo off
echo ===============================
echo AI Forester App Troubleshooter
echo ===============================
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

echo 2. Cleaning node_modules cache...
rmdir /s /q node_modules\.cache 2>nul
echo Cache cleared
echo.

echo 3. Cleaning Expo cache...
rmdir /s /q %USERPROFILE%\.expo 2>nul
echo Expo cache cleared
echo.

echo 4. Cleaning Metro bundler cache...
rmdir /s /q %TEMP%\metro-* 2>nul
rmdir /s /q %TEMP%\haste-* 2>nul
echo Metro cache cleared
echo.

echo 5. Starting Expo with tunnel connection...
echo This may take a moment to connect. Please be patient.
echo.
echo Press Ctrl+C to stop the server when done
echo.
npx expo start --tunnel --clear

