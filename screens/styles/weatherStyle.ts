import { StyleSheet } from "react-native";
import { generalValues } from "./generalValues";

export const weatherStyle = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    textAlign: "center",
    borderRadius: generalValues.borderRadius,
    backgroundColor: "#FFF",
    overflow: "hidden",
  },
  weatherItemContainer: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    gap: 0,
  },
  weatherItemTitle: {
    fontFamily: "NanumSquareNeoExtraBold",
    fontSize: 24,
    color: "#FFF",
    width: "100%",
    textAlign: "center",
    paddingVertical: 10,
    backgroundColor: generalValues.highlightColor,
    borderColor: generalValues.highlightColor,
    borderWidth: 1,
  },
  weatherItemValue: {
    fontFamily: "NanumSquareNeoRegular",
    fontSize: 20,
    paddingVertical: 12,
  },
});
