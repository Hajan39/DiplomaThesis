import { Action } from "redux";
import {
  START_LOGGING,
  STOP_LOGGING,
  SEND_LOGS,
  CLEAR_LOGS,
  LOG_MESSAGE,
  LOG_MESSAGE_LEVEL,
  LOGS_SENT,
  ERROR,
} from "./logger.reducer.constants";
import { Log, LogFunctions } from "./logger.reducer.types";

/**
 * Base type for LoggerReducer's actions
 */
export interface BaseAction extends Action {
  type: START_LOGGING | STOP_LOGGING | SEND_LOGS | LOGS_SENT | ERROR | CLEAR_LOGS | LOG_MESSAGE;
}

/**
 * This type of action will trigger the reducer to override the console log functions
 * which will result of collecting log messages in a store, which can be sen't to the server for diagnostics
 */
export class StartLogAction implements BaseAction {
  type: START_LOGGING;
  /**
   * Purge previously collected logs
   * @default false
   */
  purgeLogs: boolean = false;

  /**
   * Reducer's parameter: action for catch log messages and dispatch redux action
   */
  logFunctions: LogFunctions;

  /**
   * Only used for dehydratation
   */
  logs?: Log[];
}

/**
 * Action which will trigger the reducer to stop collecting the log messages, and restore the original log functions
 */
export class StopLogAction implements BaseAction {
  type: STOP_LOGGING;
  /**
   * Purge logs
   * @default false
   */
  purgeLogs: boolean = false;
  /**
   * Send the logs automatically
   * @default false
   */
  sendLogs: boolean = false;
}

/**
 * Action which will trigger the reducer to send the collected log messages to the endpoint
 * The endpoint can be overridden for test purpose
 */
export class SendLogsAction implements BaseAction {
  type: SEND_LOGS;
}

/**
 * Action which will trigger the reducer to send the collected log messages to the endpoint
 * The endpoint can be overridden for test purpose
 */
export class SendLogsCompleteAction implements BaseAction {
  type: LOGS_SENT;
}

/**
 * Action which will trigger the reducer to send the collected log messages to the endpoint
 * The endpoint can be overridden for test purpose
 */
export class SendLogsErrorAction implements BaseAction {
  type: ERROR;
}

/**
 * Action which will trigger the reducer to clear the collected logs
 */
export class ClearLogsAction implements BaseAction {
  type: CLEAR_LOGS;
}

export class WriteLogAction implements BaseAction {
  type: LOG_MESSAGE;
  message?: Log;
}
