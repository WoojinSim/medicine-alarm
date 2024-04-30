import { StyleSheet } from "react-native";
import { generalValues } from "./generalValues";

export const pillSearchStyle = StyleSheet.create({
  searchBoxWrap: {
    margin: 10,
    marginBottom: 0,
    flexDirection: "row",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: generalValues.highlightColor,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBox: {
    flex: 1,
    padding: 18,
    height: 60,
    fontSize: 20,
  },
  searchButton: {
    height: 50,
    width: 50,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  notSearchedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notSearchedIcon: {
    opacity: 0.1,
    marginBottom: 100,
  },

  alertContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  alertLabel: {
    fontFamily: "NanumSquareNeoRegular",
    fontSize: 16,
  },

  loadingImage: {
    backgroundColor: "#EEE",
    borderRadius: 10,
    marginRight: 10,
    width: 120,
    height: 65,
  },
  loadingItemTitle: {
    backgroundColor: "#EEE",
    borderRadius: 10,
    marginRight: 10,
    width: 200,
    height: 30,
  },

  resultScrollContainer: {
    marginRight: generalValues.sidePadding,
    marginLeft: generalValues.sidePadding,
  },
  resultItemContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  resultImage: {
    borderRadius: 10,
    marginRight: 10,
    resizeMode: "contain",
  },
  resultLabelWrap: {
    flex: 1,
  },
  resultItemTitle: {
    fontFamily: "NanumSquareNeoExtraBold",
    fontSize: 18,
  },
  resultItemLore: {
    marginTop: 10,
    fontFamily: "NanumSquareNeoRegular",
    fontSize: 18,
    opacity: 0.5,
  },
});
