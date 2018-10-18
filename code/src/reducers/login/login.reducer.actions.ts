import { Action } from "redux";
import {
  LOGIN_FIRST_FACTOR,
  LOGIN_FIRST_FACTOR_RESULT,
  LOGIN_SECOND_FACTOR,
  LOGIN_SECOND_FACTOR_RESULT,
  LOGIN_CLEAR_CREDENTIALS,
  LOGIN_ERROR,
  LOGIN_ABORT,
  LOGIN_CLEAR_ERROR,
  LOGIN_REHYDRATE,
} from "./login.reducer.constants";
import { LoginReducerState } from ".";

export interface BaseAction extends Action {
  type:
    | LOGIN_FIRST_FACTOR
    | LOGIN_FIRST_FACTOR_RESULT
    | LOGIN_SECOND_FACTOR
    | LOGIN_SECOND_FACTOR_RESULT
    | LOGIN_CLEAR_CREDENTIALS
    | LOGIN_ERROR
    | LOGIN_CLEAR_ERROR
    | LOGIN_ABORT
    | LOGIN_REHYDRATE;
}

export interface LoginFirstFactorAction extends BaseAction {
  type: LOGIN_FIRST_FACTOR;
  phoneNumber: string;
  representativeId: string;
}

export type KnownErrorTypes = "ok" | "already_sent" | "invalid";
export type KnownLoginErrors = "invalid_code" | "old_code" | "invalid";

export interface LoginFirstFactorResultAction extends BaseAction {
  type: LOGIN_FIRST_FACTOR_RESULT;
  errorMessage?: string;
  errorCode: KnownErrorTypes;
}

export interface LoginSecondFactorAction extends BaseAction {
  type: LOGIN_SECOND_FACTOR;
  /**
   * @property validationText should contain the code given by the second factor
   */
  validationText: string;
  /**
   * @property validationToken contains the errorDescription's value from the First step's result
   */
  validationToken: string;
}

export interface LoginSecondFactorResultAction extends BaseAction {
  type: LOGIN_SECOND_FACTOR_RESULT;
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  created: Date;
}

export interface LoginRehydrateAction extends BaseAction {
  type: LOGIN_REHYDRATE;
  payload: LoginReducerState;
  key: "login";
}

export interface LoginError extends BaseAction {
  type: LOGIN_ERROR;
  errorMessage: string;
  errorCode: KnownLoginErrors;
}
export interface LoginAbort extends BaseAction {
  type: LOGIN_ABORT;
}

export interface LoginClear extends BaseAction {
  type: LOGIN_CLEAR_CREDENTIALS | LOGIN_CLEAR_ERROR;
}
