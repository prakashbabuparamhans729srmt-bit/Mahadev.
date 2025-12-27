@echo off
echo =======================================================
echo  Hajaro Grahako Deployment Script
echo =======================================================
echo.
echo Changing directory to the project folder...
cd /d "%~dp0"
echo Current directory: %cd%
echo.

echo Building the Next.js application...
call npm run build

echo.
echo Deploying to Firebase Hosting...
call firebase deploy --only hosting

echo.
echo =======================================================
echo  Deployment complete!
echo =======================================================
echo.
pause
