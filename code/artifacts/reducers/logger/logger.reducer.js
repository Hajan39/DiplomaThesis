import { persistReducer } from "redux-persist";
import { START_LOGGING, STOP_LOGGING, SEND_LOGS, CLEAR_LOGS, LOG_MESSAGE, LOGS_SENT, ERROR, } from "./logger.reducer.constants";
import { LoggerReducerState, initialState } from "./logger.reducer.types";
import { AsyncStorage } from "react-native";
/**
 * LoggerReducer:
 * It can be triggered to start collecting the console messages (debug, info, log, warn, error)
 * The log messages will be stored in a persistent layer
 * @param state LoggerReducerState
 * @param action Describes what should happen
 */
const Reducer = (state = initialState, action) => {
    switch (action.type) {
        /**
         * Starts to collect log messages,
         * overrides the original console log functions
         */
        case START_LOGGING: {
            return LoggerReducerState.assign(state, {
                collectionStarted: true,
                logs: action.purgeLogs === true ? [] : action.logs ? action.logs : state.logs,
            });
        }
        /**
         * Stops collecting log messages
         * and tries to restore the original console log functions
         */
        case STOP_LOGGING: {
            return LoggerReducerState.assign(initialState, state, {
                collectionStarted: false,
                logs: action.purgeLogs ? [] : state.logs,
            });
        }
        /**
         * Send log message collection to the server
         */
        case SEND_LOGS: {
            return LoggerReducerState.assign(initialState, state, {
                sending: true,
                error: false,
            });
        }
        /**
         * Send log message collection to the server has been  completed without any errors
         */
        case LOGS_SENT: {
            return LoggerReducerState.assign(initialState, state, {
                collectionStarted: state.collectionStarted,
                sending: false,
                error: false,
                logs: [],
            });
        }
        /**
         * Send log message collection to the server has been  completed without any errors
         */
        case ERROR: {
            return LoggerReducerState.assign(initialState, state, {
                collectionStarted: false,
                sending: false,
                error: true,
            });
        }
        /**
         * Clear collected logs
         */
        case CLEAR_LOGS: {
            return state;
        }
        case LOG_MESSAGE: {
            const newState = JSON.parse(JSON.stringify(state));
            newState.logs.push(action.message);
            return newState;
        }
        /**
         * returns the original state
         */
        default:
            return state;
    }
};
/**
 * Exports the reducer with persistent store
 */
export const LoggerReducer = persistReducer({ key: "logger", storage: AsyncStorage }, Reducer);
