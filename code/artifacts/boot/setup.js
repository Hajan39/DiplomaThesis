import * as React from "react";
import { StyleProvider } from "native-base";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import { PersistGate } from "redux-persist/es/integration/react";
import App from "../App";
import { Root } from "native-base";
import getTheme from "../theme/components";
import variables from "../theme/variables/platform";
import { LoadingScreen } from "../components";
export default class Setup extends React.Component {
    constructor(props) {
        super(props);
        const { store, persistor } = configureStore();
        this.state = {
            store: store,
            persistor: persistor,
        };
    }
    render() {
        return (<StyleProvider style={getTheme(variables)}>
        <Root>
          <Provider store={this.state.store}>
            <PersistGate persistor={this.state.persistor} loading={<LoadingScreen />}>
              <App />
            </PersistGate>
          </Provider>
        </Root>
      </StyleProvider>);
    }
}
