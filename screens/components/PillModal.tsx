import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, Image, Pressable, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Feather";

import {storeData, retrieveData, removeData} from "../components/Bookmark";

import { pillSearchStyle } from "../styles/pillSearchStyle";
import { generalStyles } from "../styles/generalStyle";
import { generalValues } from "../styles/generalValues";
import { pillModalStyle } from "../styles/pillModalStyle";
import { ScrollView } from "react-native-gesture-handler";

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;


interface pillSearchInterface { // api 다른 거 사용하면서 좀 수정했음
    resultCode: number; // 결과 코드
    resultMsg: string; // 결과 메시지
    numOfRows: number; // 한 페이지 결과 수
    pageNo: number; // 페이지 번호
    totalCount: number; // 전체 결과 수
    entpName: string; // 업체명
    itemName: string; // 제품명
    itemSeq: number; // 품목기준코드
    efcyQesitm: string; // 문항1(효능)
    useMethodQesitm: string; // 문항2(사용법)
    atpnWarnQesitm: string; // 문항3(주의사항 경고)
    atpnQesitm: string; // 문항4(주의사항)
    intrcQesitm: string; // 문항5(상호작용)
    seQesitm: string; // 문항6(부작용)
    depositMethodQesitm: string; // 문항7(보관법)
    openDe: number; // 공개일자
    updateDe: number; // 수정일자
    itemImage: string; // 낱알이미지
}

const PillModal = ({ showModal, setShowModal, pillItem }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);

    const pressBookmarkButton = async() => {
        loadData();
        setIsBookmarked(!isBookmarked);
        !isBookmarked ? storeData(pillItem) : removeData(pillItem);
        console.log("버튼 눌림");
    };

    const loadData = async() => {
        const value = await retrieveData(pillItem);
        if (value !== null) {
            setIsBookmarked(true);
            console.log(value);
            console.log("저장소에 존재");
        } else {
            setIsBookmarked(false);
            console.log("저장소에 없음");
        }
    };

    useEffect(() => {
        loadData();
    });


    return (
        <>
            {showModal ? (
                <View>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={showModal}
                        onRequestClose={() => {
                            setShowModal(!showModal)
                        }}>
                        <View style={[pillModalStyle.background, { width: screenWidth, height: screenHeight }]}>
                        </View>
                    </Modal>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={showModal}
                        onRequestClose={() => {
                            setShowModal(!showModal);
                        }}>
                        <ScrollView contentContainerStyle={pillModalStyle.modal}> 
                            <View style={pillModalStyle.buttonContainer}>
                                <TouchableOpacity style={pillModalStyle.bookmarkButton} onPress={pressBookmarkButton}>
                                    {isBookmarked ? 
                                        (<Icon name="bookmark" size={30} color="#DE3C3C" />) : 
                                        (<Icon name="bookmark" size={30} color={generalValues.highlightColor} />) }
                                </TouchableOpacity>
                                <TouchableOpacity style={pillModalStyle.closeButton} onPress={() => setShowModal(!showModal)}>
                                    <Icon name="x" size={30} color={generalValues.highlightColor} />
                                </TouchableOpacity>
                            </View>
                            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                <Image
                                source={{ uri: pillItem.itemImage != null ? pillItem.itemImage : "" }}
                                style={[pillModalStyle.itemImage, { width: 240, height: 130 }]}
                                />
                            </View>
                            <View style={pillModalStyle.itemContainer}>
                                <Text style={pillModalStyle.itemName}>{pillItem.itemName}</Text>
                                <Text>{pillItem.entpName}</Text>
                                <Text>{pillItem.efcyQesitm}</Text>
                                <Text>{pillItem.useMethodQesitm}</Text>
                                <Text>{pillItem.atpnWarnQesitm}</Text>
                                <Text>{pillItem.atpnQesitm}</Text>
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
