import { Dispatch } from "redux";
import {
  StartLogAction,
  StopLogAction,
  SendLogsAction,
  SendLogsErrorAction,
  SendLogsCompleteAction,
} from "./logger.reducer.actions";
import {
  START_LOGGING,
  STOP_LOGGING,
  SEND_LOGS,
  ERROR,
  LOGS_SENT,
} from "./logger.reducer.constants";
import { Log } from "./logger.reducer.types";
import { encodeBody } from "../../helpers";
import { fetchAuthorizedRequest } from "../../services";

export const StartLogCollection = (purgeLogs: boolean = false): StartLogAction => ({
  type: START_LOGGING,
  purgeLogs: purgeLogs,
  logFunctions: null,
});

export const StopLogCollection = (
  purgeLogs: boolean = false,
  sendLogs: boolean = false,
): StopLogAction => ({
  type: STOP_LOGGING,
  purgeLogs: purgeLogs,
  sendLogs: sendLogs,
});

const createSendLogsAction = (): SendLogsAction => ({ type: SEND_LOGS });
const createSendLogsCompleteAction = (): SendLogsCompleteAction => ({ type: LOGS_SENT });
const createSendLogsErrorAction = (): SendLogsErrorAction => ({ type: ERROR });

export const SendLogs = (url: string) => async (dispatch: Dispatch<void>, getState) => {
  dispatch(createSendLogsAction());
  const { logger: { logs } }: { logger: { logs: Log[] } } = getState();
  try {
    const result = await fetchAuthorizedRequest(url, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ logs }),
    });
  } catch (error) {
    console.error(error.message, error.name, error.stack);
    dispatch(createSendLogsErrorAction());
    return;
  }
  dispatch(createSendLogsCompleteAction());
};
