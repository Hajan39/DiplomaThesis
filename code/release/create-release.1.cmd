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
echo Remove APP-RELEASE-UNSIGNED.APK
del app-release-unsigned.apk
echo Remove APP-RELEASE-SIGNED.APK
del app-release-signed.apk
echo COPY NEW APP-RELEASE-UNSIGNED.APK
copy ..\android\app\build\outputs\apk\release\app-release-unsigned.apk .\app-release-unsigned.apk
echo SIGN APK
call jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ./MyStore.keystore ./app-release-unsigned.apk furytechs
echo ZIPALIGN APK
call zipalign -v 4 ./app-release-unsigned.apk app-release-signed.apk
call adb uninstall com.provident.agentcockpitnt
call adb install app-release-signed.apk
