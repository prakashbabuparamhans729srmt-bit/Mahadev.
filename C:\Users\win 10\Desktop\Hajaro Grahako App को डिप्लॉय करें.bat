@echo off
echo =======================================================
echo.
echo    Hajaro Grahako App Deployment Automation
echo.
echo =======================================================
echo.
echo Navigating to the project directory...
cd "C:\Users\win 10\studio-953489467-c7e5b"

echo.
echo Starting the build process... (This may take a few minutes)
echo.
call npm run build

echo.
echo Build complete. Starting deployment to Firebase...
echo.
call firebase deploy --only hosting

echo.
echo =======================================================
echo.
echo    DEPLOYMENT COMPLETE!
echo.
echo    Your app should be live at: https://studio-953489467-c7e5b.web.app
echo.
echo =======================================================
echo.
echo This window will close in 30 seconds...
timeout /t 30
    