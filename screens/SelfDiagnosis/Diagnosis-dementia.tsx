// 치매 자가진단

import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

import DiagnosisHeader from "./components/DiagnosisHeader";
import { useDiagnosisScore } from "./hooks/useDiagnosisScore";

import { selfDiagnosisStyles } from "../styles/selfDiagnosis";
import CheckBoxContainer from "./components/CheckBoxContainer";

const MAX_CONTENT_COUNT = 15; // TODO: 문항 갯수 변동되면 꼭 바꿀것!!!!

const DiagnosisDementia = () => {
  const { handleScore, handleSubmit, totalScore, isCompleted } = useDiagnosisScore({
    maxContentCount: MAX_CONTENT_COUNT,
    threshold: 8,
    successMessage: "축하드립니다. 치매 위험도가 낮습니다.",
    warningMessage: "치매 위험도가 높습니다.\n치매센터를 방문해주세요.",
  });

  return (
    <>
      <DiagnosisHeader />
      <ScrollView style={selfDiagnosisStyles.pageScrollView}>
        <View style={selfDiagnosisStyles.pageTitleContainer}>
          <Text style={selfDiagnosisStyles.pageTitle}>치매 자가진단</Text>
          <Text style={selfDiagnosisStyles.pageSubTitle}>
            치매는 자가진단 보다는 환자의 상태를 잘 아는 보호자가 체크하는 것을 권장합니다.
          </Text>
        </View>
        {[
          "1. 언제 어떤 일이 일어났는지 기억하지 못한다.",
          "2. 며칠 전에 들었던 이야기를 잊는다.",
          "3. 반복되는 일상생활에 변화가 생겼을 때 금방 적응하기가 힘들다.",
          "4. 본인에게 중요한 사항을 잊는다. (배우자 생일, 결혼기념일, 제삿날 등)",
          "5. 어떤 일을 해놓고 잊어버려 다시 반복 한다.",
          "6. 약속을 해놓고 잊는다.",
          "7. 이야기 도중 방금 자기가 무슨 이야기를 하고 있었는지를 잊는다.",
          "8. 하고 싶은 말이나 표현이 금방 떠오르지 않는다.",
          "9. 물건 이름이 금방 생각나지 않는다.",
          "10. 텔레비전을 보고 그 내용을 이해하기가 힘들다.",
          "11. 전에 가본 장소를 기억하지 못한다.",
          "12. 길을 잃거나 헤맨 적이 있다.",
          "13. 계산능력이 떨어졌다.",
          "14. 돈 관리를 하는데 실수가 있다.",
          "15. 과거에 쓰던 기구의 사용이 서툴어졌다.",
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

export default DiagnosisDementia;
