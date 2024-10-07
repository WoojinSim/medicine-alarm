import React, { useCallback, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Vibration, Image } from "react-native";

import { generalStyles } from "./styles/generalStyle";
import { mainStyles } from "./styles/mainStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "./components/Header";
import MedicineAlarm from "./components/MedicineAlarm";

const MainScreen = ({ navigation }: any) => {
  const goToEditPillScheduleScreen = () => {
    Vibration.vibrate(20);
    navigation.navigate("EditPillScheduleScreen");
  };

  const pressPillSearchButton = () => {
    // DetailInputScreen으로 넘어가는 내용
    Vibration.vibrate(20);
    navigation.navigate("PillSearchScreen", { isSetAlarm: false });
  };

  const pressPharmacyButton = () => {
    // DetailInputScreen으로 넘어가는 내용
    Vibration.vibrate(20);
    navigation.navigate("Location");
  };

  // 메인 화면
  return (
    <View style={generalStyles.wrap}>
      <Header title="홈" />

      {/* 메인 화면 */}
      <ScrollView showsVerticalScrollIndicator={false} style={generalStyles.scrollViewWrap}>
        <MedicineAlarm />
        <View style={generalStyles.rowContainer}>
          <TouchableOpacity style={mainStyles.navigationBtnContainer} onPress={pressPillSearchButton}>
            <Image style={mainStyles.navigationBtnImage} source={require("../assets/Pill.png")} />
            <View style={mainStyles.navigationBtnTitleContainer}>
              <Text style={mainStyles.navigationBtnTitle}>약 검색하기</Text>
              <Text style={mainStyles.navigationBtnSubTitle}>어떤 약이 궁금하세요?</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={generalStyles.rowContainer}>
          <TouchableOpacity style={mainStyles.navigationBtnContainer} onPress={goToEditPillScheduleScreen}>
            <Image style={mainStyles.navigationBtnImage} source={require("../assets/Alarm.png")} />
            <View style={mainStyles.navigationBtnTitleContainer}>
              <Text style={mainStyles.navigationBtnTitle}>알람 설정하기</Text>
              <Text style={mainStyles.navigationBtnSubTitle}>복용중인 약이 있나요?</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={generalStyles.rowContainer}>
          <TouchableOpacity style={mainStyles.navigationBtnContainer} onPress={pressPharmacyButton}>
            <Image style={mainStyles.navigationBtnImage} source={require("../assets/Map.png")} />
            <View style={mainStyles.navigationBtnTitleContainer}>
              <Text style={mainStyles.navigationBtnTitle}>주변 약국 보기</Text>
              <Text style={mainStyles.navigationBtnSubTitle}>주변 약국이 궁금하세요?</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* 
                <View style={generalStyles.rowContainer}>
          <TouchableOpacity style={mainStyles.gridContainer} onPress={goToEditPillScheduleScreen}>
            <Text style={generalStyles.tmpLabel}>Modal Test</Text>
          </TouchableOpacity>
          <View style={mainStyles.gridContainer}>
            <Text style={generalStyles.tmpLabel}>테스트 버튼2</Text>
          </View>
        </View>
                <View style={generalStyles.rowContainer}>
          <TouchableOpacity style={mainStyles.gridContainer} onPress={goToEditPillScheduleScreen}>
            <Text style={generalStyles.tmpLabel}>Modal Test</Text>
          </TouchableOpacity>
          <View style={mainStyles.gridContainer}>
            <Text style={generalStyles.tmpLabel}>테스트 버튼2</Text>
          </View>
        </View>
        <View style={generalStyles.rowContainer}>
          <View style={mainStyles.gridContainer}>
            <Text style={generalStyles.tmpLabel}>테스트 버튼3</Text>
          </View>
          <View style={mainStyles.gridContainer}>
            <Text style={generalStyles.tmpLabel}>테스트 버튼4</Text>
          </View>
        </View>
        <View style={generalStyles.rowContainer}>
          <View style={mainStyles.gridContainer}>
            <Text style={generalStyles.tmpLabel}>테스트 버튼5</Text>
          </View>
          <View style={mainStyles.gridContainer}>
            <Text style={generalStyles.tmpLabel}>테스트 버튼6</Text>
          </View>
        </View>
        <View style={generalStyles.rowContainer}>
          <View style={mainStyles.gridContainer}>
            <Text style={generalStyles.tmpLabel}>테스트 버튼7</Text>
          </View>
          <View style={mainStyles.gridContainer}>
            <Text style={generalStyles.tmpLabel}>테스트 버튼8</Text>
          </View>
        </View>
        */}
      </ScrollView>
    </View>
  );
};

export default MainScreen;
