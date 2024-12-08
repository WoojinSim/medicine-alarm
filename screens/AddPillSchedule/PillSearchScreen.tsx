import React, { useState, useEffect } from "react";
import { Platform, View, Text, StatusBar, TouchableOpacity, TextInput, Vibration, Animated, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import Icon from "react-native-vector-icons/Feather";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";

import { pillSearchStyle } from "../styles/pillSearchStyle";
import { generalStyles } from "../styles/generalStyle";
import { generalValues } from "../styles/generalValues";

import HeaderWithBack from "../components/HeaderWithBack";
import PillListDisplay from "../components/PillListDisplay";
import PillModal from "../components/PillModal";
import { FlatList } from "react-native-gesture-handler";
import * as FileSystem from 'expo-file-system';

import { getPillDataRequestInterface, getPillDataResponseInterface, pillSearchInterface } from "../../interfaces";
import Alarm from "../components/Alarm";
import ImageModal from "../components/ImageModal";
import CameraScreen from "../components/CameraScreen";

/**
 * API 응답 인터페이스
 */
export interface DrugApiResponse {
  header: {
    /** 결과 코드 */
    resultCode: string;
    /** 결과 메시지 */
    resultMsg: string;
  };
  body: {
    /** 페이지 번호 */
    pageNo: number;
    /** 전체 항목 수 */
    totalCount: number;
    /** 페이지당 항목 수 */
    numOfRows: number;
    /** 약품 항목 목록 */
    items: pillSearchInterface[];
  };
}
const PillSearchScreen = ({ navigation }: any) => {
  const route = useRoute(); // 라우트 선언
  const { isSetAlarm = false } = (route.params as { isSetAlarm: boolean }) || {};

  const [query, setQuery] = useState("");
  const [pillShape, setPillShape] = useState("");
  const [searchImage, setSearchImage] = useState<string | undefined>();
  const [alert, setAlert] = useState("");
  const [alertColor, setAlertColor] = useState("red");
  const [showFavList, setShowFavList] = useState(false);

  const [imageResult, setImageResult] = useState<getPillDataResponseInterface>();

  const [showAutoCompleteContainer, setShowAutoCompleteContainer] = useState(false);
  const [autoCompleteData, setAutoCompleteData] = useState<string[]>([]);
  const [searchBoxContainerWidth, setSearchBoxContainerWidth] = useState(0); // TODO: 개선방향 찾기

  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState<pillSearchInterface[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [showShapeList, setShowShapeList] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [selectedData, setSelectedData] = useState<pillSearchInterface>();

  const API_URL = "g7%2F%2B92eBrbF07oJ0SFsyzLTY%2BxGOvqJeeE8VUkQWvHJUi9nUxSm82jdtJLwIkuC91lVvkHvVbdCxlKFhmrp1Yg%3D%3D";

  useEffect(() => {
    console.log(`🔵 PillSearchScreen.tsx\t\t컴포넌트 로드됨. params:isSetAlarm - ${isSetAlarm}`);
  }, []);

  useEffect(() => {
    console.log(`🔵 PillSearchScreen.tsx\t\tshowFavList 토글 ${showFavList}`);
  }, [showFavList]);

  // 간단하게 자동완성 검색어가 존재하면 자동완성 출력 컨테이너 출력 State 토글
  useEffect(() => {
    if (autoCompleteData.length > 0) {
      setShowAutoCompleteContainer(true);
    } else {
      setShowAutoCompleteContainer(false);
    }
  }, [autoCompleteData]);

  useEffect(() => {
    if (searchImage != null) {
      fetchDataForImage(searchImage, pillShape);
      // console.log("imageResult : " + imageResult);
      // setSelectedData(imageResult.pillData);
      // setShowModal(!showModal);
    }
  }, [searchImage]);

  /**
   * 검색어 자동완성만을 위한 fetchData 함수
   * autoCompleteData State 업데이트 함
   */
  const fetchDataForAutoComplete = async (searchText: string) => {
    // API로 검색 내용 가져오기
    const apiUrl = "http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList";
    let queryParams = "?" + encodeURIComponent("serviceKey") + "=" + API_URL; // API키
    queryParams += "&" + encodeURIComponent("itemName") + "=" + encodeURIComponent(searchText); /**/
    queryParams += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /**/
    queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("50"); /**/
    queryParams += "&" + encodeURIComponent("type") + "=" + encodeURIComponent("json"); /**/

    try {
      const responseRaw = await axios.get(`${apiUrl}${queryParams}`);
      const responseDate: DrugApiResponse = responseRaw.data;
      const itemNames: string[] = responseDate.body.items.map((item) => item.itemName);
      console.log(`🔵 PillSearchScreen.tsx\t\t${itemNames}`);
      setAutoCompleteData(itemNames);
    } catch (e) {
      setAutoCompleteData([]);
    }
  };

  /**
   * 검색어 검색 결과만을 위한 fetchData 함수
   * searchData State 업데이트 함
   */
  const fetchDataForSearch = async (searchText: string) => {
    // API로 검색 내용 가져오기
    const apiUrl = "http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList";
    let queryParams = "?" + encodeURIComponent("serviceKey") + "=" + API_URL; // API키
    queryParams += "&" + encodeURIComponent("itemName") + "=" + encodeURIComponent(searchText); /**/
    queryParams += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /**/
    queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("50"); /**/
    queryParams += "&" + encodeURIComponent("type") + "=" + encodeURIComponent("json"); /**/

    try {
      const responseRaw = await axios.get(`${apiUrl}${queryParams}`);
      const responseDate: DrugApiResponse = responseRaw.data;
      setSearchData(responseDate.body.items);
    } finally {
      setIsLoading(false);
    }
  };

  // 서버와 통신해서 이미지 검색 결과를 가져오는 함수
  const fetchDataForImage = async (imgURI: string, shape: string) => {
    const formData = new FormData();

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const name = hours + minutes + seconds + "jpg";

    console.log("uri : " + imgURI.toString());
    console.log("pillShape: " + shape);
    formData.append('image', {
      uri: imgURI,
      type: 'image/jpeg',
      name: name,
    });
    formData.append('pillShape', shape);

    try {
      const response = await axios.post("http://13.125.155.126:8080/pill/search/image", formData, {
        headers: {
          'Content-Type' : 'multipart/form-data',
        },
      });
      const responseData = (await response).data;
      if (responseData){
        console.log("responseData : " + JSON.stringify(responseData.pillData));
        setImageResult(responseData);
        setSelectedData(responseData.pillData);
        setShowModal(!showModal);
      }
      
    } catch (error) {
      console.error("서버에서 이미지 데이터를 요청하는 데 실패했습니다.", error);
    }
  };

  /**
   * 검색 Enter 땅! 검색어로 검색 시행 함수
   * @returns null
   */
  const searchPills = () => {
    const regex: RegExp = /^[a-zA-Z가-힣0-9\s():<.>]{2,40}$/;
    Vibration.vibrate(20);
    setAlertColor("red");

    if (query.length < 2) {
      setAlert("검색어는 2글자 이상이어야 합니다.");
      errorAnimation();
      return;
    }
    if (!regex.test(query)) {
      setAlert("올바르지 않은 약 이름입니다.");
      errorAnimation();
      return;
    }
    setIsLoading(true);
    console.log(`🔵 PillSearchScreen.tsx\t\t'${query}' 검색됨.`);
    setShowAutoCompleteContainer(false);
    fetchDataForSearch(query);
  };

  /**
   * 검색결과 랜더링 함수 (대충 검색 아이템 컨테이너)
   * @param param0
   * @returns
   */
  const renderSearchItem = ({ item }: { item: pillSearchInterface }) => (
    <TouchableOpacity
      style={pillSearchStyle.resultItemContainer}
      key={item.itemSeq}
      onPress={() => {
        setSelectedData(item);
        setShowModal(!showModal);
      }}
    >
      <Image
        source={item.itemImage ? { uri: item.itemImage } : require("../../assets/not_supported.png")}
        style={[pillSearchStyle.resultImage, { width: 120, height: 65 }]}
      />
      <View style={pillSearchStyle.resultLabelWrap}>
        <Text style={pillSearchStyle.resultItemTitle}>{item.itemName}</Text>
        <Text style={pillSearchStyle.resultItemLore}>{item.entpName}</Text>
      </View>
    </TouchableOpacity>
  );

  /**
   * 자동완성 랜더링 함수
   * @param param0
   * @returns
   */
  const renderAutoSearchItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      onPress={() => {
        setQuery(item);
        setAutoCompleteData([]);
        setShowAutoCompleteContainer(false);
        searchPills();
      }}
    >
      <View style={pillSearchStyle.autoCompleteData}>
        <Text>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  const backButton = () => {
    Vibration.vibrate(20);
    navigation.goBack();
  };

  const pressAlarmButton = () => {
    // DetailInputScreen으로 넘어가는 내용
    Vibration.vibrate(20);
    navigation.navigate("DetailInputScreen", { selectedData });
  };

  // 잘 못 입력했거나 올바르지 오류상황시 애니메이션
  const [shakeTranslate] = useState(new Animated.Value(0));
  const [shakeBorderColor] = useState(new Animated.Value(0));
  const interpolatedBorderColor = shakeBorderColor.interpolate({
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
        Animated.timing(shakeBorderColor, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(shakeBorderColor, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]),
    ]).start();
  };

  //return <Alarm />;
  return (
    <View style={generalStyles.wrap}>
      <StatusBar backgroundColor={generalValues.containerColor} barStyle="dark-content" animated={true} />
      <View style={generalStyles.tabTitleWithBackContainer}>
        <View style={pillSearchStyle.headerTextWrap}>
          <Text style={[generalStyles.tabTitleWithBackLabel, { marginRight: 8 }]}>약 검색</Text>
          <TouchableOpacity
            onPress={() => {
              setShowFavList(!showFavList);
            }}
          >
            {showFavList ? (
              <IconFontAwesome name="bookmark" size={28} color="#DE3C3C" />
            ) : (
              <IconFontAwesome name="bookmark-o" size={28} color="#DE3C3C" />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={generalStyles.tabTitleWithBackButton} onPress={backButton}>
          <Icon name="arrow-left" size={32} color="#454545" />
        </TouchableOpacity>
      </View>
      {!showFavList ? (
        <>
          <Animated.View
            style={[
              pillSearchStyle.searchBoxWrap,
              { transform: [{ translateX: shakeTranslate }], borderColor: interpolatedBorderColor },
              showAutoCompleteContainer
                ? {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  borderLeftWidth: 2,
                  borderRightWidth: 2,
                  borderTopWidth: 2,
                  borderBottomWidth: 0,
                }
                : null,
            ]}
            onLayout={(event) => {
              const { width } = event.nativeEvent.layout;
              setSearchBoxContainerWidth(width);
            }}
          >
            <TouchableOpacity onPress={async () => {
              setShowShapeList(!showShapeList);
            }}>
              <Icon name="camera" size={28} color={generalValues.highlightColor} style={{ marginLeft: 15 }} />
            </TouchableOpacity>
            <TextInput
              placeholder="약 이름을 입력해주세요."
              style={pillSearchStyle.searchBox}
              selectionColor={generalValues.highlightColor}
              onChange={(event) => {
                if (event.nativeEvent.text.length > 0) {
                  fetchDataForAutoComplete(event.nativeEvent.text);
                } else {
                  setShowAutoCompleteContainer(false);
                }
              }}
              onChangeText={setQuery}
              onSubmitEditing={searchPills}
              value={query}
            ></TextInput>
            <TouchableOpacity style={pillSearchStyle.searchButton} onPress={searchPills}>
              <Icon name="search" size={30} color={generalValues.highlightColor} />
            </TouchableOpacity>
            {showAutoCompleteContainer && (
              <View style={[pillSearchStyle.showAutoCompleteContainer, { width: searchBoxContainerWidth }]}>
                <FlatList
                  data={autoCompleteData}
                  renderItem={renderAutoSearchItem}
                  keyExtractor={(_, index) => index.toString()}
                  extraData={showAutoCompleteContainer}
                />
              </View>
            )}
          </Animated.View>

          <View style={pillSearchStyle.alertContainer}>
            <Text style={[pillSearchStyle.alertLabel, { color: alertColor }]}>{alert}</Text>
          </View>
          <FlatList
            style={pillSearchStyle.resultScrollContainer}
            data={searchData}
            renderItem={renderSearchItem}
            keyExtractor={(item) => String(item.itemSeq)}
          />
        </>
      ) : (
        <PillListDisplay setSelectedData={setSelectedData} setShowModal={setShowModal} />
      )}
      {showModal && selectedData ? (
        <PillModal
          showModal={showModal}
          setShowModal={setShowModal}
          pillItem={selectedData}
          selectBtn={pressAlarmButton}
          isSetAlarm={isSetAlarm}
        />
      ) : null}
      {showShapeList ? (
        <ImageModal
          showModal={showShapeList}
          setShowModal={setShowShapeList}
          setPillShape={setPillShape}
          setShowCamera={setShowCamera}
        />
      ) : null}
      {showCamera ? (
        <CameraScreen
          setImage={setSearchImage}
          showCamera={showCamera}
          setShowCamera={setShowCamera}
        />
      ) : null}
    </View>
  );
};

export default PillSearchScreen;
