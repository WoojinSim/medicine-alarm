// 고혈압 및 심혈관계 질환 자가진단

import React from "react";
import { View, Text } from "react-native";

import DiagnosisHeader from "./components/DiagnosisHeader";

import { selfDiagnosisStyles } from "../styles/selfDiagnosis";

const MAX_CONTENT_COUNT = 9; // TODO: 문항 갯수 변동되면 꼭 바꿀것!!!!

const DiagnosisHypertension = () => {
  return (
    <>
      <DiagnosisHeader />
      <View style={selfDiagnosisStyles.wipContainer}>
        <Text style={selfDiagnosisStyles.wipText}>개발중인 항목입니다.</Text>
      </View>
    </>
  );
};

export default DiagnosisHypertension;
