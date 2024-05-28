import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Animated,
  Vibration,
  Image,
  LayoutChangeEvent,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconMaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Toast from "react-native-toast-message";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useRoute } from "@react-navigation/native";

import { pillSearchStyle } from "../styles/pillSearchStyle";
import { detailInputStyle } from "../styles/detailInputStyle";
import { generalStyles } from "../styles/generalStyle";
import { generalValues } from "../styles/generalValues";

import HeaderWithBack from "../components/HeaderWithBack";

/** Pill Search 스크린에서부터 라우트로 넘겨받는 데이터 인터페이스 */
interface pillDataInterface {
  imageURL: string | null;
  pillSEQ: string;
  pillName: string;
  pillLore: string;
}
/** 시간대 별 코드 타입  */
export type TIME_TYPE = "AFTER_WAKING_UP" | "AFTER_BREAKFAST" | "AFTER_LUNCH" | "AFTER_DINNER" | "BEFORE_BED" | "ANYTIME";
/** 알람 저장 인터페이스 */
export interface pillScheduleDetailInterface {
  /** 약 사진 */
  MEDICINE_IMAGE: string;
  /** 약 이름 */
  MEDICINE_NAME: string;
  /** 약 설명 */
  MEDICINE_CLASS_NAME: string | null;
  /** 복약 주기 (일 수) */
  MEDICINE_INTERVALS: number | null;
  /** 복약 시간 */
  MEDICINE_TIME_ZONE: TIME_TYPE[];
  /** 상세 복약 시간 TODO: 추후 판단 후 삭제 예정 */
  MEDICINE_TIME: string[] | null;
  /** 복약 갯수 */
  NUMBER_OF_PILLS: number | null;
  /** 복약 시작 날짜 */
  START_DATE: Date | null;
  /** 복약 종료 날짜 */
  END_DATE: Date | null;
  /** 총 복약 일 수 (TODO: 추후 판단 후 삭제 예정) */
  TOTAL_DAYS: number | null;
}
/** 알람이 저장될 때 사용될 Json 겸 Object 인터페이스 타입 */
export type storeObjectType = Record<TIME_TYPE, pillScheduleDetailInterface[]>;

const MAX_INPUT_STAGE = 5; // TODO: !!! 내용 추가시 꼭 수정할것 !!!

const StageIndicator = (MAX_STAGE: number, CURRENT_STAGE: number) => {
  return (
    <>
      {[...Array(MAX_STAGE)].map((_, idx) => (
        <View
          key={idx}
          style={[detailInputStyle.stageIndicator, idx === CURRENT_STAGE && detailInputStyle.stageIndicatorOn]}
        ></View>
      ))}
    </>
  );
};

