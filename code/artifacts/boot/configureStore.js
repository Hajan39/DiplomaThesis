import { composeWithDevTools } from "remote-redux-devtools";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createReactNavigationReduxMiddleware, createReduxBoundAddListener, } from "react-navigation-redux-helpers";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "../reducers";
import middlewares from "../reducers/middlewares";
const navigationMiddleware = createReactNavigationReduxMiddleware("root", state => state.nav);
export const addListener = createReduxBoundAddListener("root");
export const debuggerMiddleware = composeWithDevTools({
    // realtime: true,
    // autoReconnect: true,
    port: 8000,
    host: "localhost",
});
export default function configureStore() {
    const config = {
        key: "root",
        storage,
    };
    const enhancer = debuggerMiddleware(
    // debuggerMiddleware,
    applyMiddleware(navigationMiddleware), applyMiddleware(thunk), applyMiddleware(...middlewares));
    const store = createStore(reducer, enhancer);
    const persistor = persistStore(store);
    return { store, persistor };
}
