@echo off
echo =======================================
echo.
echo  Hajaro Grahako Deployment Script
echo.
echo =======================================
echo.
echo Step 1: Building the application...
call npm run build

IF %ERRORLEVEL% NEQ 0 (
    echo.
    echo !!!!! BUILD FAILED !!!!!
    echo Please check the error messages above.
    pause
    exit /b
)

echo.
echo Build successful!
echo.
echo Step 2: Deploying to Firebase Hosting...
call firebase deploy --only hosting

echo.
echo =======================================
echo.
echo  Deployment script finished.
echo.
echo =======================================
pause
