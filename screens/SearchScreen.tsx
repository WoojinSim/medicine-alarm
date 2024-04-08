import React from "react";
import { View, Text, StatusBar } from "react-native";
import { styles } from "./styles/mainStyle";

const SearchScreen = () => {
  return (
    <View style={styles.wrap}>
      <StatusBar backgroundColor="#C2C96D" barStyle="light-content" animated={true} />
      <Text>테스트</Text>
    </View>
  );
};

export default SearchScreen;
