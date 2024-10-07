import { StyleSheet } from "react-native";
import { generalValues } from "./generalValues";

const radius = 1000;

export const medicineAlarmStyles = StyleSheet.create({
  titleLabel: {
    fontFamily: "NanumSquareNeoHeavy",
    fontSize: 30,
    color: "white",
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 15,
    height: 70,
    backgroundColor: generalValues.highlightColor,
    marginBottom: 20,
  },
  innerContainer: {
    borderWidth: 1,
  },
  pillInfoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  pillImage: {
    width: 120,
    height: 60,
    borderRadius: 10,
  },
  pillTitleContainer: {
    flex: 1,
    marginHorizontal: 10,
    flexDirection: "column",
  },
  pillTitle: {
    fontFamily: "NanumSquareNeoExtraBold",
    fontSize: 22,
  },
  pillSubtitle: {
    fontFamily: "NanumSquareNeoLight",
    fontSize: 20,
    marginTop: 5,
  },
  pillDetailContainer: {
    width: "100%",
    flexDirection: "row",
  },
  pillListContainer: {
    width: "100%",
    padding: 15,
    flex: 1,
  },
  pillListItemContainer: {
    width: "100%",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#E5E5E5",
    padding: 10,
    alignItems: "center",
  },
  pillListItemTitleContainer: {
    flex: 1,
    flexDirection: "column",
  },
  pillListItemTitle: {
    fontFamily: "NanumSquareNeoLight",
    fontSize: 15,
  },
  pillListItemSubTitle: {
    fontFamily: "NanumSquareNeoExtraBold",
    fontSize: 13,
    color: "white",
    borderRadius: 5,
    width: 40,
    textAlign: "center",
    padding: 2,
    marginTop: 5,
    backgroundColor: generalValues.highlightColor,
  },
  pillListItemImage: {
    width: 100,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  dailyScheduleListTitle: {
    fontFamily: "NanumSquareNeoExtraBold",
    fontSize: 22,
    width: "100%",
    paddingHorizontal: 30,
  },
  dailyScheduleListScrollVeiw: {
    width: "100%",
    flex: 1,
    marginTop: 10,
    marginBottom: 20,
  },
  dailyScheduleListContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 40,
  },
  dailyScheduleListItemContainer: {
    position: "relative",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: generalValues.highlightColor,
    justifyContent: "center",
    alignItems: "center",
  },
  dailyScheduleListItemSeperator: {
    width: 40,
    height: 0,
    borderBottomWidth: 1,
    borderColor: generalValues.highlightColor,
  },
  dailyScheduleListItemSubtitle: {
    position: "absolute",
    bottom: -25,
    fontFamily: "NanumSquareNeoBold",
    fontSize: 16,
  },

  dailyScheduleListItemIconContainer: {
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  dailyScheduleListItemIconLabel: {
    color: "white",
    fontFamily: "NanumSquareNeoBold",
    fontSize: 12,
  },
});
