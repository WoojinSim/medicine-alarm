// 고혈압 및 심혈관계 질환 자가진단

import React from "react";
import { View, Text, ScrollView } from "react-native";

import DiagnosisHeader from "./components/DiagnosisHeader";

import { selfDiagnosisStyles } from "../styles/selfDiagnosis";

const MAX_CONTENT_COUNT = 9; // TODO: 문항 갯수 변동되면 꼭 바꿀것!!!!

const DiagnosisHypertension = () => {
  return (
    <>
      <DiagnosisHeader />
      <Text style={selfDiagnosisStyles.innerContentTitle}>고혈압 및 심혈관계질환</Text>
      <ScrollView style={selfDiagnosisStyles.innerContentContainer}>
        <Text style={selfDiagnosisStyles.innerContentSubtitle}>질환 정의</Text>
        <Text style={selfDiagnosisStyles.innerContentText}>
          고혈압은 혈압이 여러 원인으로 인해 높아진 상태를 의미합니다. 혈압은 동맥혈관 벽에 대항한 혈액의 압력을
          말합니다. 혈액의 압력은 심장이 수축하여 동맥혈관으로 혈액을 보낼 때 가장 높은데, 이때의 혈압을 수축기
          혈압이라고 합니다. 또한 심장이 늘어나서 혈액을 받아들일 때 가장 낮은데, 이때의 혈압을 이완기 혈압이라고
          합니다. 우리나라 성인 인구의 약 30%가 이러한 혈압이 높아진 증상인 고혈압이 있는 것으로 추정됩니다.
        </Text>
        <Text style={[selfDiagnosisStyles.innerContentSubtitle, { marginTop: 30 }]}>원인</Text>
        <Text style={selfDiagnosisStyles.innerContentText}>
          고혈압은 혈압이 여러 원인으로 인해 높아진 상태를 의미합니다. 혈압은 동맥혈관 벽에 대항한 혈액의 압력을
          말합니다. 혈액의 압력은 심장이 수축하여 동맥혈관으로 혈액을 보낼 때 가장 높은데, 이때의 혈압을 수축기
          혈압이라고 합니다. 또한 심장이 늘어나서 혈액을 받아들일 때 가장 낮은데, 이때의 혈압을 이완기 혈압이라고
          합니다. 우리나라 성인 인구의 약 30%가 이러한 혈압이 높아진 증상인 고혈압이 있는 것으로 추정됩니다.
        </Text>
        <Text style={[selfDiagnosisStyles.innerContentSubtitle, { marginTop: 30 }]}>증상</Text>
        <Text style={selfDiagnosisStyles.innerContentText}>
          고혈압은 뚜렷한 증상이 없어 신체검사나 진찰 중에 우연히 발견되는 경우가 적지 않습니다. 고혈압은 ‘소리 없는
          죽음의 악마’라고 할 정도로 증상이 없는 경우가 대부분입니다. 간혹 증상이 있어서 병원을 찾는 경우는 두통이나
          어지러움, 심계항진, 피로감 등의 혈압 상승에 의한 증상을 호소합니다. 코피나 혈뇨, 시력 저하, 뇌혈관 장애 증상,
          협심증 등 고혈압성 혈관 질환에 의한 증상을 호소하기도 합니다. 이차성 고혈압의 경우 종종 원인 질환의 증상을
          호소합니다.
        </Text>
        <Text style={[selfDiagnosisStyles.innerContentSubtitle, { marginTop: 30 }]}>진단</Text>
        <Text style={selfDiagnosisStyles.innerContentText}>
          혈압을 1회만 측정하여 고혈압을 진단하는 것은 바람직하지 않습니다. 처음 측정한 혈압이 높은 경우에는 1일 간격을
          두고 최소한 두 번 더 측정합니다. 그 결과 이완기 혈압 90mmHg 이상 또는 수축기 혈압 140mmHg 이상이면 고혈압으로
          진단합니다.
        </Text>
        <Text style={[selfDiagnosisStyles.innerContentSubtitle, { marginTop: 30 }]}>치료</Text>
        <Text style={selfDiagnosisStyles.innerContentText}>
          최근에는 고혈압을 치료하기 위해 비약물적 요법과 약물적 요법을 함께 실시합니다. 고혈압 전 단계에서는 체중 조절,
          식사 요법, 행동 수정, 규칙적인 운동 실시 등의 비약물적 요법을 먼저 시행하는 것을 권장합니다. 그러나 고혈압으로
          진단받으면 반드시 약물을 이용해 혈압을 정상으로 조절해야 합니다. 흡연은 심혈관계 질환의 주요 위험 인자이므로,
          금연을 권장합니다.
        </Text>
      </ScrollView>
    </>
  );
};

export default DiagnosisHypertension;
