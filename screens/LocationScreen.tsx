import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { generalStyles } from "./styles/generalStyle";

import Header from "./components/Header";

import * as Location from 'expo-location';
import MapButton from './components/mapComponents/Button';
import ListDisplay from './components/mapComponents/ListDisplay';
import { styles } from './styles/mapStyles/locationScreenStyle';
import PharmacyList from './components/mapComponents/PharmacyList';
import MapList from './components/mapComponents/MapList';

const LocationScreen = () => {
  const [viewMode, setViewMode] = useState('map'); // 누르는 버튼에 따라 값을 다르게 하여 다른 컴포넌트 호출
  const [isGranted, setIsgranted] = useState(false); 

  useEffect(() => {
    const requestGrant = async () => {
      // 사용자 위치 정보 허용
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        setIsgranted(false);
        return;
      }
      setIsgranted(true);
    };
  
    requestGrant(); 
  }, []); 

  // <ScrollView showsVerticalScrollIndicator={false} style={generalStyles.scrollViewWrap}>

  if (!isGranted) {
    <View style={generalStyles.wrap}>
      <Text>위치 정보 허용이 필요합니다.</Text>
    </View>
  }
  return (
    <View style={generalStyles.wrap}>
      <Header title="근처 약국" />
        <View style={styles.buttonContainer}>
          <MapButton title="지도 리스트" onPress={() => setViewMode("map")} />
          <MapButton title="목록으로 보기" onPress={() => setViewMode('list')} />
          <MapButton title="즐겨찾기 목록" onPress={() => setViewMode("favorite")} />
        </View>
        <View style={styles.container}>
          {viewMode === 'map' ? <MapList /> : viewMode === 'list' ? <ListDisplay /> : <PharmacyList />}
        </View>
    </View>
  );
};

export default LocationScreen;
