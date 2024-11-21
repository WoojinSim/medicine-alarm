// 당뇨병 자가진단

import React from "react";
import { View, Text, ScrollView } from "react-native";

import DiagnosisHeader from "./components/DiagnosisHeader";
import { selfDiagnosisStyles } from "../styles/selfDiagnosis";

const DiagnosisDiabetes = () => {
  return (
    <>
      <DiagnosisHeader />
      <ScrollView style={selfDiagnosisStyles.pageTitleContainer}>
        <Text style={selfDiagnosisStyles.pageTitle}>치매 자가진단</Text>
        <Text>자가진단을 통해 치매 위험도를 확인해보세요.</Text>
      </ScrollView>
    </>
  );
};

export default DiagnosisDiabetes;
