var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { START_LOGGING, STOP_LOGGING, SEND_LOGS, ERROR, LOGS_SENT, } from "./logger.reducer.constants";
import { fetchAuthorizedRequest } from "../../services";
export const StartLogCollection = (purgeLogs = false) => ({
    type: START_LOGGING,
    purgeLogs: purgeLogs,
    logFunctions: null,
});
export const StopLogCollection = (purgeLogs = false, sendLogs = false) => ({
    type: STOP_LOGGING,
    purgeLogs: purgeLogs,
    sendLogs: sendLogs,
});
const createSendLogsAction = () => ({ type: SEND_LOGS });
const createSendLogsCompleteAction = () => ({ type: LOGS_SENT });
const createSendLogsErrorAction = () => ({ type: ERROR });
export const SendLogs = (url) => (dispatch, getState) => __awaiter(this, void 0, void 0, function* () {
    dispatch(createSendLogsAction());
    const { logger: { logs } } = getState();
    try {
        const result = yield fetchAuthorizedRequest(url, {
            credentials: "include",
            method: "POST",
            body: JSON.stringify({ logs }),
        });
    }
    catch (error) {
        console.error(error.message, error.name, error.stack);
        dispatch(createSendLogsErrorAction());
        return;
    }
    dispatch(createSendLogsCompleteAction());
});
