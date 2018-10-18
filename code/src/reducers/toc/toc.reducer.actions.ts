import { Action } from "redux";
import {
  CHECK_FOR_UPDATES,
  ERROR_DOWNLOADING,
  LOAD_NEW_TOC,
  NEW_VERSION_AVAILABLE,
  UP_TO_DATE,
  DROP_PENDING_CHANGES,
} from "./toc.reducer.constants";
import { ToCFormat } from "../../models";

/**
 * Base type for TOC reducer's actions
 */
export interface BaseAction extends Action {
  type:
    | CHECK_FOR_UPDATES
    | DROP_PENDING_CHANGES
    | ERROR_DOWNLOADING
    | LOAD_NEW_TOC
    | NEW_VERSION_AVAILABLE
    | UP_TO_DATE;
}

/**
 * When new version becomes available, this action should be called
 */
export interface NewVersionAvailable extends BaseAction {
  type: NEW_VERSION_AVAILABLE;
  data: ToCFormat;
}

/**
 * Base type for TOC reducer's actions
 */
export interface ToCActions extends BaseAction {
  type: CHECK_FOR_UPDATES | DROP_PENDING_CHANGES | ERROR_DOWNLOADING | LOAD_NEW_TOC | UP_TO_DATE;
}
