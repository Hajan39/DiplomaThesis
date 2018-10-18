/**
 * Logger reducer's state
 */
export class LoggerReducerState {
    constructor() {
        /**
         * Indicates if the sending process is in progress or not
         * @default false
         */
        this.sending = false;
        /**
         * Indicates if there was any kind of errors while sending of logs to the server was in progress
         */
        this.error = false;
    }
    /**
     * Static assign method (like Object.assign()) to have code completition
     * @param params other states
     */
    static assign(...params) {
        return Object.assign({}, ...params);
    }
}
/**
 * Initial state of the LoggerReducer
 */
export const initialState = {
    collectionStarted: false,
    logs: [],
};
