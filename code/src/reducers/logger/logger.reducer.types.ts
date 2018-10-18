
/**
 * Logger reducer's state
 */
export class LoggerReducerState {
  /**
   * Indicates that is log collection in progress, or not.
   * @default false
   */
  collectionStarted: boolean;

  /**
   * Array of collected logs
   */
  logs?: Log[];

  /**
   * Indicates if the sending process is in progress or not
   * @default false
   */
  sending?: boolean = false;

  /**
   * Indicates if there was any kind of errors while sending of logs to the server was in progress
   */
  error?: boolean = false;

  /**
   * Static assign method (like Object.assign()) to have code completition
   * @param params other states
   */
  public static assign(...params: Partial<LoggerReducerState>[]): LoggerReducerState {
    return Object.assign({}, ...params);
  }
}

/**
 * Log message types
 */
export type LogMessageLevel = "LOG" | "INFORMATION" | "DEBUG" | "WARNING" | "ERROR";

/**
 * Log message format
 */
export interface Log {
  created: Date;
  level: LogMessageLevel;
  message: string;
}

/**
 * OriginalLogFunction's head
 */
export interface OriginalLogFunction extends Function {
  (message?: any, ...optionalParams: any[]): void;
}

/**
 * OriginalLogFunction's store structure
 */
export interface LogFunctions {
  debug: OriginalLogFunction;
  log: OriginalLogFunction;
  info: OriginalLogFunction;
  error: OriginalLogFunction;
  warn: OriginalLogFunction;
}

/**
 * Initial state of the LoggerReducer
 */
export const initialState: LoggerReducerState = {
  collectionStarted: false,
  logs: [],
};
