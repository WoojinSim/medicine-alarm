import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Vibration, Image } from "react-native";

import { generalStyles } from "./styles/generalStyle";
import { mainStyles } from "./styles/mainStyle";
// import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "./components/Header";
import MedicineAlarm from "./components/MedicineAlarm";

const MainScreen = ({ navigation }: any) => {
  const goToEditPillScheduleScreen = () => {
    Vibration.vibrate(20);
    navigation.navigate("EditPillScheduleScreen");
  };

  const pressPillSearchButton = () => {
    Vibration.vibrate(20);
    // isSetAlarm boolean 상태에 따라 검색 후 약재를 복약 계획에 추가하는 버튼 유무가 달라짐
    navigation.navigate("PillSearchScreen", { isSetAlarm: false });
  };

  const pressPharmacyButton = () => {
    Vibration.vibrate(20);
    navigation.navigate("Location");
  };

  // 메인 화면
  return (
    <View style={generalStyles.wrap}>
      <Header title="홈" />

      {/* 메인 화면 */}
      <ScrollView showsVerticalScrollIndicator={false} style={generalStyles.scrollViewWrap}>
        {/* 알람 표현 영역 (메인페이지 상단부) */}
        <MedicineAlarm />

        {/* 약 검색 화면 Nav 버튼 */}
        <View style={generalStyles.rowContainer}>
          <TouchableOpacity style={mainStyles.navigationBtnContainer} onPress={pressPillSearchButton}>
            <Image style={mainStyles.navigationBtnImage} source={require("../assets/Pill.png")} />
            <View style={mainStyles.navigationBtnTitleContainer}>
              <Text style={mainStyles.navigationBtnTitle}>약 검색하기</Text>
              <Text style={mainStyles.navigationBtnSubTitle}>어떤 약이 궁금하세요?</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* 약 검색 화면 Nav 버튼 */}
        <View style={generalStyles.rowContainer}>
          <TouchableOpacity style={mainStyles.navigationBtnContainer} onPress={goToEditPillScheduleScreen}>
            <Image style={mainStyles.navigationBtnImage} source={require("../assets/Alarm.png")} />
            <View style={mainStyles.navigationBtnTitleContainer}>
              <Text style={mainStyles.navigationBtnTitle}>알람 설정하기</Text>
              <Text style={mainStyles.navigationBtnSubTitle}>복용중인 약이 있나요?</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* 주변 약국 화면 Nav 버튼 */}
        <View style={generalStyles.rowContainer}>
          <TouchableOpacity style={mainStyles.navigationBtnContainer} onPress={pressPharmacyButton}>
            <Image style={mainStyles.navigationBtnImage} source={require("../assets/Map.png")} />
            <View style={mainStyles.navigationBtnTitleContainer}>
              <Text style={mainStyles.navigationBtnTitle}>주변 약국 보기</Text>
              <Text style={mainStyles.navigationBtnSubTitle}>주변 약국이 궁금하세요?</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default MainScreen;
