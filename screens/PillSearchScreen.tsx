import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Vibration,
  Animated,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Feather";
import PillIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { pillSearchStyle } from "./styles/pillSearchStyle";
import { generalStyles } from "./styles/generalStyle";
import { generalValues } from "./styles/generalValues";

import HeaderWithBack from "./components/HeaderWithBack";

interface pillSearchInterface {
  ITEM_SEQ: string;
  ITEM_NAME: string;
  ENTP_SEQ: string;
  ENTP_NAME: string;
  CHART: string;
  ITEM_IMAGE: string | null;
  PRINT_FRONT: string | null;
  PRINT_BACK: string | null;
  DRUG_SHAPE: string;
  COLOR_CLASS1: string;
  COLOR_CLASS2: string;
  LINE_FRONT: string | null;
  LINE_BACK: string | null;
  LENG_LONG: string;
  LENG_SHORT: string;
  THICK: string;
  IMG_REGIST_TS: string;
  CLASS_NO: string;
  CLASS_NAME: string;
  ETC_OTC_NAME: string;
  ITEM_PERMIT_DATE: string;
  FORM_CODE_NAME: string;
  MARK_CODE_FRONT_ANAL: string;
  MARK_CODE_BACK_ANAL: string;
  MARK_CODE_FRONT_IMG: string;
  MARK_CODE_BACK_IMG: string;
  ITEM_ENG_NAME: string | null;
  CHANGE_DATE: string;
  MARK_CODE_FRONT: string | null;
  MARK_CODE_BACK: string | null;
  EDI_CODE: string | null;
  BIZRNO: string;
  // 다른 필드가 있다면 여기에 추가합니다.
}

const PillSearchScreen = ({ navigation }: any) => {
  const [query, setQuery] = useState("");
  const [alert, setAlert] = useState("");
  const [alertColor, setAlertColor] = useState("red");
  const [isLoading, setIsLoading] = useState<boolean | undefined>();
  const [searchData, setSearchData] = useState<pillSearchInterface[]>([]);

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

  // 약품 검색
  const fetchData = async (searchText: string) => {
    const apiUrl = "http://apis.data.go.kr/1471000/MdcinGrnIdntfcInfoService01/getMdcinGrnIdntfcInfoList01";
    let queryParams = "?" + encodeURIComponent("serviceKey") + "=" + API_URL; // API키
    queryParams += "&" + encodeURIComponent("item_name") + "=" + encodeURIComponent(searchText); /**/
    queryParams += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /**/
    queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("200"); /**/
    queryParams += "&" + encodeURIComponent("type") + "=" + encodeURIComponent("json"); /**/

    setIsLoading(true);
    try {
      const response = await axios.get(`${apiUrl}${queryParams}`);
      setSearchData(response.data.body.items != null ? response.data.body.items : []);
      setAlertColor("black");
      setAlert(`총 ${response.data.body.totalCount != null ? response.data.body.totalCount : 0}개 검색됨`);
    } catch (error) {
      setSearchData([]);
      setAlertColor("red");
      setAlert(`문제가 발생했습니다.`);
    } finally {
      setIsLoading(false);
    }
  };

  const searchPills = () => {
    const regex: RegExp = /^[a-zA-Z가-힣0-9\s`~!@#$%^&*()\-_=+\\|\[\]{};:'",<.>/?]{2,20}$/;
    Vibration.vibrate(20);

    if (query.length < 2) {
      setAlertColor("red");
      setAlert("검색어는 2글자 이상이어야 합니다.");
      errorAnimation();
      return;
    }
    if (!regex.test(query)) {
      setAlertColor("red");
      setAlert("올바르지 않은 약 이름입니다.");
      errorAnimation();
      return;
    }
    console.log(`${query}`);
    setAlert("");
    fetchData(query);
  };

  return (
    <View style={generalStyles.wrap}>
      <StatusBar backgroundColor={generalValues.containerColor} barStyle="dark-content" animated={true} />
      <HeaderWithBack title="약 검색" />

      <Animated.View
        style={[
          pillSearchStyle.searchBoxWrap,
          { transform: [{ translateX: shakeTranslate }], borderColor: interpolatedBorderColor },
        ]}
      >
        <TextInput
          placeholder="약 이름을 입력해주세요."
          style={pillSearchStyle.searchBox}
          selectionColor={generalValues.highlightColor}
          onChangeText={setQuery}
          onSubmitEditing={searchPills}
        ></TextInput>
        <TouchableOpacity style={pillSearchStyle.searchButton} onPress={searchPills}>
          <Icon name="search" size={30} color={generalValues.highlightColor} />
        </TouchableOpacity>
      </Animated.View>

      <View style={pillSearchStyle.alertContainer}>
        <Text style={[pillSearchStyle.alertLabel, { color: alertColor }]}>{alert}</Text>
      </View>

      {(isLoading === undefined || null) && (
        <View style={pillSearchStyle.notSearchedContainer}>
          <PillIcon name="pill" size={100} color="black" style={pillSearchStyle.notSearchedIcon} />
        </View>
      )}

      {isLoading === true && (
        <View style={pillSearchStyle.notSearchedContainer}>
          <ActivityIndicator color={generalValues.highlightColor} size="large" style={{ marginBottom: 140 }}></ActivityIndicator>
        </View>
      )}

      {isLoading === false && (
        <ScrollView showsVerticalScrollIndicator={false} style={pillSearchStyle.resultScrollContainer}>
          {searchData.map((element, idx) => (
            <TouchableOpacity style={pillSearchStyle.resultItemContainer} key={element.ITEM_SEQ}>
              <Image
                source={{ uri: element.ITEM_IMAGE != null ? element.ITEM_IMAGE : "" }}
                style={[pillSearchStyle.resultImage, { width: 120, height: 65 }]}
              />
              <View style={pillSearchStyle.resultLabelWrap}>
                <Text style={pillSearchStyle.resultItemTitle}>{element.ITEM_NAME}</Text>
                <Text style={pillSearchStyle.resultItemLore}>{element.CLASS_NAME}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default PillSearchScreen;
