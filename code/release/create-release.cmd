@echo off
echo CLEAN TARGET DIRECTORY
del ..\android\app\build\outputs\apk\app-release-unsigned.apk
echo BUILD NEW VERSION
cd ..
call npm run build
cd android
call gradlew clean
call gradlew.bat assembleRelease
cd ../release/
