var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { NetInfo } from "react-native";
import { LOGIN_FIRST_FACTOR, LOGIN_FIRST_FACTOR_RESULT, LOGIN_SECOND_FACTOR, LOGIN_SECOND_FACTOR_RESULT, LOGIN_CLEAR_CREDENTIALS, LOGIN_ERROR, LOGIN_ABORT, } from "./login.reducer.constants";
import { CONSTANTS } from "../../services";
import { encodeBody } from "../../helpers";
export const StartFirstStep = () => {
    return (dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
        const { form: { login_1st: { values: { phoneNumber, representativeId } } } } = getState();
        dispatch(fnDpFirstStep(phoneNumber, representativeId));
        const { url, options } = createFetchParameters({
            username: representativeId,
            password: phoneNumber,
            grant_type: "password",
            type: "no2f",
            client_id: CONSTANTS.CLIENT_ID,
        });
        const isConnected = yield NetInfo.isConnected.fetch();
        console.log("Start login process, first step. Connected to network: ", isConnected);
        if (isConnected) {
            const listener = info => handleNetworkChange(info, dispatch, listener);
            NetInfo.addEventListener("connectionChange", listener);
            try {
                console.log("Try to fetch the first URL: ", url, options);
                const data = yield fetch(url, options);
                console.log("First request is done, details: ", data);
                NetInfo.removeEventListener("connectionChange", listener);
                if (data.status === 400) {
                    const err = yield data.json();
                    if (err.error === "ok") {
                        dispatch(fnDpFirstStepResult(err.error, err.error_description));
                    }
                    else {
                        dispatch(fnDpLoginError(err.error, err.error.toUpperCase()));
                    }
                }
                else if (data.status) {
                    dispatch(fnDpLoginError("SERVER_ERROR"));
                }
            }
            catch (err) {
                console.warn("Network error:", err);
                NetInfo.removeEventListener("connectionChange", listener);
                handleNetworkErrors(dispatch);
            }
        }
    });
};
function handleNetworkChange(connectionInfo, dispatch, listener) {
    if (connectionInfo.type.toLowerCase() === "none") {
        dispatch(fnDpLoginError("NO_INTERNET"));
        NetInfo.removeEventListener("connectionChange", listener);
    }
}
function handleNetworkErrors(dispatch) {
    setTimeout(() => {
        NetInfo.isConnected.fetch().then((isConnected) => {
            if (!isConnected) {
                dispatch(fnDpLoginError("NO_INTERNET"));
            }
            else {
                dispatch(fnDpLoginError("SERVER_ERROR"));
            }
        });
    }, 1000);
}
function createFetchParameters(body) {
    const url = `${CONSTANTS.AUTHORIZATION_SERVER}oauth2/token`;
    const options = {
        method: "post",
        headers: CONSTANTS.OAUTH_HEADER,
        body: encodeBody(body),
    };
    return { url, options };
}
export const StartSecondStep = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { login: { validationToken, representativeId, phoneNumber }, form: { login_2nd: { values } }, } = state;
        let smsCode = null;
        if (values && values.smsCode)
            smsCode = values.smsCode;
        if (!smsCode)
            console.error("You must provide the SMS code!");
        dispatch(fnDpSecondStep(smsCode, validationToken));
        const { url, options } = createFetchParameters({
            username: representativeId,
            password: phoneNumber,
            grant_type: "password",
            type: "2f",
            validationText: smsCode,
            validationToken: validationToken,
            client_id: CONSTANTS.CLIENT_ID,
        });
        fetch(url, options)
            .then(data => {
            if (data.ok) {
                data.json().then(jsonData => {
                    dispatch(fnDpSecondStepResult(jsonData.access_token, jsonData.token_type, jsonData.expires_in));
                });
            }
            else {
                data.json().then(err => {
                    dispatch(fnDpLoginError(err.error, err.error.toUpperCase()));
                });
            }
        })
            .catch((err) => handleNetworkErrors(dispatch));
    };
};
export const Logout = () => {
    return dispatch => {
        dispatch(fnDpLogout());
    };
};
export const Abort = () => {
    return dispatch => {
        dispatch(fnDpAbort());
    };
};
const fnDpFirstStep = (phoneNumber, representativeId) => {
    return { type: LOGIN_FIRST_FACTOR, phoneNumber: phoneNumber, representativeId: representativeId };
};
const fnDpSecondStep = (smsCode, validationToken) => {
    return { type: LOGIN_SECOND_FACTOR, validationText: smsCode, validationToken: validationToken };
};
const fnDpLoginError = (errorCode, errorMessage = errorCode) => {
    return { type: LOGIN_ERROR, errorCode: errorCode, errorMessage: errorMessage };
};
const fnDpLogout = () => {
    return { type: LOGIN_CLEAR_CREDENTIALS };
};
const fnDpAbort = () => {
    return { type: LOGIN_ABORT };
};
const fnDpFirstStepResult = (errorCode, errorMessage) => {
    return { type: LOGIN_FIRST_FACTOR_RESULT, errorCode: errorCode, errorMessage: errorMessage };
};
const fnDpSecondStepResult = (accessToken, tokenType, expiresIn) => {
    return {
        type: LOGIN_SECOND_FACTOR_RESULT,
        accessToken: accessToken,
        tokenType: tokenType,
        expiresIn: expiresIn,
        created: new Date(),
    };
};
