import I18n from "i18next";
import translations from "./translations";
import { reactI18nextModule } from "react-i18next";
import RNLanguages from "react-native-languages";
const languageDetector = {
    type: "languageDetector",
    async: true,
    detect: callback => {
        console.log("Detected language:", RNLanguages.language);
        callback(RNLanguages.language);
    },
    init: () => null,
    cacheUserLanguage: () => undefined,
};
export const i18n = I18n
    // .use(Backend)
    .use(languageDetector)
    .use(reactI18nextModule)
    .init({
    resources: translations,
    fallbackLng: "en",
    // have a common namespace used around the full app
    ns: ["common", "loginErrors", "businessResults"],
    defaultNS: "common",
    debug: false,
    interpolation: {
        escapeValue: false,
    },
    appendNamespaceToMissingKey: false,
    parseMissingKeyHandler: () => null,
    react: {
        wait: true,
    },
});
