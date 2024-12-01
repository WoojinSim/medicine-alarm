import { StyleSheet } from "react-native";
import { generalValues } from "./generalValues";

export const selfDiagnosisStyles = StyleSheet.create({
  itemBtn: {
    marginTop: 20,
    fontFamily: "NanumSquareNeoRegular",
    borderRadius: generalValues.borderRadius,
    backgroundColor: "#FFF",
    overflow: "hidden",
    position: "relative",
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  itemTitle: {
    fontFamily: "NanumSquareNeoExtraBold",
    fontSize: 26,
    marginBottom: 5,
  },
  itemSubTitle: {
    fontFamily: "NanumSquareNeoLight",
    fontSize: 15,
  },
  pageScrollView: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  pageTitleContainer: {
    marginBottom: 20,
  },
  pageTitle: {
    fontFamily: "NanumSquareNeoExtraBold",
    fontSize: 30,
    marginBottom: 8,
  },
  pageSubTitle: {
    fontFamily: "NanumSquareNeoRegular",
    fontSize: 15,
  },
  submitBtn: {
    marginBottom: 20,
    alignItems: "center",
    width: "100%",
    borderRadius: generalValues.borderRadius,
    backgroundColor: generalValues.highlightColor,
    paddingVertical: 15,
  },
  submitBtnText: {
    fontFamily: "NanumSquareNeoExtraBold",
    fontSize: 24,
    color: "#FFF",
  },

  checkBoxContainer: {
    marginBottom: 20,
    width: "100%",
    borderRadius: generalValues.borderRadius,
    backgroundColor: "#FFF",
    padding: 15,
  },
  checkBoxLabel: {
    fontFamily: "NanumSquareNeoRegular",
    fontSize: 20,
  },
  radioBtnContainer: {
    marginTop: 15,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 4,
  },
  radioBtn: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  radioBtnText: {
    fontFamily: "NanumSquareNeoRegular",
    fontSize: 14,
  },
  wipContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wipText: {
    fontFamily: "NanumSquareNeoExtraBold",
    fontSize: 24,
    opacity: 0.2,
  },

  innerContentContainer: {
    paddingHorizontal: 20,
  },
  innerContentTitle: {
    fontFamily: "NanumSquareNeoExtraBold",
    fontSize: 26,
    margin: 20,
    textAlign: "center",
  },
  innerContentSubtitle: {
    fontFamily: "NanumSquareNeoExtraBold",
    fontSize: 20,
    marginBottom: 15,
    backgroundColor: generalValues.highlightColor,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: generalValues.borderRadius,
    color: "#FFF",
  },
  innerContentText: {
    fontFamily: "NanumSquareNeoRegular",
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 26,
  },
});
