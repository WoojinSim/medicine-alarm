import { StyleSheet } from "react-native";
import { generalValues } from "./generalValues";

export const firstAidStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginVertical: 5,
    fontFamily: "NanumSquareNeoRegular",
    borderRadius: generalValues.borderRadius,
    backgroundColor: "#FFF",
    overflow: "hidden",
    position: "relative",
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  itemTitle: {
    fontFamily: "NanumSquareNeoHeavy",
    fontSize: 26,
    marginBottom: 5,
  },
  itemSubTitle: {
    fontFamily: "NanumSquareNeoLight",
    fontSize: 15,
  },

  modalBackground: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    height: "100%",
    padding: 20,
    position: "relative",
  },
  modalContainer: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    borderRadius: 10,
    padding: 20,
    position: "relative",
  },
  modalCloseButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontFamily: "NanumSquareNeoHeavy",
    fontSize: 28,
    marginBottom: 10,
  },
  modalScrollView: {},
  modalTextBold: {
    fontFamily: "NanumSquareNeoHeavy",
    fontSize: 20,
    marginTop: 30,
    marginBottom: 10,
    width: "100%",
    color: "white",
    backgroundColor: generalValues.highlightColor,
    padding: 8,
    borderRadius: 7,
  },
  modalTextSemiBold: {
    fontFamily: "NanumSquareNeoExtraBold",
    fontSize: 18,
    marginVertical: 10,
  },
  modalTextRegular: {
    fontFamily: "NanumSquareNeoRegular",
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 22,
  },
});
