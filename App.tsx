import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import { View, Text } from "react-native";
import { useFonts } from "expo-font";

// 화면 임포트
import MainScreen from "./screens/MainScreen";
import FirstaidScreen from "./screens/FirstaidScreen";
import SearchScreen from "./screens/SearchScreen";
import LocationScreen from "./screens/LocationScreen";

const Tab = createBottomTabNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    NanumSquareNeoHeavy: require("./assets/fonts/NanumSquareNeo-eHv.ttf"),
    NanumSquareNeoRegular: require("./assets/fonts/NanumSquareNeo-bRg.ttf"),
    NanumSquareNeoLight: require("./assets/fonts/NanumSquareNeo-aLt.ttf"),
  });

  // 커스텀 폰트 로드 확인
  if (!fontsLoaded) {
    return (
      <View>
        <Text>로딩중 . . .</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Main"
        screenOptions={{
          tabBarActiveTintColor: "#C2C96D",
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Main"
          component={MainScreen}
          options={{
            title: "홈",
            tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Firstaid"
          component={FirstaidScreen}
          options={{
            title: "응급처치",
            tabBarIcon: ({ color, size }) => <Icon name="medical-services" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            title: "상비약 검색",
            tabBarIcon: ({ color, size }) => <Icon name="search" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Location"
          component={LocationScreen}
          options={{
            title: "근처 약국",
            tabBarIcon: ({ color, size }) => <Icon name="location-pin" color={color} size={size} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
