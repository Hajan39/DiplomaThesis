Tento dokument slouží ke spuštění kódu, který je přiložen ve složce ./code/. Tento dokument předpokládá nastavené prostředí, tedy nainstalované
- Node.js
- AndroidStudio
- nastavené proměnné ANDROID_HOME
- v případě iOS také XCode

——————— Pro všechny verze společné ——————————
ve složce .code spusťe v Terminálu:

rm -rf android
rm -rf ios
rm -rf node_modules && npm install
react-native upgrade
npm install react-native-vector-icons --save
react-native link react-native-vector-icons
react-native link react-native-languages
npm run watch

———————— iOS verze ———————————
Pro testování na iOS, stačí spustit v terminálu příkaz:
react-native run-ios


Pokud chcete tuto aplikaci na mobilní telefonu, připojte jej k počítači, nastavte v XCode vývojářský mód. Také upravte řádek v AppDelegate, který nastavuje jsCodeLocation a vložte tento a uložte:

jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];

Nakonec následující kód spusťte v terminálu:

react-native bundle --entry-file index.ios.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios

Následně otevřete XCode, vymažte

————————— Android verze —————————
Připojte mobilní telefon v terminálu spusťte následující dva řádky:

react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
react-native run-android
