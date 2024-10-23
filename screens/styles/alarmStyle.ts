import { StyleSheet } from "react-native";
import { generalValues } from "./generalValues";

export const alarmStyle = StyleSheet.create({
  wrap: {
    flex: 1,
    height: "100%",
    overflow: "scroll",
    position: "relative",
  },
  titleContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
  titleLabel: {
    fontFamily: "NanumSquareNeoHeavy",
    fontSize: 34,
    color: "white",
    width: "100%",
    textAlign: "center",
    marginTop: 20,
  },
  pillInfoContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 100,
  },
  pillInfoLabel: {
    fontFamily: "NanumSquareNeoBold",
    fontSize: 24,
    marginTop: 10,
  },
  abortBtn: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    bottom: 60,
    left: 40,
    backgroundColor: "#454545",
    justifyContent: "center",
    alignItems: "center",
  },
  submitBtn: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    bottom: 60,
    right: 40,
    backgroundColor: generalValues.highlightColor,
    justifyContent: "center",
    alignItems: "center",
  },
});