const DetailInputScreen = ({ navigation }: any) => {
  const route = useRoute(); // 라우트 선언
  const selectedPillData = route.params as pillDataInterface; // 선택한 약 가져오기

  const [inputStage, setInputStage] = useState(0); // 현재 입력창 단계
  const [outerScrollViewWidth, setOuterScrollViewWidth] = useState(0); // 입력창 Wrap Width 값
  const [selectedItems, setSelectedItems] = useState<boolean[]>([]); // 입력창 내 선택 항목 선택 여부 boolean 배열
  const [inputtedDetailInfo, setInputtedDetailInfo] = useState<pillScheduleDetailInterface>({
    // 복약 세부정보 Object
    MEDICINE_IMAGE: selectedPillData.imageURL != null ? selectedPillData.imageURL : "",
    MEDICINE_NAME: selectedPillData.pillName,
    MEDICINE_CLASS_NAME: selectedPillData.pillLore,
    MEDICINE_INTERVALS: null,
    MEDICINE_TIME_ZONE: ["ANYTIME"],
    MEDICINE_TIME: null,
    NUMBER_OF_PILLS: null,
    START_DATE: null,
    END_DATE: null,
    TOTAL_DAYS: null,
  });
  const [query, setQuery] = useState(""); // 세부정보 사용자 입력 저장
  const [isDateModalOpen, setIsDateModalOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const scrollViewRef = useRef<ScrollView>(null);

  // 잘 못 입력했거나 올바르지 오류상황시 애니메이션
  const [shakeTranslate] = useState(new Animated.Value(0));
  const [shakeBackgroundColor] = useState(new Animated.Value(0));
  const interpolatedBackgroundColor = shakeBackgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: [generalValues.highlightColor, "red"],
  });
  const errorAnimation = () => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(shakeTranslate, { toValue: 5, duration: 80, useNativeDriver: true }),
        Animated.timing(shakeTranslate, { toValue: -5, duration: 80, useNativeDriver: true }),
        Animated.timing(shakeTranslate, { toValue: 5, duration: 80, useNativeDriver: true }),
        Animated.timing(shakeTranslate, { toValue: -5, duration: 80, useNativeDriver: true }),
        Animated.timing(shakeTranslate, { toValue: 5, duration: 80, useNativeDriver: true }),
        Animated.timing(shakeTranslate, { toValue: 0, duration: 80, useNativeDriver: true }),
      ]),
      Animated.sequence([
        Animated.timing(shakeBackgroundColor, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(shakeBackgroundColor, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]),
    ]).start();
  };

  /**
   * 대충 복약계획 목록 스크린으로 이동하는 함수
   */
  const goToEditPillScheduleScreen = () => {
    Vibration.vibrate(20);
    navigation.navigate("EditPillScheduleScreen");
  };

  /**
   * 스테이지 최상위 컴포넌트 Width 값 추적 후 입력단계 페이지 넓이 설정
   * @param event LayoutChangeEvent
   */
  const layOutRefresh = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setOuterScrollViewWidth(width - 20); // margin 값은 뺌
  };

  /**
   * 사용자가 입력한 숫자(String)가 숫자가 맞으며 범위내에 있는지 판단하는 함수
   * @param textNum 입력받은 String
   * @param MIN 최소 (범위)
   * @param MAX 최대 (범위)
   * @returns boolean
   */
  const correctNumber = (textNum: string, MIN: number, MAX: number): boolean => {
    if (!/^\d+$/.test(textNum)) return false; // 정수인지 확인
    const number = parseInt(textNum);
    if (number < MIN || number > MAX) return false; // 범위 확인
    return true;
  };

  /**
   * Date 객체 던져주면 "****년 **월 **일" 포멧으로 반환
   * @param date
   * @returns "****년 **월 **일"
   */
  const formatKoreanDate = (date: Date): string => {
    if (!(date instanceof Date)) return "";
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("ko-KR", options).format(date);
  };

  /**
   * 입력된 값들 AsyncStorage에 저장(누적)
   * @param value pillScheduleDetailInterface 인터페이스 Object 만 받음
   */
  const storeData = async (value: pillScheduleDetailInterface) => {
    const initDataArray: storeObjectType = {
      AFTER_WAKING_UP: [],
      AFTER_BREAKFAST: [],
      AFTER_LUNCH: [],
      AFTER_DINNER: [],
      BEFORE_BED: [],
      ANYTIME: [],
    };

    try {
      const existingData = await AsyncStorage.getItem("@PillSchedule"); // 기존 데이터를 불러옮
      const dataArray: storeObjectType = existingData ? JSON.parse(existingData) : initDataArray; // 데이터가 쌓일 배열을 생성 (초기화)
      value.MEDICINE_TIME_ZONE.map((element) => {
        // 시간대 별로 분류해서 같은 내용 저장
        dataArray[element].push(value); // 데이터 쌓기
      });
      await AsyncStorage.setItem("@PillSchedule", JSON.stringify(dataArray)); // 저장
      goToEditPillScheduleScreen();
    } catch (e) {
      // 저장 오류 처리
      console.error(e);
    }
  };

  /**
   * 세부정보 입력 페이지, 다음 페이지로
   * @returns void
   */
  const nextStage = (): void => {
    Vibration.vibrate(20);
    let prevData = inputtedDetailInfo;

    switch (inputStage) {
      case 0:
        // 복약 주기
        let MEDICINE_INTERVALS = 1;
        if (!selectedItems[0] && !selectedItems[1]) {
          errorAnimation();
          return;
        }
        if (selectedItems[1] && !correctNumber(query, 2, 99)) {
          errorAnimation();
          return;
        }
        MEDICINE_INTERVALS = 1;
        if (selectedItems[1]) MEDICINE_INTERVALS = parseInt(query);
        prevData = { ...prevData, MEDICINE_INTERVALS: MEDICINE_INTERVALS };
        setInputtedDetailInfo(prevData);
        break;

      case 1:
        // 복약 시간
        let allFalseCheck = false;
        let resultArray: TIME_TYPE[] = [];
        selectedItems.map((element, idx) => {
          allFalseCheck = allFalseCheck ? true : element;
          if (element) {
            if (idx === 0) resultArray.push("AFTER_WAKING_UP");
            else if (idx === 1) resultArray.push("AFTER_BREAKFAST");
            else if (idx === 2) resultArray.push("AFTER_LUNCH");
            else if (idx === 3) resultArray.push("AFTER_DINNER");
            else if (idx === 4) resultArray.push("BEFORE_BED");
            else if (idx === 5) resultArray.push("ANYTIME");
          }
        });
        if (!allFalseCheck) {
          errorAnimation();
          return;
        }
        prevData = { ...prevData, MEDICINE_TIME_ZONE: resultArray };
        setInputtedDetailInfo(prevData);
        break;

      case 2:
        // 복약 갯수
        if (!correctNumber(query, 1, 10)) {
          errorAnimation();
          return;
        }
        prevData = { ...prevData, NUMBER_OF_PILLS: parseInt(query) };
        setInputtedDetailInfo(prevData);
        break;

      case 3:
        // 시작 날짜
        prevData = { ...prevData, START_DATE: selectedDate };
        setInputtedDetailInfo(prevData);
        setIsDateModalOpen(false);
        break;

      case 4:
        // 종료 날짜
        if (!inputtedDetailInfo.START_DATE) return;
        if (inputtedDetailInfo.START_DATE > selectedDate) {
          errorAnimation();
          return;
        }
        prevData = { ...prevData, END_DATE: selectedDate };
        setInputtedDetailInfo(prevData);
        setIsDateModalOpen(false);
        break;
    }
    if (inputStage + 1 >= MAX_INPUT_STAGE) {
      // 모든 단계 입력 완료!
      storeData(inputtedDetailInfo);
      return;
    }
    setInputStage(inputStage + 1);
    scrollViewRef.current?.scrollTo({ x: outerScrollViewWidth * (inputStage + 1), animated: true });
  };

  /**
   * 세부정보 입력 페이지, 이전 페이지로
   * @returns void
   */
  const previousStage = () => {
    if (inputStage < 1) return; // 생성한 페이지 외에서 코드 작동 방지
    Vibration.vibrate(20);
    setInputStage(inputStage - 1);
    scrollViewRef.current?.scrollTo({ x: outerScrollViewWidth * (inputStage - 1), animated: true });
  };

  /**
   * 사용자가 선택한 항목과 현재 입력 단계에 따라서 selectedItems State 업데이트
   * @param idx 사용자가 선택한 항목
   */
  const updateSelection = (idx: number) => {
    let initialArray: boolean[] = new Array(2);
    switch (inputStage) {
      case 0:
        initialArray = new Array(2);
        initialArray.fill(false);
        initialArray[idx] = true;
        setSelectedItems(initialArray);
        break;
      case 1:
        initialArray = [...selectedItems];
        if (idx === 5) {
          initialArray[0] = false;
          initialArray[1] = false;
          initialArray[2] = false;
          initialArray[3] = false;
          initialArray[4] = false;
        } else {
          initialArray[5] = false;
        }
        initialArray[idx] = !initialArray[idx];
        setSelectedItems(initialArray);
        break;
    }
  };

  /**
   * 대충 날짜 선택 모달창내 값 변동 반영하는 함수
   * @param event DateTimePickerEvent
   * @param date Date
   */
  const onSelectedDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === "set" && date) setSelectedDate(date);
    setIsDateModalOpen(false);
  };

  /**
   * 대충 날짜 선택 모달창 여는 함수
   */
  const showDatePicker = () => {
    setIsDateModalOpen(true);
  };

  useEffect(() => {
    let initialArray: boolean[] = new Array(2);
    setQuery("");
    switch (inputStage) {
      case 0:
        initialArray = new Array(2);
        initialArray.fill(false);
        setSelectedItems(initialArray);
        break;
      case 1:
        initialArray = new Array(6);
        initialArray.fill(false);
        setSelectedItems(initialArray);
        break;
    }
  }, [inputStage]);

  useEffect(() => {
    console.log(inputtedDetailInfo);
  }, [inputtedDetailInfo]);

  return (
    <View style={generalStyles.wrap}>
      <StatusBar backgroundColor={generalValues.containerColor} barStyle="dark-content" animated={true} />
      <HeaderWithBack title="세부정보 입력" />
      <View onLayout={layOutRefresh} style={detailInputStyle.outerContainer}>
        <View style={[pillSearchStyle.resultItemContainer, { marginTop: 10 }]}>
          <Image
            source={{ uri: selectedPillData.imageURL != null ? selectedPillData.imageURL : "" }}
            style={[pillSearchStyle.resultImage, { width: 120, height: 65 }]}
          />
          <View style={pillSearchStyle.resultLabelWrap}>
            <Text style={pillSearchStyle.resultItemTitle}>{selectedPillData.pillName}</Text>
            <Text style={pillSearchStyle.resultItemLore}>{selectedPillData.pillLore}</Text>
          </View>
        </View>

        <View style={detailInputStyle.container}>
          <View style={detailInputStyle.stageIndicatorWrap}>{StageIndicator(MAX_INPUT_STAGE, inputStage)}</View>

          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            scrollEnabled={false}
            ref={scrollViewRef}
            style={detailInputStyle.innerHrizonScrollView}
            contentContainerStyle={{ alignItems: "flex-start" }}
          >
            <View style={[detailInputStyle.innerContainer, { width: outerScrollViewWidth }]}>
              <IconAntDesign name="calendar" size={50} color={generalValues.highlightColor} style={detailInputStyle.stageIcon} />
              <Text style={detailInputStyle.stageTitle}>얼마나 자주 복약하시나요?</Text>
              <View style={detailInputStyle.selectionGroup}>
                <View style={detailInputStyle.selectionRowGroup}>
                  <TouchableOpacity
                    style={[
                      detailInputStyle.selectionItemsButton,
                      { backgroundColor: selectedItems[0] ? generalValues.highlightColor : "white" },
                    ]}
                    onPress={() => {
                      updateSelection(0);
                    }}
                  >
                    <Text style={[detailInputStyle.selectionItemsLabel, { color: selectedItems[0] ? "white" : "#454545" }]}>
                      매일
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      detailInputStyle.selectionItemsButton,
                      { backgroundColor: selectedItems[1] ? generalValues.highlightColor : "white" },
                    ]}
                    onPress={() => {
                      updateSelection(1);
                    }}
                  >
                    <Text style={[detailInputStyle.selectionItemsLabel, { color: selectedItems[1] ? "white" : "#454545" }]}>
                      특정 일수 간격
                    </Text>
                  </TouchableOpacity>
                </View>
                {selectedItems[1] && (
                  <TextInput
                    style={detailInputStyle.selectionTextinput}
                    selectionColor={generalValues.highlightColor}
                    keyboardType="number-pad"
                    placeholder="2~99 숫자 입력"
                    onChangeText={setQuery}
                  ></TextInput>
                )}
              </View>
            </View>

            <View style={[detailInputStyle.innerContainer, { width: outerScrollViewWidth }]}>
              <IconAntDesign name="calendar" size={50} color={generalValues.highlightColor} style={detailInputStyle.stageIcon} />
              <Text style={detailInputStyle.stageTitle}>언제 복약하시나요?</Text>
              <View style={detailInputStyle.selectionGroup}>
                <View style={detailInputStyle.selectionRowGroup}>
                  <TouchableOpacity
                    style={[
                      detailInputStyle.selectionItemsButton,
                      { backgroundColor: selectedItems[0] ? generalValues.highlightColor : "white" },
                    ]}
                    onPress={() => {
                      updateSelection(0);
                    }}
                  >
                    <Text style={[detailInputStyle.selectionItemsLabel, { color: selectedItems[0] ? "white" : "#454545" }]}>
                      기상직후 (7시)
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      detailInputStyle.selectionItemsButton,
                      { backgroundColor: selectedItems[1] ? generalValues.highlightColor : "white" },
                    ]}
                    onPress={() => {
                      updateSelection(1);
                    }}
                  >
                    <Text style={[detailInputStyle.selectionItemsLabel, { color: selectedItems[1] ? "white" : "#454545" }]}>
                      조식 후 (8시)
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={detailInputStyle.selectionRowGroup}>
                  <TouchableOpacity
                    style={[
                      detailInputStyle.selectionItemsButton,
                      { backgroundColor: selectedItems[2] ? generalValues.highlightColor : "white" },
                    ]}
                    onPress={() => {
                      updateSelection(2);
                    }}
                  >
                    <Text style={[detailInputStyle.selectionItemsLabel, { color: selectedItems[2] ? "white" : "#454545" }]}>
                      중식 후 (13시)
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      detailInputStyle.selectionItemsButton,
                      { backgroundColor: selectedItems[3] ? generalValues.highlightColor : "white" },
                    ]}
                    onPress={() => {
                      updateSelection(3);
                    }}
                  >
                    <Text style={[detailInputStyle.selectionItemsLabel, { color: selectedItems[3] ? "white" : "#454545" }]}>
                      석식 후 (18시)
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={detailInputStyle.selectionRowGroup}>
                  <TouchableOpacity
                    style={[
                      detailInputStyle.selectionItemsButton,
                      { backgroundColor: selectedItems[4] ? generalValues.highlightColor : "white" },
                    ]}
                    onPress={() => {
                      updateSelection(4);
                    }}
                  >
                    <Text style={[detailInputStyle.selectionItemsLabel, { color: selectedItems[4] ? "white" : "#454545" }]}>
                      취침전 (22시)
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      detailInputStyle.selectionItemsButton,
                      { backgroundColor: selectedItems[5] ? generalValues.highlightColor : "white" },
                    ]}
                    onPress={() => {
                      updateSelection(5);
                    }}
                  >
                    <Text style={[detailInputStyle.selectionItemsLabel, { color: selectedItems[5] ? "white" : "#454545" }]}>
                      아무때나
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={[detailInputStyle.innerContainer, { width: outerScrollViewWidth }]}>
              <IconMaterialCommunityIcons
                name="pill"
                size={50}
                color={generalValues.highlightColor}
                style={detailInputStyle.stageIcon}
              />
              <Text style={detailInputStyle.stageTitle}>몇 정을 복약하시나요?</Text>
              <TextInput
                style={detailInputStyle.selectionTextinput}
                selectionColor={generalValues.highlightColor}
                keyboardType="number-pad"
                placeholder="1~10 숫자 입력"
                onChangeText={setQuery}
              ></TextInput>
            </View>

            {/*
            <View style={[detailInputStyle.innerContainer, { width: outerScrollViewWidth }]}>
              <IconAntDesign
                name="clockcircleo"
                size={50}
                color={generalValues.highlightColor}
                style={detailInputStyle.stageIcon}
              />
              <Text style={detailInputStyle.stageTitle}>몇 시에 복약하실 건가요?</Text>
            </View>
            */}

            <View style={[detailInputStyle.innerContainer, { width: outerScrollViewWidth }]}>
              <IconMaterialCommunityIcons
                name="pill"
                size={50}
                color={generalValues.highlightColor}
                style={detailInputStyle.stageIcon}
              />
              <Text style={detailInputStyle.stageTitle}>복약 시작일이 언제인가요?</Text>
              <View style={detailInputStyle.selectionRowGroup}>
                <TouchableOpacity
                  style={[
                    detailInputStyle.selectionItemsButton,
                    { backgroundColor: selectedItems[0] ? generalValues.highlightColor : "white" },
                  ]}
                  onPress={() => setIsDateModalOpen(true)}
                >
                  <Text style={detailInputStyle.selectionItemsLabel}>{formatKoreanDate(selectedDate)}</Text>
                </TouchableOpacity>
              </View>
              {isDateModalOpen && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="default"
                  onChange={onSelectedDateChange}
                  onTouchCancel={() => setIsDateModalOpen(false)}
                />
              )}
            </View>

            <View style={[detailInputStyle.innerContainer, { width: outerScrollViewWidth }]}>
              <IconMaterialCommunityIcons
                name="pill"
                size={50}
                color={generalValues.highlightColor}
                style={detailInputStyle.stageIcon}
              />
              <Text style={detailInputStyle.stageTitle}>복약 종료일이 언제인가요?</Text>
              <View style={detailInputStyle.selectionRowGroup}>
                <TouchableOpacity
                  style={[
                    detailInputStyle.selectionItemsButton,
                    { backgroundColor: selectedItems[0] ? generalValues.highlightColor : "white" },
                  ]}
                  onPress={() => setIsDateModalOpen(true)}
                >
                  <Text style={detailInputStyle.selectionItemsLabel}>{formatKoreanDate(selectedDate)}</Text>
                </TouchableOpacity>
              </View>
              {isDateModalOpen && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="default"
                  onChange={onSelectedDateChange}
                  onTouchCancel={() => setIsDateModalOpen(false)}
                />
              )}
            </View>
          </ScrollView>
          <View style={detailInputStyle.stageButtonWrap}>
            <TouchableOpacity
              onPress={previousStage}
              disabled={inputStage < 1 ? true : false}
              style={[detailInputStyle.stageMoveButton, detailInputStyle.prevStageButton, { opacity: inputStage < 1 ? 0 : 1 }]}
            >
              <Text style={[detailInputStyle.stageMoveButtonLabel, detailInputStyle.prevStageButtonLabel]}>이전</Text>
            </TouchableOpacity>
            <Animated.View
              style={[
                detailInputStyle.nextStageButton,
                { transform: [{ translateX: shakeTranslate }], backgroundColor: interpolatedBackgroundColor },
              ]}
            >
              <TouchableOpacity onPress={nextStage} style={[detailInputStyle.stageMoveButton]}>
                <Text style={[detailInputStyle.stageMoveButtonLabel, detailInputStyle.nextStageButtonLabel]}>다음</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </View>
      <Toast />
    </View>
  );
};

export default DetailInputScreen;
