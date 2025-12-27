@echo off
echo =================================================
echo.
echo      HAJARO GRAHAKO DEPLOYMENT SCRIPT
echo.
echo =================================================
echo.
echo Setting project directory...
cd "%~dp0"
echo Current directory: %cd%
echo.
echo Installing dependencies (if needed)...
call npm install
echo.
echo Building the application...
call npm run build
echo.
echo Deploying to Firebase Hosting...
call firebase deploy --only hosting
echo.
echo =================================================
echo.
echo      DEPLOYMENT COMPLETE!
echo.
echo      Your app should be live shortly.
echo.
echo =================================================
echo.
pause
