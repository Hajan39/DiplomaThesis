import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { AsyncStorage } from "react-native";
import { persistCombineReducers, persistReducer } from "redux-persist";
import OtherReducers, { Functions } from "./other";

import { LoginReducer } from "./login";
import { RouterReducer } from "./router";
import { LoggerReducer } from "./logger";
import { TableOfChargesReducer } from "./toc";

// Do not persist form values.
// // // // // // // // // // // // // const fRed = persistReducer(
// // // // // // // // // // // // //   {
// // // // // // // // // // // // //     key: "form",
// // // // // // // // // // // // //     storage: AsyncStorage,
// // // // // // // // // // // // //     blacklist: ["active", "smsCode"],
// // // // // // // // // // // // //   },
// // // // // // // // // // // // //   formReducer,
// // // // // // // // // // // // // );

export default combineReducers({
  form: formReducer,
  login: LoginReducer,
  nav: RouterReducer,
  tableOfCharges: TableOfChargesReducer,
  logger: LoggerReducer,
  ...OtherReducers,
});
