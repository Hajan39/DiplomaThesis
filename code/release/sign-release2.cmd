@echo off
echo Remove APP-RELEASE-UNSIGNED.APK
del app-release-unsigned.apk
echo Remove APP-RELEASE-SIGNED.APK
del app-release-signed.apk
echo COPY NEW APP-RELEASE-UNSIGNED.APK
copy ..\android\app\build\outputs\apk\release\app-release-unsigned.apk .\app-release-unsigned.apk
echo SIGN APK
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ./MyStore.keystore ./app-release-unsigned.apk furytechs
echo ZIPALIGN APK
zipalign -v 4 ./app-release-unsigned.apk app-release-signed.apk
adb uninstall com.provident.agentcockpitnt
adb install app-release-signed.apk
