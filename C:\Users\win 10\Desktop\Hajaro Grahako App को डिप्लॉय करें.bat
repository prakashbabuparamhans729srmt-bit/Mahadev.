@echo off
echo ============================================
echo  HAJARO GRAHAKO DEPLOYMENT SCRIPT
echo ============================================
echo.
echo Locating project folder...
cd "C:\Users\win 10\studio-953489467-c7e5b"

if %errorlevel% neq 0 (
    echo ERROR: Could not find the project folder. Please contact support.
    pause
    exit /b
)

echo Found project folder! Starting deployment...
echo.

echo Step 1: Building the application...
call npm run build

if %errorlevel% neq 0 (
    echo ERROR: The build process failed. Please check the logs above.
    pause
    exit /b
)

echo Build successful!
echo.
echo Step 2: Deploying to Firebase...
call firebase deploy --only hosting

if %errorlevel% neq 0 (
    echo ERROR: Deployment to Firebase failed. Please check the logs above.
    pause
    exit /b
)

echo.
echo ============================================
echo  SUCCESS! Your app has been deployed.
echo ============================================
echo.
pause
