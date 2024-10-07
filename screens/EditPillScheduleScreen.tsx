import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StatusBar, ScrollView, TouchableOpacity, Animated, Easing, Vibration, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Feather";

import { editPillScheduleStyle } from "./styles/editPillScheduleStyle";
import { generalStyles } from "./styles/generalStyle";
import { generalValues } from "./styles/generalValues";
import { pillSearchStyle } from "./styles/pillSearchStyle";

import { TIME_TYPE, storeObjectType } from "../interfaces";

import HeaderWithBack from "./components/HeaderWithBack";

const timeZoneList: TIME_TYPE[] = ["AFTER_WAKING_UP", "AFTER_BREAKFAST", "AFTER_LUNCH", "AFTER_DINNER", "BEFORE_BED", "ANYTIME"];

/**
 * 약섭취 일정(스케쥴) 설정 화면
 * @returns {React.Component}
 */
const EditPillScheduleScreen = ({ navigation }: any) => {
  const [alarmData, setAlarmData] = useState<storeObjectType>({
    AFTER_WAKING_UP: [],
    AFTER_BREAKFAST: [],
    AFTER_LUNCH: [],
    AFTER_DINNER: [],
    BEFORE_BED: [],
    ANYTIME: [],
  });

  const goToAddPillScheduleScreen = () => {
    Vibration.vibrate(20);
    navigation.navigate("AddPillScheduleScreen");
  };

  const timeZoneToKorean = (timeZone: TIME_TYPE | null): string[] => {
    switch (timeZone) {
      case "AFTER_BREAKFAST":
        return ["조식 후", "오전", "8:00"];
      case "AFTER_DINNER":
        return ["중식 후", "오후", "1:00"];
      case "AFTER_LUNCH":
        return ["석식 후", "오후", "6:00"];
      case "AFTER_WAKING_UP":
        return ["기상직후", "오전", "7:00"];
      case "BEFORE_BED":
        return ["취침 전", "오후", "10:00"];
      case "ANYTIME":
        return ["아무때나"];
    }
    return [""];
  };

  // 이 스크린에 진입할 때 마다 실행되게
  useFocusEffect(
    // 콜백으로 함수 재생성 방지
    useCallback(() => {
      const getData = async () => {
        try {
          const jsonAlarmData = await AsyncStorage.getItem("@PillSchedule");
          if (jsonAlarmData) {
            const alarmDataList = JSON.parse(jsonAlarmData);
            setAlarmData(alarmDataList);
          }
        } catch (err) {}
      };
      getData();
    }, [])
  );

  // + 버튼 바운스 애니메이션 (등록된 알람이 없을때 버튼 하이라이팅 용도)
  const translateY = new Animated.Value(0);
  useEffect(() => {
    const bounceAnimation = () => {
      Animated.timing(translateY, {
        toValue: -20,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(translateY, {
          toValue: 0,
          duration: 500,
          easing: Easing.bounce,
          useNativeDriver: true,
        }).start();
      });
    };

    // 2초마다 방방 뛰게하지만 알람이 등록된게 있다면 애니메이션 적용 X
    let bounceInterval: NodeJS.Timeout;
    if (Object.values(alarmData).every((array) => array.length === 0)) {
      bounceInterval = setInterval(() => {
        bounceAnimation();
      }, 2000);
    }

    return () => clearInterval(bounceInterval);
  }, [translateY, alarmData]);

  return (
    <View style={generalStyles.wrap}>
      <StatusBar backgroundColor={generalValues.containerColor} barStyle="dark-content" animated={true} />
      <HeaderWithBack title="복용 알람" />

      {/* 등록된 알람이 있을 때, 알람 내용 표출 */}
      {!Object.values(alarmData).every((array) => array.length < 1) ? (
        <ScrollView style={editPillScheduleStyle.scrollViewWrap}>
          {timeZoneList.map(
            (element, idx) =>
              alarmData[element].length > 0 && (
                <View style={editPillScheduleStyle.itemWrap} key={idx}>
                  <View style={editPillScheduleStyle.itemTitleWrap}>
                    <Text style={editPillScheduleStyle.itemTitleLabelBold}>{timeZoneToKorean(element)[0]}</Text>
                    <Text style={editPillScheduleStyle.itemTitleLabelReg}>
                      {timeZoneToKorean(element)[1]} {timeZoneToKorean(element)[2]}
                    </Text>
                  </View>

                  {alarmData[element].map((pillElement, pillIdx) => (
                    <View style={editPillScheduleStyle.itemInfoWrap} key={pillIdx}>
                      <Image
                        source={
                          pillElement.MEDICINE_INFO.itemImage
                            ? { uri: pillElement.MEDICINE_INFO.itemImage }
                            : require("../assets/not_supported.png")
                        }
                        style={[pillSearchStyle.resultImage, { width: 120, height: 65 }]}
                      />
                      <View style={editPillScheduleStyle.itemInfoLabelWrap}>
                        <Text style={editPillScheduleStyle.itemInfoLabel}>{pillElement.MEDICINE_INFO.itemName}</Text>
                        <View style={editPillScheduleStyle.itemInfoTagWarp}>
                          <View style={editPillScheduleStyle.itemInfoTag}>
                            <Text style={editPillScheduleStyle.itemInfoTagLabel}>{pillElement.NUMBER_OF_PILLS}정</Text>
                          </View>
                          <View style={editPillScheduleStyle.itemInfoTag}>
                            <Text style={editPillScheduleStyle.itemInfoTagLabel}>
                              {pillElement.MEDICINE_INTERVALS === 1 ? "매일마다" : `${pillElement.MEDICINE_INTERVALS}일 마다`}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )
          )}
        </ScrollView>
      ) : (
        /* 등록된 알람이 없을 때, 안내문구 표출 */
        <View style={editPillScheduleStyle.notyetContainer}>
          <Text style={editPillScheduleStyle.notyetLabel}>아직 등록된 복용 알람이 없어요</Text>
        </View>
      )}

      <Animated.View style={[editPillScheduleStyle.addButtonWrap, { transform: [{ translateY }] }]}>
        <TouchableOpacity style={editPillScheduleStyle.addButton} onPress={goToAddPillScheduleScreen}>
          <Icon name="plus" size={50} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default EditPillScheduleScreen;

/*
FIXME: 복구되거나 죽거나 둘 중 하나
          {alarmData.map((element, idx) => (
            <TouchableOpacity style={[editPillScheduleStyle.itemWrap, { marginTop: 10 }]} key={idx}>
              <View style={editPillScheduleStyle.itemInfoWrap}>
                <Image
                  source={{ uri: element.MEDICINE_IMAGE }}
                  style={[pillSearchStyle.resultImage, { width: 120, height: 65 }]}
                />
                <View style={pillSearchStyle.resultLabelWrap}>
                  <Text style={pillSearchStyle.resultItemTitle}>{element.MEDICINE_NAME}</Text>
                  <Text style={pillSearchStyle.resultItemLore}>{element.MEDICINE_CLASS_NAME}</Text>
                </View>
              </View>
              <View style={editPillScheduleStyle.itemTimeWrap}>
                {element.MEDICINE_TIME_ZONE?.map((timeElement, timeIdx) => (
                  <View key={timeIdx}>
                    <Text>{timeZoneToKorean(timeElement)[0]}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
*/
