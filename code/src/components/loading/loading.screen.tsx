import React from "react";
import { Image } from "react-native";
import { View, Container, Spinner } from "native-base";

import { LoadingView } from "./loading.view";
import styles from "./styles";

export class LoadingScreen extends React.Component {
  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.background}>
          <Image
            source={require("../../../assets/images/bg.jpg")}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <LoadingView />
      </Container>
    );
  }
}
