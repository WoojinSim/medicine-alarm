import { StyleSheet } from "react-native";
import { generalValues } from "./generalValues";

export const mainStyles = StyleSheet.create({
  alarmContainer: {
    // 약 알람
    flex: 1,
    fontFamily: "NanumSquareNeoRegular",
    borderRadius: generalValues.borderRadius,
    backgroundColor: "#FFF",
    overflow: "hidden",
    position: "relative",
    alignItems: "center",
  },
  gradientBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "110%",
    height: "110%",
  },
  gridContainer: {
    // 그 외 버튼
    flex: 1,
    height: 180,
    padding: 10,
    borderRadius: generalValues.borderRadius,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  navigationBtnContainer: {
    flex: 1,
    fontFamily: "NanumSquareNeoRegular",
    borderRadius: generalValues.borderRadius,
    backgroundColor: "#FFF",
    overflow: "hidden",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  navigationBtnImage: {
    width: 50,
    height: 50,
    marginRight: 25,
  },
  navigationBtnTitleContainer: {
    flex: 1,
  },
  navigationBtnTitle: {
    fontFamily: "NanumSquareNeoBold",
    fontSize: 22,
  },
  navigationBtnSubTitle: {
    fontFamily: "NanumSquareNeoLight",
    fontSize: 15,
  },
});
