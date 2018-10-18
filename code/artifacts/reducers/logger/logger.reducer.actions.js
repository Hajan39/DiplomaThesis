/**
 * This type of action will trigger the reducer to override the console log functions
 * which will result of collecting log messages in a store, which can be sen't to the server for diagnostics
 */
export class StartLogAction {
    constructor() {
        /**
         * Purge previously collected logs
         * @default false
         */
        this.purgeLogs = false;
    }
}
/**
 * Action which will trigger the reducer to stop collecting the log messages, and restore the original log functions
 */
export class StopLogAction {
    constructor() {
        /**
         * Purge logs
         * @default false
         */
        this.purgeLogs = false;
        /**
         * Send the logs automatically
         * @default false
         */
        this.sendLogs = false;
    }
}
/**
 * Action which will trigger the reducer to send the collected log messages to the endpoint
 * The endpoint can be overridden for test purpose
 */
export class SendLogsAction {
}
/**
 * Action which will trigger the reducer to send the collected log messages to the endpoint
 * The endpoint can be overridden for test purpose
 */
export class SendLogsCompleteAction {
}
/**
 * Action which will trigger the reducer to send the collected log messages to the endpoint
 * The endpoint can be overridden for test purpose
 */
export class SendLogsErrorAction {
}
/**
 * Action which will trigger the reducer to clear the collected logs
 */
export class ClearLogsAction {
}
export class WriteLogAction {
}
