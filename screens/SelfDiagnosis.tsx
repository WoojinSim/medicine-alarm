import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

import Header from "./components/Header";

import { generalStyles } from "./styles/generalStyle";
import { selfDiagnosisStyles } from "./styles/selfDiagnosis";

type diagnosisItemType = "dementia" | "melancholia" | "hypertension" | "diabetes" | "osteoporosis";

const SelfDiagnosis = ({ navigation }: any) => {
  const goToDiagnosisPage = (itemName: diagnosisItemType) => {
    switch (itemName) {
      case "dementia":
        navigation.navigate("DiagnosisDementia"); // 치매
        break;
      case "melancholia":
        navigation.navigate("DiagnosisMelancholia"); // 우울증
        break;
      case "hypertension":
        navigation.navigate("DiagnosisHypertension");
        break;
      case "diabetes":
        navigation.navigate("DiagnosisDiabetes"); // 당뇨병
        break;
      case "osteoporosis":
        navigation.navigate("DiagnosisOsteoporosis"); // 골다공증
        break;
    }
  };

  return (
    <View style={generalStyles.wrap}>
      <Header title="자가진단" />
      <ScrollView showsVerticalScrollIndicator={false} style={generalStyles.scrollViewWrap}>
        <TouchableOpacity style={selfDiagnosisStyles.itemBtn} onPress={() => goToDiagnosisPage("dementia")}>
          <Text style={selfDiagnosisStyles.itemTitle}>치매</Text>
          <Text style={selfDiagnosisStyles.itemSubTitle}>치매 자가진단</Text>
        </TouchableOpacity>
        <TouchableOpacity style={selfDiagnosisStyles.itemBtn} onPress={() => goToDiagnosisPage("melancholia")}>
          <Text style={selfDiagnosisStyles.itemTitle}>우울증</Text>
          <Text style={selfDiagnosisStyles.itemSubTitle}>우을증 자가진단</Text>
        </TouchableOpacity>
        <TouchableOpacity style={selfDiagnosisStyles.itemBtn} onPress={() => goToDiagnosisPage("hypertension")}>
          <Text style={selfDiagnosisStyles.itemTitle}>고혈압 및 심혈관계 질환</Text>
          <Text style={selfDiagnosisStyles.itemSubTitle}>고혈압 및 심혈관계 질환 증상, 원인, 주의사항</Text>
        </TouchableOpacity>
        <TouchableOpacity style={selfDiagnosisStyles.itemBtn} onPress={() => goToDiagnosisPage("diabetes")}>
          <Text style={selfDiagnosisStyles.itemTitle}>당뇨병</Text>
          <Text style={selfDiagnosisStyles.itemSubTitle}>당뇨병 증상, 원인, 주의사항</Text>
        </TouchableOpacity>
        <TouchableOpacity style={selfDiagnosisStyles.itemBtn} onPress={() => goToDiagnosisPage("osteoporosis")}>
          <Text style={selfDiagnosisStyles.itemTitle}>골다공증</Text>
          <Text style={selfDiagnosisStyles.itemSubTitle}>골다공증 증상, 원인, 주의사항</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SelfDiagnosis;
