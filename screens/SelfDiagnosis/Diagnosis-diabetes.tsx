// 당뇨병 자가진단

import React from "react";
import { View, Text, ScrollView } from "react-native";

import DiagnosisHeader from "./components/DiagnosisHeader";

import { selfDiagnosisStyles } from "../styles/selfDiagnosis";

const MAX_CONTENT_COUNT = 9; // TODO: 문항 갯수 변동되면 꼭 바꿀것!!!!

const DiagnosisDiabetes = () => {
  return (
    <>
      <DiagnosisHeader />
      <Text style={selfDiagnosisStyles.innerContentTitle}>당뇨병</Text>
      <ScrollView style={selfDiagnosisStyles.innerContentContainer}>
        <Text style={selfDiagnosisStyles.innerContentSubtitle}>질환 정의</Text>
        <Text style={selfDiagnosisStyles.innerContentText}>
          당뇨병은 소변으로 포도당이 배출된다고 하여 이름 붙여진 병입니다. 정상인의 경우 소변으로 당이 넘쳐나지 않을
          정도로 혈당이 조절됩니다. 여기에는 췌장에서 분비되는 '인슐린'이라는 호르몬이 중요한 작용을 합니다. 이러한
          인슐린이 모자라거나 제대로 일을 못 하는 상태가 되면 혈당이 상승하며, 이로 인해 혈당이 지속적으로 높은 상태가
          됩니다. 이러한 상태를 당뇨병이라고 합니다. 우리나라의 당뇨병 유병률은 경제가 발전하고 생활 양식이 서구화됨에
          따라 증가하는 추세입니다.
        </Text>
        <Text style={[selfDiagnosisStyles.innerContentSubtitle, { marginTop: 30 }]}>원인</Text>
        <Text style={selfDiagnosisStyles.innerContentText}>
          당뇨병의 발생에는 유전과 환경이 중요한 역할을 합니다. 즉, 당뇨병은 이것에 걸리기 쉬운 유전적 체질을 부모로부터
          물려받은 사람이 당뇨병을 유발하기 쉬운 환경에 노출될 때 발생할 수 있습니다. 하지만 현재까지 당뇨병을 일으키는
          유전자의 이상을 찾을 수 있는 경우는 전체 당뇨병의 1% 미만에 불과합니다. 대부분의 당뇨병에서는 원인 유전자가
          명확히 밝혀지지 않았습니다.
        </Text>
        <Text style={[selfDiagnosisStyles.innerContentSubtitle, { marginTop: 30 }]}>증상</Text>
        <Text style={selfDiagnosisStyles.innerContentText}>
          당뇨병에 걸리면 소변으로 포도당이 빠져나가는데, 이때 수분을 같이 끌고 나가기 때문에 소변량이 늘어납니다. 그
          결과 몸 안에 수분이 부족하여 심한 갈증을 느끼게 됩니다. 또한 영양분이 몸에서 이용되지 않고 빠져나가므로
          피로감을 잘 느낍니다. 또한 잘 먹는데도 불구하고 체중이 감소합니다.
        </Text>
        <Text style={[selfDiagnosisStyles.innerContentSubtitle, { marginTop: 30 }]}>진단</Text>
        <Text style={selfDiagnosisStyles.innerContentText}>
          당뇨병은 혈당을 측정하여 진단합니다. 이때 혈당 검사란 손가락 끝에서 채혈을 하는 전혈 포도당 검사가 아니라,
          정맥혈을 채취하여 피떡을 가라앉히고 상층의 맑은 혈장 성분만을 분리하여 포도당 농도를 측정하는 검사입니다.
          과거에 많이 시행하던 요당 검사는 당뇨병이 있어도 음성으로 나올 수 있고, 당뇨병이 아니더라도 양성으로 나올 수
          있으므로 진단 검사로는 부적합합니다.
        </Text>
        <Text style={[selfDiagnosisStyles.innerContentSubtitle, { marginVertical: 30 }]}>치료</Text>
        <Text style={selfDiagnosisStyles.innerContentText}>
          당뇨병의 치료 방법으로는 식사 요법, 운동 요법, 약물 치료가 있습니다. 가벼운 당뇨병은 식사 요법과 운동
          요법만으로도 효과적으로 치료할 수 있습니다. 식사 요법과 운동 요법만으로 만족할 만한 혈당 조절이 이루어지지
          않을 때 약물 요법을 추가합니다. 하지만 약물 요법을 받는 중에도 반드시 식사 요법과 운동 요법을 병행해야 합니다.
          약물 요법에는 경구 혈당강하제와 인슐린 주사가 있는데, 당뇨병의 종류, 환자의 상태, 합병증의 유무에 따라 치료
          약물을 선택합니다.
        </Text>
      </ScrollView>
    </>
  );
};

export default DiagnosisDiabetes;
