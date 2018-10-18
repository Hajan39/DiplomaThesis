import { Dimensions, StyleSheet } from "react-native";

const deviceHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  internalContainer: {
    flex: 0,
    padding: 20,
    width: "85%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  loadingOverlay: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 0,
    backgroundColor: "rgba(255,255,255,0.86)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 1000,
  },
  background: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    height: deviceHeight,
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  textInput: {
    width: 300,
  },
});
