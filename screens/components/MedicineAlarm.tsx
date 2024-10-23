import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Image, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { mainStyles } from "../styles/mainStyle";
import { generalStyles } from "../styles/generalStyle";
import { generalValues } from "../styles/generalValues";
import { medicineAlarmStyles } from "../styles/medicineAlarmStyles";

import FeatherIcons from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TIME_TYPE, storeObjectType, pillScheduleDetailInterface } from "../../interfaces";
import { ScrollView } from "react-native-gesture-handler";

const MedicineAlarm = () => {
  // 현재 시간 State
  const [currentTime, setCurrentTime] = useState(new Date());
  // 불러와진 전체 복약 알람
  const [alarmData, setAlarmData] = useState<storeObjectType>({
    AFTER_WAKING_UP: [],
    AFTER_BREAKFAST: [],
    AFTER_LUNCH: [],
    AFTER_DINNER: [],
    BEFORE_BED: [],
    ANYTIME: [],
  });
  // 금일 복약 알람
  const [dailyAlarmData, setDailyAlarmData] = useState<storeObjectType>({
    AFTER_WAKING_UP: [],
    AFTER_BREAKFAST: [],
    AFTER_LUNCH: [],
    AFTER_DINNER: [],
    BEFORE_BED: [],
    ANYTIME: [],
  });

  // 시간대 목록
  const timeZoneList: TIME_TYPE[] = [
    "AFTER_WAKING_UP",
    "AFTER_BREAKFAST",
    "AFTER_LUNCH",
    "AFTER_DINNER",
    "BEFORE_BED",
    "ANYTIME",
  ];

  // 컴포넌트 업데이트
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // 1초마다 업데이트

    return () => clearInterval(timeInterval); // 컴포넌트가 언마운트되면 타이머 해제
  }, []);

  /**
   * 복약주기가 있는 약품의 복약 날짜를 뱉어주는 함수
   * @param startDate 복약시작일
   * @param endDate 복약종료일
   * @param intervals 복약주기 (일 수)
   * @returns
   */
  const generatePillDates = (startDate: Date, endDate: Date, intervals: number): Date[] => {
    const medicationDates: Date[] = [];
    const currentDate = new Date(startDate);
    const endDateTmp = new Date(endDate);

    while (currentDate.getTime() <= endDateTmp.getTime()) {
      medicationDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + intervals);
    }

    return medicationDates;
  };

  // 복약 계획 데이터 불러오기
  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        try {
          const jsonAlarmData = await AsyncStorage.getItem("@PillSchedule");
          if (jsonAlarmData) {
            const alarmDataList = JSON.parse(jsonAlarmData);
            setAlarmData(alarmDataList);
            console.log("🔵 MedicineAlarm.tsx\t\talarmDataList 사용자지정 알람 목록 정상 로드됨.");
          }
        } catch (err) {}
      };
      getData();
    }, [])
  );

  // 금일 복약해야하는 약 업데이트 및 State 반영
  useEffect(() => {
    setDailyAlarmData({
      AFTER_WAKING_UP: [],
      AFTER_BREAKFAST: [],
      AFTER_LUNCH: [],
      AFTER_DINNER: [],
      BEFORE_BED: [],
      ANYTIME: [],
    });

    const dailyAlarmDataAfter: storeObjectType = {
      AFTER_WAKING_UP: [],
      AFTER_BREAKFAST: [],
      AFTER_LUNCH: [],
      AFTER_DINNER: [],
      BEFORE_BED: [],
      ANYTIME: [],
    };

    timeZoneList.forEach((timeZoneElement) => {
      const pillList = alarmData[timeZoneElement];
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      pillList.forEach((pillElement) => {
        if (new Date(pillElement.START_DATE!) <= today || new Date(pillElement.END_DATE!) >= today) {
          if (pillElement.MEDICINE_INTERVALS == 1) {
            // 매일마다 복약하는 약일 떄
            dailyAlarmDataAfter[timeZoneElement].push(pillElement);
          } else {
            // 특정 일 수 마다 복약하는 약일 때
            const PillDates = generatePillDates(pillElement.START_DATE!, pillElement.END_DATE!, pillElement.MEDICINE_INTERVALS!);
            const dateExists = PillDates.some((date) => date.getTime() === today.getTime());
            if (dateExists) {
              // 특정일수 마다 복용해야하는 날이 오늘일 때
              dailyAlarmDataAfter[timeZoneElement].push(pillElement);
            }
          }
        }
      });
    });
    setDailyAlarmData(dailyAlarmDataAfter);
  }, [alarmData]);

  /**
   * 현재 시간과 요일을 오브젝트로 던져줌
   * @returns 요일, 오전오후 현재시간
   */
  const getFormattedTime = () => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const ampm = hours >= 12 ? "오후" : "오전";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    return {
      formattedDay: `${days[currentTime.getDay()]}요일`,
      formattedTime: `${ampm} ${formattedHours}시 ${formattedMinutes}분`,
    };
  };

  /**
   * 현재시간을 기준으로 앞으로 다가올 타임존 반환
   * @returns TIME_TYPE
   */
  const getNextTimeZone = (): TIME_TYPE => {
    const now = new Date();
    if (now.getHours() < 7) {
      return "AFTER_WAKING_UP";
    } else if (now.getHours() < 8) {
      return "AFTER_BREAKFAST";
    } else if (now.getHours() < 13) {
      return "AFTER_LUNCH";
    } else if (now.getHours() < 18) {
      return "AFTER_DINNER";
    } else {
      return "BEFORE_BED";
    }
  };

  let timeZoneText = "";
  switch (getNextTimeZone()) {
    case "AFTER_WAKING_UP":
      timeZoneText = "기상 직후 오전 7시";
    case "AFTER_BREAKFAST":
      timeZoneText = "조식 후 오전 8시";
    case "AFTER_LUNCH":
      timeZoneText = "중식 후 오후 1시";
    case "AFTER_DINNER":
      timeZoneText = "석식 후 오후 6시";
    case "BEFORE_BED":
      timeZoneText = "취침 전 오후 10시";
  }

  const renderCurrentPillList = ({ item }: { item: pillScheduleDetailInterface }) => (
    <View style={medicineAlarmStyles.pillListItemContainer}>
      <Image
        source={item.MEDICINE_INFO.itemImage ? { uri: item.MEDICINE_INFO.itemImage } : require("../../assets/not_supported.png")}
        style={medicineAlarmStyles.pillListItemImage}
      />
      <View style={medicineAlarmStyles.pillListItemTitleContainer}>
        <Text style={medicineAlarmStyles.pillListItemTitle} numberOfLines={1}>
          {item.MEDICINE_INFO.itemName}
        </Text>
        <Text style={medicineAlarmStyles.pillListItemSubTitle}>{item.NUMBER_OF_PILLS}정</Text>
      </View>
    </View>
  );

  interface DailyListItemDisplayProps {
    timeZone: TIME_TYPE;
  }
  const DailyListItemDisplay: React.FC<DailyListItemDisplayProps> = ({ timeZone }) => {
    return (
      <>
        {dailyAlarmData[timeZone].length > 0 ? (
          <View style={medicineAlarmStyles.dailyScheduleListItemIconContainer}>
            <MaterialCommunityIcons name="pill" size={40} color="white" />
            <Text style={medicineAlarmStyles.dailyScheduleListItemIconLabel} numberOfLines={1}>
              {dailyAlarmData[timeZone][0].MEDICINE_INFO.itemName}
            </Text>
          </View>
        ) : (
          <FeatherIcons name="x" size={40} color="white" />
        )}
      </>
    );
  };

  return (
    <View style={[generalStyles.rowContainer, { marginTop: generalValues.gap }]}>
      <View style={mainStyles.alarmContainer}>
        {dailyAlarmData[getNextTimeZone()].length > 0 ? (
          <>
            <View style={medicineAlarmStyles.titleContainer}>
              <Text style={medicineAlarmStyles.titleLabel}>{timeZoneText}</Text>
            </View>
            <View style={medicineAlarmStyles.pillInfoContainer}>
              <View style={medicineAlarmStyles.pillTitleContainer}>
                <Text style={medicineAlarmStyles.pillTitle} numberOfLines={1}>
                  {dailyAlarmData[getNextTimeZone()][0].MEDICINE_INFO.itemName}
                </Text>
                {dailyAlarmData[getNextTimeZone()].length > 1 ? (
                  <Text style={medicineAlarmStyles.pillSubtitle}>외 {dailyAlarmData[getNextTimeZone()].length - 1}종</Text>
                ) : (
                  <></>
                )}
              </View>
              <Image
                source={
                  dailyAlarmData[getNextTimeZone()][0].MEDICINE_INFO.itemImage
                    ? { uri: dailyAlarmData[getNextTimeZone()][0].MEDICINE_INFO.itemImage }
                    : require("../../assets/not_supported.png")
                }
                style={medicineAlarmStyles.pillImage}
              />
            </View>
            <FlatList
              style={medicineAlarmStyles.pillListContainer}
              data={dailyAlarmData[getNextTimeZone()]}
              renderItem={renderCurrentPillList}
              keyExtractor={(item) => item.MEDICINE_INFO.itemSeq}
              nestedScrollEnabled={true}
            />
            <Text style={medicineAlarmStyles.dailyScheduleListTitle}>내 알람</Text>
            <ScrollView
              style={medicineAlarmStyles.dailyScheduleListScrollVeiw}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              nestedScrollEnabled={true}
            >
              <View style={medicineAlarmStyles.dailyScheduleListContainer}>
                <View style={medicineAlarmStyles.dailyScheduleListItemContainer}>
                  <DailyListItemDisplay timeZone="AFTER_WAKING_UP" />

                  <Text style={medicineAlarmStyles.dailyScheduleListItemSubtitle}>기상 직후</Text>
                </View>
                <View style={medicineAlarmStyles.dailyScheduleListItemSeperator} />
                <View style={medicineAlarmStyles.dailyScheduleListItemContainer}>
                  <DailyListItemDisplay timeZone="AFTER_BREAKFAST" />
                  <Text style={medicineAlarmStyles.dailyScheduleListItemSubtitle}>조식 후</Text>
                </View>
                <View style={medicineAlarmStyles.dailyScheduleListItemSeperator} />
                <View style={medicineAlarmStyles.dailyScheduleListItemContainer}>
                  <DailyListItemDisplay timeZone="AFTER_LUNCH" />
                  <Text style={medicineAlarmStyles.dailyScheduleListItemSubtitle}>중식 후</Text>
                </View>
                <View style={medicineAlarmStyles.dailyScheduleListItemSeperator} />
                <View style={medicineAlarmStyles.dailyScheduleListItemContainer}>
                  <DailyListItemDisplay timeZone="AFTER_DINNER" />
                  <Text style={medicineAlarmStyles.dailyScheduleListItemSubtitle}>석식 후</Text>
                </View>
                <View style={medicineAlarmStyles.dailyScheduleListItemSeperator} />
                <View style={medicineAlarmStyles.dailyScheduleListItemContainer}>
                  <DailyListItemDisplay timeZone="BEFORE_BED" />
                  <Text style={medicineAlarmStyles.dailyScheduleListItemSubtitle}>취침 전</Text>
                </View>
                <View style={medicineAlarmStyles.dailyScheduleListItemSeperator} />
                <View style={medicineAlarmStyles.dailyScheduleListItemContainer}>
                  <DailyListItemDisplay timeZone="ANYTIME" />
                  <Text style={medicineAlarmStyles.dailyScheduleListItemSubtitle}>아무때나</Text>
                </View>
              </View>
            </ScrollView>
            <></>
          </>
        ) : (
          <View style={medicineAlarmStyles.notAddedContainer}>
            <Text style={medicineAlarmStyles.notAddedTitleLabel}>아직 추가된 약속이 없습니다.</Text>
            <View style={medicineAlarmStyles.notAddedLabelContainer}>
              <Text style={medicineAlarmStyles.notAddedSubtitleLabel}>아래의 </Text>
              <Text style={medicineAlarmStyles.notAddedSubtitleLabelBold}>알람 설정하기</Text>
              <Text style={medicineAlarmStyles.notAddedSubtitleLabel}> 버튼을 눌러 약속을 추가해보세요.</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default MedicineAlarm;

/*
            <Image
              source={
                dailyAlarmData[getNextTimeZone()][0].MEDICINE_INFO.itemImage
                  ? { uri: dailyAlarmData[getNextTimeZone()][0].MEDICINE_INFO.itemImage }
                  : require("../../assets/not_supported.png")
              }
            />
*/
