import * as React from "react";
import { Image } from "react-native";
import { StyleProvider, Container, View, Text, Spinner } from "native-base";
import { Provider, Store } from "react-redux";
import configureStore from "./configureStore";
import { PersistGate } from "redux-persist/es/integration/react";

import App from "../App";
import { Root } from "native-base";

import getTheme from "../theme/components";
import variables from "../theme/variables/platform";

import { LoadingScreen } from "../components";

interface Props {}

interface State {
  store: Store<any>;
  persistor: any;
}

export default class Setup extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    const { store, persistor } = configureStore();
    this.state = {
      store: store,
      persistor: persistor,
    };
  }

  render() {
    return (
      <StyleProvider style={getTheme(variables)}>
        <Root>
          <Provider store={this.state.store}>
            <PersistGate persistor={this.state.persistor} loading={<LoadingScreen />}>
              <App />
            </PersistGate>
          </Provider>
        </Root>
      </StyleProvider>
    );
  }
}
