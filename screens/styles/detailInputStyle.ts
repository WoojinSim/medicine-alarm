import { StyleSheet } from "react-native";
import { generalValues } from "./generalValues";

export const detailInputStyle = StyleSheet.create({
  testButton: {
    borderWidth: 2,
    padding: 5,
    position: "absolute",
    bottom: 20,
    right: 20,
  },

  container: {
    flex: 1,
    position: "relative",
    padding: 10,
    marginRight: 10,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  stageTitle: {
    fontFamily: "NanumSquareNeoBold",
    fontSize: 18,
  },
  backStageButtonWrap: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    height: 30,
  },
  backStageButton: {
    position: "absolute",
    width: 24,
    height: 24,
    top: 0,
    right: 0,
  },

  stageIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#DEDEDE",
    marginRight: 2,
    marginLeft: 2,
  },
  stageIndicatorOn: {
    width: 18,
    backgroundColor: generalValues.highlightColor,
  },

  stageIcon: {
    marginTop: 10,
    marginBottom: 20,
  },
});
