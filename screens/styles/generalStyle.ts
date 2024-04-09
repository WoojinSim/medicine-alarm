import { StyleSheet } from "react-native";
import { generalValues } from "./generalValues";

export const generalStyles = StyleSheet.create({
  wrap: {
    flex: 1,
    overflow: "scroll",
  },
  tabTitleContainer: {
    height: 50,
    backgroundColor: "#C2C96D",
    justifyContent: "center", // 수직 방향으로 중앙 정렬
    alignItems: "center", // 수평 방향으로 중앙 정렬
    paddingLeft: 15,
  },
  tabTitleLabel: {
    fontFamily: "NanumSquareNeoHeavy",
    fontSize: 24,
    color: "white",
    textAlign: "left", // 왼쪽 정렬
    alignSelf: "flex-start", // 수평 방향으로 왼쪽에 붙임
  },
  scrollViewWrap: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingLeft: generalValues.sidePadding,
    paddingRight: generalValues.sidePadding,
    width: "100%",
  },
  rowContainer: {
    flexDirection: "row",
    marginBottom: generalValues.gap,
    gap: generalValues.gap,
    width: "100%",
  },
  tmpLabel: {
    fontSize: 20,
    fontFamily: "NanumSquareNeoRegular",
  },
});
