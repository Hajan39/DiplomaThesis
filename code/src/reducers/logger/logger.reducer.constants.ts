/**
 * START LOGGING action type
 */
export type START_LOGGING = "LOGGER/START";
/**
 * START LOGGING action const
 */
export const START_LOGGING: START_LOGGING = "LOGGER/START";

/**
 * STOP LOGGING action type
 */
export type STOP_LOGGING = "LOGGER/STOP";
/**
 * STOP LOGGING action const
 */
export const STOP_LOGGING: STOP_LOGGING = "LOGGER/STOP";

/**
 * SEND LOGGING action type
 */
export type SEND_LOGS = "LOGGER/SEND";
/**
 * SEND LOGGING action const
 */
export const SEND_LOGS: SEND_LOGS = "LOGGER/SEND";

/**
 * SEND LOGGING action type
 */
export type LOGS_SENT = "LOGGER/SEND_COMPLETE";
/**
 * SEND LOGGING action const
 */
export const LOGS_SENT: LOGS_SENT = "LOGGER/SEND_COMPLETE";

/**
 * SEND LOGGING action type
 */
export type ERROR = "LOGGER/ERROR";
/**
 * SEND LOGGING action const
 */
export const ERROR: ERROR = "LOGGER/ERROR";

/**
 * CLEAR LOGS action type
 */
export type CLEAR_LOGS = "LOGGER/CLEAR";
/**
 * CLEAR LOGS action const
 */
export const CLEAR_LOGS: CLEAR_LOGS = "LOGGER/CLEAR";

/**
 * Write a LOG action type
 */
export type LOG_MESSAGE = "LOGGER/MESSAGE";
/**
 * Write a LOG action const
 */
export const LOG_MESSAGE: LOG_MESSAGE = "LOGGER/MESSAGE";

export type LOG_MESSAGE_LEVEL = "DEBUG" | "INFO" | "WARN" | "ERROR";
