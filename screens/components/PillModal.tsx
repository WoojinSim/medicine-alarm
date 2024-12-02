import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, View, Text, TouchableOpacity, Image, Dimensions, Vibration } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { storeData, retrieveData, removeData } from "../components/Bookmark";

import { generalValues } from "../styles/generalValues";
import { pillModalStyle } from "../styles/pillModalStyle";
import { ScrollView } from "react-native-gesture-handler";
import { pillSearchInterface, getPillDataResponseInterface } from "../../interfaces";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

interface ChildProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  pillItem: pillSearchInterface;
  selectBtn: any;
  isSetAlarm: boolean;
}

const PillModal: React.FC<ChildProps> = ({ showModal, setShowModal, pillItem, selectBtn, isSetAlarm }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imgWidth, setImgWidth] = useState(240);
  const [imgHeight, setImgHeight] = useState(140);
  const [responseData, setResponseData] = useState<getPillDataResponseInterface>();

  // 북마크 버튼 누를 시 데이터 저장 or 삭제
  const pressBookmarkButton = async () => {
    !isBookmarked ? await storeData(pillItem) : await removeData(pillItem);
    setIsBookmarked(!isBookmarked);
  };

  // + 버튼 누를 시 이미지 크기 확대
  const pressPlusButton = async () => {
    if (imgWidth < 375 && imgHeight < 260) {
      setImgWidth(imgWidth + 48);
      setImgHeight(imgHeight + 28);
    }
  };

  // - 버튼 누를 시 이미지 크기 축소
  const pressMinusButton = async () => {
    if (imgWidth > 120 && imgHeight > 70) {
      setImgWidth(imgWidth - 48);
      setImgHeight(imgHeight - 28);
    }
  };

  // 저장소에 존재하는 데이터 확인
  const loadData = async () => {
    const exists = await retrieveData(pillItem);
    if (exists !== false) {
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }
  };

  // 기본 데이터 로드 (북마크 정보 로드)
  useEffect(() => {
    loadData();
  }, []);

  // GPT 태그 데이터 가져오기
  useEffect(() => {
    console.log(pillItem.itemSeq);
    const fetchPillData = async () => {
      try {
        const response = await axios.get(`http://13.125.155.126:8080/pill/search/seq`, {
          params: {
            itemSeq: `${pillItem.itemSeq}`,
          },
        });
        const responseData = response.data;
        if (responseData) {
          console.log(responseData);
          setResponseData(responseData);
        }
      } catch (error) {
        console.error("알약 데이터를 가져오는데 실패했습니다", error);
      }
    };
    fetchPillData();
  }, []);

  return (
    <>
      {showModal ? (
        <View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
              setShowModal(!showModal);
            }}
          >
            <View style={[pillModalStyle.background, { width: screenWidth, height: screenHeight }]}></View>
          </Modal>
          <Modal
            animationType="fade"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
              setShowModal(!showModal);
            }}
          >
            <ScrollView contentContainerStyle={pillModalStyle.modal}>
              <View style={pillModalStyle.buttonContainer}>
                <TouchableOpacity style={pillModalStyle.bookmarkButton} onPress={pressBookmarkButton}>
                  {isBookmarked ? (
                    <Icon name="bookmark" size={30} color="#DE3C3C" />
                  ) : (
                    <Icon name="bookmark" size={30} color={generalValues.highlightColor} />
                  )}
                </TouchableOpacity>
                {isSetAlarm ? (
                  <TouchableOpacity style={pillModalStyle.closeButton} onPress={selectBtn}>
                    <Icon name="bell" size={30} color={generalValues.highlightColor} />
                  </TouchableOpacity>
                ) : (
                  <></>
                )}

                <TouchableOpacity style={pillModalStyle.closeButton} onPress={() => setShowModal(!showModal)}>
                  <Icon name="x" size={30} color={generalValues.highlightColor} />
                </TouchableOpacity>
              </View>
              <View style={[pillModalStyle.buttonContainer, { alignItems: "center", justifyContent: "center" }]}>
                <TouchableOpacity onPress={pressPlusButton}>
                  <Icon name="plus-square" size={30} />
                </TouchableOpacity>
                <TouchableOpacity onPress={pressMinusButton}>
                  <Icon name="minus-square" size={30} />
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={pillItem.itemImage ? { uri: pillItem.itemImage } : require("../../assets/not_supported.png")}
                  style={[pillModalStyle.itemImage, { width: imgWidth, height: imgHeight }]}
                />
              </View>
              <View style={pillModalStyle.itemContainer}>
                <Text style={pillModalStyle.itemName} numberOfLines={1}>
                  {pillItem.itemName}
                </Text>
                <Text style={pillModalStyle.itemEntpName}>{pillItem.entpName}</Text>
                <View style={pillModalStyle.itemGptTagContainer}>
                  {responseData?.gptPositiveTag
                    .split(" ")
                    .slice(0, 4)
                    .map((elem, index) => (
                      <Text
                        key={index}
                        style={[pillModalStyle.itemGptTagLabel, { backgroundColor: generalValues.highlightColor }]}
                      >
                        {elem}
                      </Text>
                    ))}
                </View>
                <View style={[pillModalStyle.itemGptTagContainer, { marginBottom: 25 }]}>
                  {responseData?.gptNegativeTag
                    .split(" ")
                    .slice(0, 4)
                    .map((elem, index) => (
                      <Text
                        key={index}
                        style={[pillModalStyle.itemGptTagLabel, { backgroundColor: "#e44235", color: "white" }]}
                      >
                        {elem}
                      </Text>
                    ))}
                </View>
                <Text style={pillModalStyle.itemLoreTitle}>세부 효능</Text>
                <Text>{pillItem.efcyQesitm}</Text>
                <Text style={pillModalStyle.itemLoreTitle}>복용 방법</Text>
                <Text>{pillItem.useMethodQesitm}</Text>
                <Text style={pillModalStyle.itemLoreTitle}>주의사항</Text>
                <Text>{pillItem.atpnWarnQesitm}</Text>

                <Text>{pillItem.atpnQesitm}</Text>
                <Text style={pillModalStyle.itemLoreTitle}>상호작용</Text>
                <Text>{pillItem.intrcQesitm}</Text>
                <Text>{pillItem.seQesitm}</Text>
                <Text>{pillItem.depositMethodQesitm}</Text>
              </View>
            </ScrollView>
          </Modal>
        </View>
      ) : null}
    </>
  );
};

export default PillModal;
