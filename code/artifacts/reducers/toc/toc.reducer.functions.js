var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Alert } from "react-native";
import { CHECK_FOR_UPDATES, LOAD_NEW_TOC, NEW_VERSION_AVAILABLE, UP_TO_DATE, DROP_PENDING_CHANGES, } from "./toc.reducer.constants";
import { fetchAuthorizedRequest, CONSTANTS } from "../../services";
import { i18n } from "../../i18n";
export const answerAboutChanges = (accepted = false) => (dispatch) => {
    console.log("Answer about change:", accepted);
    if (accepted === true) {
        dispatch({ type: LOAD_NEW_TOC });
    }
    else {
        dispatch({ type: DROP_PENDING_CHANGES });
    }
};
export const checkForUpdates = () => (dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
    console.debug("Get current state");
    const { tableOfCharges } = yield getState();
    if (tableOfCharges.isLoading) {
        console.info("Fetch is already in progress.");
        return;
    }
    console.debug("Checking updates");
    dispatch({ type: CHECK_FOR_UPDATES });
    try {
        const result = yield (yield fetchAuthorizedRequest(CONSTANTS.TOC_ENDPOINT)).json();
        console.debug("Information arrived.");
        if (!tableOfCharges.data || // There is no TOC data currently
            result.created > tableOfCharges.data.created // The creation date is newer on the server
        ) {
            console.debug("New version of ToC is available, fire action");
            dispatch({ type: NEW_VERSION_AVAILABLE, data: result });
            Alert.alert(i18n.t("popup:toc:update_available:title"), i18n.t("popup:toc:update_available:text"), [
                {
                    text: i18n.t("common:NO"),
                    onPress: () => dispatch(answerAboutChanges(false)),
                    style: "destructive",
                },
                { text: i18n.t("common:YES"), onPress: () => dispatch(answerAboutChanges(true)) },
            ], { cancelable: false });
        }
        else if (tableOfCharges.data &&
            result.created <= tableOfCharges.data.created &&
            tableOfCharges.data.hash !== result.hash) {
            Alert.alert(i18n.t("popup:toc:hash_difference:title"), i18n.t("popup:toc:hash_difference:text"), [
                {
                    text: i18n.t("common:NO"),
                    onPress: () => dispatch(answerAboutChanges(false)),
                    style: "cancel",
                },
                { text: i18n.t("common:YES"), onPress: () => dispatch(answerAboutChanges(true)) },
            ], { cancelable: false });
        }
        else {
            console.debug("The ToC is up to date!");
            dispatch({ type: UP_TO_DATE });
        }
    }
    catch (error) {
        console.error(error.message, error.stack);
    }
});
