import React from "react";
import { View, Text, StatusBar, ScrollView } from "react-native";
import { useFonts } from "expo-font";

import { generalStyles } from "./styles/generalStyle";

const FirstaidScreen = () => {
  const [fontsLoaded] = useFonts({
    NanumSquareNeoHeavy: require("../assets/fonts/NanumSquareNeo-eHv.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>로딩중...</Text>;
  }

  return (
    <View style={generalStyles.wrap}>
      <StatusBar backgroundColor="#C2C96D" barStyle="light-content" animated={true} />
      <View style={generalStyles.tabTitleContainer}>
        <Text style={generalStyles.tabTitleLabel}>응급처치</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={generalStyles.scrollViewWrap}>
        <View>
          <Text>테스트</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default FirstaidScreen;
