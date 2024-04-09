import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";

import { mainStyles } from "../styles/mainStyle";
import { medicineAlarmStyles } from "../styles/medicineAlarmStyles";

import RotationCircle from "./RotationCircle";

const MedicineAlarm = () => {
  // 커스텀 폰트 불러오기
  const [fontsLoaded] = useFonts({
    NanumSquareNeoLight: require("../../assets/fonts/NanumSquareNeo-aLt.ttf"),
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // 1초마다 업데이트

    return () => clearInterval(intervalId); // 컴포넌트가 언마운트되면 타이머 해제
  }, []);

  const getFormattedTime = () => {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const ampm = hours >= 12 ? "오후" : "오전";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    return `${ampm} ${formattedHours}시 ${formattedMinutes}분`;
  };

  return (
    <View style={mainStyles.alarmContainer}>
      <LinearGradient colors={["#70A6D2", "#5698E3"]} style={mainStyles.gradientBackground}></LinearGradient>
      <Text style={medicineAlarmStyles.timeLabel}>{getFormattedTime()}</Text>
      <RotationCircle />
    </View>
  );
};

export default MedicineAlarm;
