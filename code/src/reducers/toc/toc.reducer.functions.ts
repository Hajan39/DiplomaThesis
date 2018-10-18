import { Dispatch } from "redux";
import { Alert } from "react-native";
import {
  CHECK_FOR_UPDATES,
  LOAD_NEW_TOC,
  ERROR_DOWNLOADING,
  NEW_VERSION_AVAILABLE,
  UP_TO_DATE,
  DROP_PENDING_CHANGES,
} from "./toc.reducer.constants";
import { fetchAuthorizedRequest, CONSTANTS } from "../../services";
import { ToCReducerState } from ".";
import { ToCFormat } from "../../models";
import { i18n } from "../../i18n";

export const answerAboutChanges = (accepted: boolean = false) => (dispatch: Dispatch<void>) => {
  console.log("Answer about change:", accepted);
  if (accepted === true) {
    dispatch({ type: LOAD_NEW_TOC });
  } else {
    dispatch({ type: DROP_PENDING_CHANGES });
  }
};

export const checkForUpdates = () => async (
  dispatch: Dispatch<void>,
  getState: () => Promise<{ tableOfCharges: ToCReducerState }>,
) => {
  console.debug("Get current state");
  const { tableOfCharges } = await getState();
  if (tableOfCharges.isLoading) {
    console.info("Fetch is already in progress.");
    return;
  }
  console.debug("Checking updates");
  dispatch({ type: CHECK_FOR_UPDATES });
  try {
    const result: ToCFormat = await (await fetchAuthorizedRequest(CONSTANTS.TOC_ENDPOINT)).json();
    console.debug("Information arrived.");
    if (
      !tableOfCharges.data || // There is no TOC data currently
      result.created > tableOfCharges.data.created // The creation date is newer on the server
    ) {
      console.debug("New version of ToC is available, fire action");
      dispatch({ type: NEW_VERSION_AVAILABLE, data: result });
      Alert.alert(
        i18n.t("popup:toc:update_available:title"),
        i18n.t("popup:toc:update_available:text"),
        [
          {
            text: i18n.t("common:NO"),
            onPress: () => dispatch(answerAboutChanges(false)),
            style: "destructive",
          },
          { text: i18n.t("common:YES"), onPress: () => dispatch(answerAboutChanges(true)) },
        ],
        { cancelable: false },
      );
    } else if (
      tableOfCharges.data &&
      result.created <= tableOfCharges.data.created &&
      tableOfCharges.data.hash !== result.hash
    ) {
      Alert.alert(
        i18n.t("popup:toc:hash_difference:title"),
        i18n.t("popup:toc:hash_difference:text"),
        [
          {
            text: i18n.t("common:NO"),
            onPress: () => dispatch(answerAboutChanges(false)),
            style: "cancel",
          },
          { text: i18n.t("common:YES"), onPress: () => dispatch(answerAboutChanges(true)) },
        ],
        { cancelable: false },
      );
    } else {
      console.debug("The ToC is up to date!");
      dispatch({ type: UP_TO_DATE });
    }
  } catch (error) {
    console.error(error.message, error.stack);
  }
};
