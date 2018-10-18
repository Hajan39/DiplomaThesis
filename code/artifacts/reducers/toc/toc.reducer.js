import { AsyncStorage } from "react-native";
import { persistReducer } from "redux-persist";
import { CHECK_FOR_UPDATES, LOAD_NEW_TOC, ERROR_DOWNLOADING, NEW_VERSION_AVAILABLE, UP_TO_DATE, DROP_PENDING_CHANGES, } from "./toc.reducer.constants";
import { initialState } from "./toc.reducer.types";
const Reducer = (state = initialState, action) => {
    switch (action.type) {
        /**
         * When the application starts to fetch ToC from the server, we should fire this action
         */
        case CHECK_FOR_UPDATES:
            return Object.assign({}, state, { pendingChanges: null, isLoading: true, error: false });
        /**
         * When the user accepts the update of ToC, we should put the toc from the
         * `pendingChanges` to the `data` field
         */
        case LOAD_NEW_TOC:
            return Object.assign({}, state, {
                isLoading: false,
                error: false,
                data: JSON.parse(JSON.stringify(state)).pendingChanges,
                pendingChanges: null,
            });
        /**
         * Whenever a new ToC data arrives, we store it in the `pendingChanges` field
         */
        case NEW_VERSION_AVAILABLE:
            return Object.assign({}, state, {
                pendingChanges: action.data,
            });
        case DROP_PENDING_CHANGES:
            return Object.assign({}, state, { pendingChanges: null, isLoading: false, error: false });
        case UP_TO_DATE:
            return Object.assign({}, state, { pendingChanges: null, isLoading: false, error: false });
        case ERROR_DOWNLOADING:
            return Object.assign({}, state, { pendingChanges: null, isLoading: false, error: true });
        default:
            return state;
    }
};
export const TableOfChargesReducer = persistReducer({ key: "tableOfCharges", storage: AsyncStorage, blacklist: ["isLoading"] }, Reducer);
