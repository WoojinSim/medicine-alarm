// 라이브러리 임포트
import React from "react"; // 리액트
import { NavigationContainer } from "@react-navigation/native"; // 하단 네비게이션 바
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // 하단 네비게이션 바 생성
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"; // 네비게이션 바 외의 스크린 전환
import Icon from "react-native-vector-icons/MaterialIcons"; // 하단 네비게이션 바 아이콘
import { View, Text, StatusBar } from "react-native"; // 리액트 네이티브
import { useFonts } from "expo-font"; // 외부 글꼴 사용

// 화면 임포트
import MainScreen from "./screens/MainScreen";
import SelfDiagnosis from "./screens/SelfDiagnosis";
import SearchScreen from "./screens/AddPillSchedule/PillSearchScreen";
import LocationScreen from "./screens/LocationScreen";
import EditPillScheduleScreen from "./screens/EditPillScheduleScreen";
import AddPillScheduleScreen from "./screens/AddPillSchedule/AddPillScheduleScreen";
import PillSearchScreen from "./screens/AddPillSchedule/PillSearchScreen";
import DetailInputScreen from "./screens/AddPillSchedule/DetailInputScreen";

import DiagnosisDiabetes from "./screens/SelfDiagnosis/Diagnosis-diabetes";
import DiagnosisDementia from "./screens/SelfDiagnosis/Diagnosis-dementia";
import DiagnosisHypertension from "./screens/SelfDiagnosis/Diagnosis-hypertension";
import DiagnosisMelancholia from "./screens/SelfDiagnosis/Diagnosis-melancholia";
import DiagnosisOsteoporosis from "./screens/SelfDiagnosis/Diagnosis-osteoporosis";

import { generalStyles } from "./screens/styles/generalStyle";
import { generalValues } from "./screens/styles/generalValues";

// 탭(스크린) 분리
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/**
 * 하단 네비게이터 묶음
 * @returns {React.Component} 리액트 컴포넌트
 */
const MainTabNavigator = () => {
  return (
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
        name="SelfDiagnosis"
        component={SelfDiagnosis}
        options={{
          title: "자가진단",
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
  );
};

/**
 * 최상위 App 컴포넌트
 * @returns {React.Component} 리액트 컴포넌트
 */
const App = () => {
  const [fontsLoaded] = useFonts({
    NanumSquareNeoLight: require("./assets/fonts/NanumSquareNeo-aLt.ttf"),
    NanumSquareNeoRegular: require("./assets/fonts/NanumSquareNeo-bRg.ttf"),
    NanumSquareNeoBold: require("./assets/fonts/NanumSquareNeo-cBd.ttf"),
    NanumSquareNeoExtraBold: require("./assets/fonts/NanumSquareNeo-dEb.ttf"),
    NanumSquareNeoHeavy: require("./assets/fonts/NanumSquareNeo-eHv.ttf"),
  });

  console.log("🔵 App.tsx\t\t\t컴포넌트 로드됨.");

  // 커스텀 폰트 로드 확인
  if (!fontsLoaded) {
    return (
      <View style={generalStyles.wrap}>
        <StatusBar backgroundColor={generalValues.highlightColor} barStyle="light-content" animated={true} />
        <View style={generalStyles.startLoadingContainer}>
          <Text style={generalStyles.startLoadingTitle}>약속</Text>
        </View>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={MainTabNavigator} />
        <Stack.Screen
          name="EditPillScheduleScreen"
          component={EditPillScheduleScreen}
          options={TransitionPresets.FadeFromBottomAndroid}
        />
        <Stack.Screen
          name="AddPillScheduleScreen"
          component={AddPillScheduleScreen}
          options={TransitionPresets.DefaultTransition}
        />
        <Stack.Screen name="PillSearchScreen" component={PillSearchScreen} options={TransitionPresets.DefaultTransition} />
        <Stack.Screen name="DetailInputScreen" component={DetailInputScreen} options={TransitionPresets.DefaultTransition} />
        <Stack.Screen name="DiagnosisDiabetes" component={DiagnosisDiabetes} options={TransitionPresets.DefaultTransition} />
        <Stack.Screen name="DiagnosisDementia" component={DiagnosisDementia} options={TransitionPresets.DefaultTransition} />
        <Stack.Screen
          name="DiagnosisHypertension"
          component={DiagnosisHypertension}
          options={TransitionPresets.DefaultTransition}
        />
        <Stack.Screen
          name="DiagnosisMelancholia"
          component={DiagnosisMelancholia}
          options={TransitionPresets.DefaultTransition}
        />
        <Stack.Screen
          name="DiagnosisOsteoporosis"
          component={DiagnosisOsteoporosis}
          options={TransitionPresets.DefaultTransition}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
