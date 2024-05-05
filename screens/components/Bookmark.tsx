import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const storeData = async (pillItem: pillSearchInterface) => {
    try {
        await AsyncStorage.setItem(pillItem.itemSeq.toString(), pillItem.itemName);
        console.log("Bookmark Stored");
    } catch (error) {
        console.log(error);
    }
};

const retrieveData = async (pillItem: pillSearchInterface) => {
    try {
        const value = await AsyncStorage.getItem(pillItem.itemSeq.toString());
        return value;
    } catch (error) {
        console.log(error);
    }
};

const removeData = async (pillItem: pillSearchInterface) => {
    try {
        const result = await AsyncStorage.removeItem(pillItem.itemSeq.toString());
        console.log("Bookmark Removed");
    } catch (error) {
        console.log(error);
    }
};

export {storeData};
export {retrieveData};
export {removeData};