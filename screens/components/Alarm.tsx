import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import FeatherIcon from "react-native-vector-icons/Feather";

import { alarmStyle } from "../styles/alarmStyle";
import { generalValues } from "../styles/generalValues";
import { LinearGradient } from "expo-linear-gradient";

const Alarm = () => {
  return (
    <LinearGradient
      colors={[generalValues.highlightColor, "#FFFFFF"]} // 그라데이션에 사용할 색상 배열
      style={alarmStyle.wrap}
      start={{ x: 0, y: 0 }} // 시작점 (위쪽)
      end={{ x: 0, y: 1 }} // 끝점 (아래쪽)
    >
      <View style={alarmStyle.titleContainer}>
        <Icon name="access-alarm" size={60} color="#FFFFFF" />
        <Text style={alarmStyle.titleLabel}>약속 시간 알림</Text>
      </View>
      <View style={alarmStyle.pillInfoContainer}>
        <Image
          source={{ uri: "https://nedrug.mfds.go.kr/pbp/cmn/itemImageDownload/1OKRXo9l4DN" }}
          style={{ width: 150, height: 85, borderRadius: 8 }}
        />
        <Text style={alarmStyle.pillInfoLabel}>타이레놀 2정</Text>
      </View>
      <TouchableOpacity style={alarmStyle.abortBtn}>
        <FeatherIcon name="x" size={60} color="#FFFFFF" />
      </TouchableOpacity>
      <TouchableOpacity style={alarmStyle.submitBtn}>
        <Icon name="check" size={60} color="#FFFFFF" />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Alarm;
