import { StyleSheet } from "react-native";
import { generalValues } from "./generalValues";

export const editPillScheduleStyle = StyleSheet.create({
  scrollViewWrap: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingLeft: generalValues.sidePadding,
    paddingRight: generalValues.sidePadding,
    position: "relative",
  },
  notyetContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notyetLabel: {
    fontFamily: "NanumSquareNeoRegular",
    fontSize: 22,
    marginBottom: 50,
    opacity: 0.4,
  },

  itemWrap: {
    paddingHorizontal: 15,
    paddingTop: 25,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  itemTitleWrap: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  itemTitleLabelBold: {
    fontSize: 26,
    fontFamily: "NanumSquareNeoHeavy",
    marginRight: 10,
  },
  itemTitleLabelReg: {
    fontSize: 18,
    fontFamily: "NanumSquareNeoLight",
    marginRight: 10,
  },

  itemInfoWrap: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBlockColor: "#00000025",
  },
  itemInfoLabelWrap: {
    flex: 1,
    flexDirection: "column",
  },
  itemInfoLabel: {
    flex: 1,
    fontFamily: "NanumSquareNeoBold",
    fontSize: 18,
  },

  itemInfoTagWarp: {
    flexWrap: "wrap",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginTop: 5,
  },
  itemInfoTag: {
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    marginRight: 5,
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: generalValues.highlightColor,
  },
  itemInfoTagLabel: {
    color: "#FFF",
    fontFamily: "NanumSquareNeoBold",
    fontSize: 14,
  },

  addButtonWrap: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 35,
    overflow: "hidden",
    backgroundColor: generalValues.highlightColor,
  },
  addButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
