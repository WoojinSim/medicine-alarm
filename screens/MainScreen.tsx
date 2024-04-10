import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

import { generalStyles } from "./styles/generalStyle";
import { mainStyles } from "./styles/mainStyle";
import { generalValues } from "./styles/generalValues";

import Header from "./components/Header";
import MedicineAlarm from "./components/MedicineAlarm";

const MainScreen = ({ navigation }: any) => {
  const goToNoTabScreen = () => {
    navigation.navigate("AddPillScheduleScreen");
  };

  // 메인 화면
  return (
    <View style={generalStyles.wrap}>
      <Header title="홈" />
      <ScrollView showsVerticalScrollIndicator={false} style={generalStyles.scrollViewWrap}>
        <View style={[generalStyles.rowContainer, { marginTop: generalValues.gap }]}>
          <MedicineAlarm />
        </View>
        <View style={generalStyles.rowContainer}>
          <TouchableOpacity style={mainStyles.gridContainer} onPress={goToNoTabScreen}>
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
      </ScrollView>
    </View>
  );
};

export default MainScreen;
