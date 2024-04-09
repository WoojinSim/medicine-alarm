import React from "react";
import { View, Text, StatusBar, ScrollView } from "react-native";
import { useFonts } from "expo-font";

import { generalStyles } from "./styles/generalStyle";
import { mainStyles } from "./styles/mainStyle";
import { generalValues } from "./styles/generalValues";

import MedicineAlarm from "./components/MedicineAlarm";

const MainScreen = () => {
  // 커스텀 폰트 불러오기
  // TODO: 폰트들 Context로 전역관리할 것
  const [fontsLoaded] = useFonts({
    NanumSquareNeoHeavy: require("../assets/fonts/NanumSquareNeo-eHv.ttf"),
    NanumSquareNeoRegular: require("../assets/fonts/NanumSquareNeo-bRg.ttf"),
    NanumSquareNeoLight: require("../assets/fonts/NanumSquareNeo-aLt.ttf"),
  });

  // 커스텀 폰트 로드 확인
  if (!fontsLoaded) {
    return (
      <View>
        <Text>로딩중 . . .</Text>
      </View>
    );
  }

  // 메인 화면
  return (
    <View style={generalStyles.wrap}>
      <StatusBar backgroundColor="#C2C96D" barStyle="light-content" animated={true} />
      <View style={generalStyles.tabTitleContainer}>
        <Text style={generalStyles.tabTitleLabel}>홈</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={generalStyles.scrollViewWrap}>
        <View style={[generalStyles.rowContainer, { marginTop: generalValues.gap }]}>
          <MedicineAlarm />
        </View>
        <View style={generalStyles.rowContainer}>
          <View style={mainStyles.gridContainer}>
            <Text style={generalStyles.tmpLabel}>테스트 버튼1</Text>
          </View>
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
      </ScrollView>
    </View>
  );
};

export default MainScreen;
