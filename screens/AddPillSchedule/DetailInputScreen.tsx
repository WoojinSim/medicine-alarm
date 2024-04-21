import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Vibration,
  Image,
  Dimensions,
  LayoutChangeEvent,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Feather";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconMaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useRoute } from "@react-navigation/native";

import { pillSearchStyle } from "../styles/pillSearchStyle";
import { detailInputStyle } from "../styles/detailInputStyle";
import { generalStyles } from "../styles/generalStyle";
import { generalValues } from "../styles/generalValues";

import HeaderWithBack from "../components/HeaderWithBack";

interface pillDataInterface {
  imageURL: string | null;
  pillSEQ: string;
  pillName: string;
  pillLore: string;
}

const screenWidth = Dimensions.get("window").width;
const MAX_INPUT_STAGE = 5;

const StageIndicator = (MAX_STAGE: number, CURRENT_STAGE: number) => {
  return (
    <>
      {[...Array(MAX_STAGE)].map((_, idx) => (
        <View key={idx} style={[detailInputStyle.stageIndicator, idx === CURRENT_STAGE && detailInputStyle.stageIndicatorOn]}>
          <></>
        </View>
      ))}
    </>
  );
};

const DetailInputScreen = ({ navigation }: any) => {
  const [inputStage, setInputStage] = useState(0);
  const [date, setDate] = useState(new Date());
  const [outerScrollViewWidth, setOuterScrollViewWidth] = useState(0);
  const route = useRoute();
  const scrollViewRef = useRef<ScrollView>(null);

  const selectedPillData = route.params as pillDataInterface;

  const layOutRefresh = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setOuterScrollViewWidth(width);
  };

  const nextStage = () => {
    if (inputStage >= MAX_INPUT_STAGE) return;
    setInputStage(inputStage + 1);
    scrollViewRef.current?.scrollTo({ x: (outerScrollViewWidth + 10) * (inputStage + 1), animated: true });
  };
  const previousStage = () => {
    if (inputStage < 1) return;
    setInputStage(inputStage - 1);
    scrollViewRef.current?.scrollTo({ x: (outerScrollViewWidth + 10) * (inputStage - 1), animated: true });
  };

  return (
    <View style={generalStyles.wrap}>
      <StatusBar backgroundColor={generalValues.containerColor} barStyle="dark-content" animated={true} />
      <HeaderWithBack title="세부정보 입력" />
      <ScrollView showsVerticalScrollIndicator={false} onLayout={layOutRefresh} style={pillSearchStyle.resultScrollContainer}>
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

        <ScrollView showsVerticalScrollIndicator={false} horizontal={true} ref={scrollViewRef}>
          <View style={[detailInputStyle.container, { width: outerScrollViewWidth }]}>
            <View style={detailInputStyle.backStageButtonWrap}>{StageIndicator(5, 0)}</View>
            <IconAntDesign name="calendar" size={32} color={generalValues.highlightColor} style={detailInputStyle.stageIcon} />
            <Text style={detailInputStyle.stageTitle}>얼마나 자주 복약하시나요?</Text>
            <View>
              <Text>매일</Text>
              <Text>특정 일수 간격</Text>
            </View>
            <TouchableOpacity onPress={nextStage} style={detailInputStyle.testButton}>
              <Text>다음</Text>
            </TouchableOpacity>
          </View>

          <View style={[detailInputStyle.container, { width: outerScrollViewWidth }]}>
            <View style={detailInputStyle.backStageButtonWrap}>
              {StageIndicator(5, 1)}
              <TouchableOpacity style={detailInputStyle.backStageButton} onPressIn={previousStage}>
                <Icon name="arrow-left" size={24} color="#454545" />
              </TouchableOpacity>
            </View>
            <IconAntDesign name="calendar" size={32} color={generalValues.highlightColor} style={detailInputStyle.stageIcon} />
            <Text style={detailInputStyle.stageTitle}>하루에 얼마나 복약하시나요?</Text>
            <View>
              <Text>기상직후</Text>
              <Text>아침 (조식 30분 후)</Text>
              <Text>점심 (점심 30분 후)</Text>
              <Text>저녁 (석식 30분 후)</Text>
              <Text>취침전</Text>
              <Text>아무때나</Text>
            </View>
            <TouchableOpacity onPress={nextStage} style={detailInputStyle.testButton}>
              <Text>다음</Text>
            </TouchableOpacity>
          </View>

          <View style={[detailInputStyle.container, { width: outerScrollViewWidth }]}>
            <View style={detailInputStyle.backStageButtonWrap}>
              {StageIndicator(5, 2)}
              <TouchableOpacity style={detailInputStyle.backStageButton} onPressIn={previousStage}>
                <Icon name="arrow-left" size={24} color="#454545" />
              </TouchableOpacity>
            </View>
            <IconAntDesign
              name="clockcircleo"
              size={32}
              color={generalValues.highlightColor}
              style={detailInputStyle.stageIcon}
            />
            <Text style={detailInputStyle.stageTitle}>언제 복약하시나요?</Text>
            <TouchableOpacity onPress={nextStage} style={detailInputStyle.testButton}>
              <Text>다음</Text>
            </TouchableOpacity>
          </View>

          <View style={[detailInputStyle.container, { width: outerScrollViewWidth }]}>
            <View style={detailInputStyle.backStageButtonWrap}>
              {StageIndicator(5, 3)}
              <TouchableOpacity style={detailInputStyle.backStageButton} onPressIn={previousStage}>
                <Icon name="arrow-left" size={24} color="#454545" />
              </TouchableOpacity>
            </View>
            <IconMaterialCommunityIcons
              name="pill"
              size={32}
              color={generalValues.highlightColor}
              style={detailInputStyle.stageIcon}
            />
            <Text style={detailInputStyle.stageTitle}>복약 시작일이 언제인가요?</Text>
            <TouchableOpacity onPress={nextStage} style={detailInputStyle.testButton}>
              <Text>다음</Text>
            </TouchableOpacity>
          </View>

          <View style={[detailInputStyle.container, { width: outerScrollViewWidth }]}>
            <View style={detailInputStyle.backStageButtonWrap}>
              {StageIndicator(5, 4)}
              <TouchableOpacity style={detailInputStyle.backStageButton} onPressIn={previousStage}>
                <Icon name="arrow-left" size={24} color="#454545" />
              </TouchableOpacity>
            </View>
            <IconMaterialCommunityIcons
              name="pill"
              size={32}
              color={generalValues.highlightColor}
              style={detailInputStyle.stageIcon}
            />
            <Text style={detailInputStyle.stageTitle}>복약 종료일이 언제인가요?</Text>
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default DetailInputScreen;
