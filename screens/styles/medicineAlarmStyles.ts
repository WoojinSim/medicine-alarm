import { StyleSheet } from "react-native";

const radius = 1000;

export const medicineAlarmStyles = StyleSheet.create({
  circle: {
    position: "absolute",
    bottom: -300,
    left: "50%",
    width: radius,
    height: radius,
    borderWidth: 5,
    borderColor: "white",
    borderStyle: "dotted",
    borderRadius: radius / 2,
    marginLeft: (radius / 2) * -1,
    marginBottom: (radius / 2) * -1,
    opacity: 0.5,
  },
  timeLabel: {
    fontFamily: "NanumSquareNeoLight",
    fontSize: 40,
    color: "white",
  },
});
