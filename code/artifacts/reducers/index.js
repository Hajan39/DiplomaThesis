import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import OtherReducers from "./other";
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
export default combineReducers(Object.assign({ form: formReducer, login: LoginReducer, nav: RouterReducer, tableOfCharges: TableOfChargesReducer, logger: LoggerReducer }, OtherReducers));
