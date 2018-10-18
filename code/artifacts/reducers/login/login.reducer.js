import { persistReducer } from "redux-persist";
import { LoginReducerState, initialState } from "./login.reducer.types";
import { LOGIN_FIRST_FACTOR, LOGIN_FIRST_FACTOR_RESULT, LOGIN_SECOND_FACTOR, LOGIN_SECOND_FACTOR_RESULT, LOGIN_CLEAR_CREDENTIALS, LOGIN_ERROR, LOGIN_ABORT, LOGIN_CLEAR_ERROR, LOGIN_REHYDRATE, } from "./login.reducer.constants";
import { AsyncStorage } from "react-native";
import { setToken, resetToken } from "../../services/networking";
const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_FIRST_FACTOR:
            return LoginReducerState.assign({}, state, {
                loading: true,
                phoneNumber: action.phoneNumber,
                representativeId: action.representativeId,
                validationToken: null,
                accessToken: null,
                errorMessage: null,
                step: 1,
            });
        case LOGIN_FIRST_FACTOR_RESULT:
            if (action.errorCode === "ok") {
                return LoginReducerState.assign(state, {
                    loading: false,
                    errorMessage: null,
                    step: 2,
                    validationToken: action.errorMessage,
                });
            }
            else
                return LoginReducerState.assign({}, state, {
                    loading: false,
                    errorMessage: action.errorMessage,
                    step: 1,
                    validationToken: null,
                });
        case LOGIN_SECOND_FACTOR:
            return LoginReducerState.assign(state, { loading: true, smsCode: action.validationText });
        case LOGIN_SECOND_FACTOR_RESULT:
            if (action.accessToken) {
                setToken(action.accessToken);
                return LoginReducerState.assign(state, {
                    loading: false,
                    accessToken: action.accessToken,
                    tokenType: action.tokenType,
                    created: action.created,
                    expiresIn: action.expiresIn,
                    step: 3,
                });
            }
            return state;
        case LOGIN_CLEAR_CREDENTIALS:
            resetToken();
            return LoginReducerState.assign(initialState, { loading: false });
        case LOGIN_ABORT:
            return LoginReducerState.assign(state, { step: 1, loading: false });
        case LOGIN_ERROR:
            if (action.errorCode === "invalid_code") {
                return LoginReducerState.assign(state, {
                    errorMessage: action.errorMessage,
                    errorCode: action.errorCode,
                    loading: false,
                    step: 2,
                });
            }
            else {
                return LoginReducerState.assign(state, {
                    loading: false,
                    errorMessage: action.errorMessage,
                    errorCode: action.errorCode,
                });
            }
        case LOGIN_CLEAR_ERROR:
            return LoginReducerState.assign(state, { errorCode: null, errorMessage: null });
        case LOGIN_REHYDRATE:
            if (action.key === "login" && action.payload && action.payload.accessToken) {
                setToken(action.payload.accessToken);
            }
            return state;
        default:
            return state;
    }
};
export const LoginReducer = persistReducer({
    key: "login",
    blacklist: ["loading"],
    storage: AsyncStorage,
}, Reducer);
