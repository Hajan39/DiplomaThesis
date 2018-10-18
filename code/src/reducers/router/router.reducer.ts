import { Reducer } from "redux";
import { NavigationActions, NavigationState } from "react-navigation";
import { persistReducer } from "redux-persist";

import { RootNavigator } from "../../screens/router";
import {
  LoginSecondFactorResultAction,
  LoginClear,
  LoginError,
} from "../login/login.reducer.actions";
import {
  LOGIN_SECOND_FACTOR_RESULT,
  LOGIN_CLEAR_CREDENTIALS,
  LOGIN_ERROR,
} from "../login/login.reducer.constants";
import { BackHandler } from "react-native";

const SignedOutAction = RootNavigator.router.getActionForPathAndParams("SignedOut");
const initialNavState = RootNavigator.router.getStateForAction(SignedOutAction, null);

const RouterReducer: Reducer<any> = (state: any = initialNavState, action: any) => {
  switch (action.type) {
    case NavigationActions.BACK:
      if (action.physical === true) {
        const newState = RootNavigator.router.getStateForAction(NavigationActions.back(), state);
        if (newState.index === state.index && state.index > 0) {
          return RootNavigator.router.getStateForAction(NavigationActions.back(), state);
        } else {
          BackHandler.exitApp();
          return state;
        }
      }
      return RootNavigator.router.getStateForAction(NavigationActions.back(), state);
    case LOGIN_SECOND_FACTOR_RESULT:
      return RootNavigator.router.getStateForAction(
        NavigationActions.navigate({
          routeName: "SignedIn",
        }),
        state,
      );
    case LOGIN_CLEAR_CREDENTIALS:
    case LOGIN_ERROR:
      if (state.routes[state.index].routeName !== "SignedOut")
        return RootNavigator.router.getStateForAction(
          NavigationActions.navigate({
            routeName: "SignedOut",
          }),
          state,
        );
      break;
    default:
      return RootNavigator.router.getStateForAction(action, state);
  }
  return RootNavigator.router.getStateForAction(action, state);
};

export default RouterReducer;
