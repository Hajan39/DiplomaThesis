import {
  CHECK_FOR_UPDATES,
  LOAD_NEW_TOC,
  ERROR_DOWNLOADING,
  NEW_VERSION_AVAILABLE,
  UP_TO_DATE,
} from "./toc.reducer.constants";
import { ToCFormat } from "../../models";

export class ToCReducerState {
  data?: ToCFormat;

  isLoading: boolean;

  pendingChanges?: ToCFormat;
}

export const initialState: ToCReducerState = {
  isLoading: false,
};
