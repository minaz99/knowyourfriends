import { StyleSheet, Platform } from "react-native";

export const Styles = StyleSheet.create({
  title: {
    fontFamily:
      Platform.OS === "ios" ? "HelveticaNeue-Medium" : "sans-serif-medium",
    fontSize: 20,
    letterSpacing: 5,
  },
  mainStyleAnd: {
    //margin: 22,
    paddingTop: 18,
  },
  createJoinStyleIOS: {
    padding: 12,
  },
  lobbyIOS: {
    padding: 14,
  },
  lobbyAnd: {
    padding: 18,
  },
  GameAnd: {
    marginTop: 18,
  },
  question: {
    //fontFamily: "Inter_600SemiBold",
    fontFamily:
      Platform.OS === "ios" ? "HelveticaNeue-Medium" : "sans-serif-medium",
    fontSize: 10,
    letterSpacing: 3,
  },
  headlines: {
    fontFamily:
      Platform.OS === "ios" ? "HelveticaNeue-Medium" : "sans-serif-medium",
    fontSize: 17,
    letterSpacing: 4,
  },
  inlines: {
    //fontFamily: "Inter_600SemiBold",
    fontFamily:
      Platform.OS === "ios" ? "HelveticaNeue-Medium" : "sans-serif-medium",
    fontSize: 15,
    letterSpacing: 3,
  },
  inlinesForDropDown: {
    //fontFamily: "Inter_600SemiBold",
    fontFamily:
      Platform.OS === "ios" ? "HelveticaNeue-Medium" : "sans-serif-medium",
    fontSize: 12,
    letterSpacing: 3,
  },
  emptyInputText: {
    borderWidth: 2,
    borderColor: "#475569",
    opacity: 0.4,
    borderStyle: "solid",
    borderRadius: 20,
    height: 50,
  },
  filledInputText: {
    backgroundColor: "#dcfce7",
    borderRadius: 20,
    height: 50,
    borderWidth: 2,
    borderColor: "#475569",
    borderStyle: "solid",
  },
});

//export default Styles;
