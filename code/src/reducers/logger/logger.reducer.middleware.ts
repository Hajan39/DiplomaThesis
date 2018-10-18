import { Action, Dispatch, Middleware, MiddlewareAPI } from "redux";

import { REHYDRATE, RehydrateAction, PersistorAction } from "redux-persist";

import { StartLogAction, StopLogAction } from "./logger.reducer.actions";
import { START_LOGGING, STOP_LOGGING, SEND_LOGS, LOG_MESSAGE } from "./logger.reducer.constants";
import { LogFunctions } from "./logger.reducer.types";

export const LoggerMiddleware: Middleware = (api: MiddlewareAPI<void>) => (
  next: Dispatch<void>,
) => <A extends StartLogAction | StopLogAction | RehydrateAction | Action>(action: A) => {
  switch (action.type) {
    case START_LOGGING:
      saveOriginalFunctions();
      overrideLogFunctions(next);
      break;
    case STOP_LOGGING:
      restoreOriginalFunctions();
      const stopAction = action as StopLogAction;
      if (stopAction.sendLogs === true) {
        next({ type: SEND_LOGS });
      }
      break;
    case REHYDRATE:
      // The application returned to running state while it was about to collect logs,
      const hydrateAction = action as RehydrateAction;
      if (
        hydrateAction.key === "logger" &&
        hydrateAction.payload &&
        hydrateAction.payload.collectionStarted === true
      ) {
        // We should continue catching log messages
        saveOriginalFunctions();
        overrideLogFunctions(next);
      }
      break;
    default:
      return next(action);
  }
  return next(action);
};

// tslint:disable-next-line:no-var-keyword
const logs: any = {};

/**
 * Saves the original log functions to a local variable
 */
const saveOriginalFunctions = () => {
  logs.log = console.log;
  logs.debug = console.debug;
  logs.info = console.info;
  logs.warn = console.warn;
  logs.error = console.error;
};

/**
 * Restores the original functionality of console log functions
 */
const restoreOriginalFunctions = () => {
  if (logs.log) console.log = logs.log;
  if (logs.debug) console.debug = logs.debug;
  if (logs.info) console.info = logs.info;
  if (logs.warn) console.warn = logs.warn;
  if (logs.error) console.error = logs.error;
};

/**
 * Overrides the original console log functions with a new one which will dispatch a LOGGER/LOG_MESSAGE action on each log,
 * but it will still log to the console for debug purposes
 * @param dispatch Dispatch to reducer
 */
const overrideLogFunctions = (dispatch: Dispatch<void>): void => {
  console.debug = (message?: any, ...optionalParams: any[]) => {
    const type = "DEBUG";
    setTimeout(() =>
      dispatch({
        type: LOG_MESSAGE,
        message: {
          level: type,
          created: new Date(),
          message: message,
          optionalParams: optionalParams,
        },
      }),
    );
    logs.log(`[${type}] ${message}`, ...optionalParams);
  };
  console.info = (message?: any, ...optionalParams: any[]) => {
    const type = "INFO";
    setTimeout(() =>
      dispatch({
        type: LOG_MESSAGE,
        message: {
          level: type,
          created: new Date(),
          message: message,
          optionalParams: optionalParams,
        },
      }),
    );
    logs.log(`[${type}] ${message}`, ...optionalParams);
  };
  console.log = (message?: any, ...optionalParams: any[]) => {
    const type = "INFO";
    setTimeout(() =>
      dispatch({
        type: LOG_MESSAGE,
        message: {
          level: type,
          created: new Date(),
          message: message,
          optionalParams: optionalParams,
        },
      }),
    );
    logs.log(`[${type}] ${message}`, ...optionalParams);
  };
  console.warn = (message?: any, ...optionalParams: any[]) => {
    const type = "WARN";
    setTimeout(() =>
      dispatch({
        type: LOG_MESSAGE,
        message: {
          level: type,
          created: new Date(),
          message: message,
          optionalParams: optionalParams,
        },
      }),
    );
    logs.log(`[${type}] ${message}`, ...optionalParams);
  };

  console.error = (message?: any, ...optionalParams: any[]) => {
    const type = "ERROR";
    setTimeout(() =>
      dispatch({
        type: LOG_MESSAGE,
        message: {
          level: type,
          created: new Date(),
          message: message,
          optionalParams: optionalParams,
        },
      }),
    );
    logs.log(`[${type}] ${message}`, ...optionalParams);
  };
};
