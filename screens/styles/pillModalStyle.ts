import { StyleSheet, Dimensions } from "react-native";
import { generalValues } from "./generalValues";

export const pillModalStyle = StyleSheet.create({
  background: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 2,
  },
  modal: {
    margin: 10,
    padding: 20,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    borderWidth: 2,
    borderColor: generalValues.highlightColor,
    zIndex: 3,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
  bookmarkButton: {
    height: 50,
    width: 50,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  closeButton: {
    height: 50,
    width: 50,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  itemContainer: {
    marginBottom: 10,
  },
  itemImage: {
    borderRadius: 10,
    marginRight: 10,
    resizeMode: "contain",
  },
  labelWrap: {
    flex: 1,
  },

  itemName: {
    fontFamily: "NanumSquareNeoExtraBold",
    fontSize: 24,
    width: "100%",
    textAlign: "center",
    marginTop: 30,
  },
  itemEntpName: {
    textAlign: "center",
    marginBottom: 30,
    opacity: 0.3,
  },
  itemLoreTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontFamily: "NanumSquareNeoExtraBold",
    fontSize: 18,
    width: "100%",
    textAlign: "center",
  },
  itemLore: {
    marginTop: 10,
    fontFamily: "NanumSquareNeoRegular",
    fontSize: 18,
    opacity: 0.5,
  },

  itemGptTagContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    marginBottom: 5,
  },

  itemGptTagLabel: {
    fontFamily: "NanumSquareNeoBold",
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
  },
});
