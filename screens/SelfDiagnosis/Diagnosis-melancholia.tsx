// 우울증 자가진단

import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

import DiagnosisHeader from "./components/DiagnosisHeader";
import { useDiagnosisScore } from "./hooks/useDiagnosisScore";

import { selfDiagnosisStyles } from "../styles/selfDiagnosis";
import CheckBoxContainer from "./components/CheckBoxContainer";

const MAX_CONTENT_COUNT = 9; // TODO: 문항 갯수 변동되면 꼭 바꿀것!!!!

const DiagnosisMelancholia = () => {
  const { handleScore, handleSubmit, totalScore, isCompleted } = useDiagnosisScore({
    maxContentCount: MAX_CONTENT_COUNT,
    threshold: 8,
    successMessage: "축하드립니다. 우울증 위험도가 낮습니다.",
    warningMessage: "우울증 위험도가 높습니다.\n상담센터를 방문해주세요.",
  });

  return (
    <>
      <DiagnosisHeader />
      <ScrollView style={selfDiagnosisStyles.pageScrollView}>
        <View style={selfDiagnosisStyles.pageTitleContainer}>
          <Text style={selfDiagnosisStyles.pageTitle}>우울증 자가진단</Text>
          <Text style={selfDiagnosisStyles.pageSubTitle}>모든 문항에 솔직하게 답변하셔야 정확한 결과를 얻을 수 있습니다.</Text>
        </View>
        {[
          "1. 일 또는 여가 활동을 하는데 흥미나 즐거움을 느끼지 못함",
          "2. 기분이 가라앉거나.우울하거나.희망이 없음",
          "3. 잠이 들거나 계속 잠을 자는 것이 어려움. 또는 잠을 너무 많이 잠",
          "4. 피곤하다고 느끼거나 기운이 거의 없음",
          "5. 입맛이 없거나 과식을 함",
          "6. 자신을 부정적으로 봄 – 혹은 자신이 실패자라고 느끼거나 자신 또는 가족을 실망시킴",
          "7. 신문을 읽거나 텔레비전 보는 것과 같은 일에 집중하는 것이 어려움",
          "8. 다른 사람들이 주목할 정도로 너무 느리게 움직이거나 말을 함 또는 반대로 평상시보다 많이 움직여서, 너무 안절부절 못하거나 들떠 있음",
          "9. 자신이 죽는 것이 더 낫다고 생각하거나 어떤 식으로든 자신을 해칠것이라고 생각함",
        ].map((content, index) => (
          <CheckBoxContainer key={index} content={content} index={index} handleScore={handleScore} />
        ))}
        <TouchableOpacity
          style={selfDiagnosisStyles.submitBtn}
          onPress={() => {
            handleSubmit();
          }}
        >
          <Text style={selfDiagnosisStyles.submitBtnText}>결과보기</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default DiagnosisMelancholia;
