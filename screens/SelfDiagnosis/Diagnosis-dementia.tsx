// 치매 자가진단

import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";

import DiagnosisHeader from "./components/DiagnosisHeader";
import { selfDiagnosisStyles } from "../styles/selfDiagnosis";
import CheckBoxContainer from "./components/CheckBoxContainer";

const MAX_CONTENT_COUNT = 15; // TODO: 문항 갯수 변동되면 꼭 바꿀것!!!!

const DiagnosisDementia = () => {
  const [scoreArray, setScoreArray] = useState<number[]>(Array(MAX_CONTENT_COUNT).fill(null));
  const [totalScore, setTotalScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleScore = (index: number, score: number) => {
    setScoreArray((prev) => {
      const newArray = [...prev];
      newArray[index] = score;
      return newArray;
    });
  };

  const handleSubmit = () => {
    if (!isCompleted) {
      Alert.alert("모든 문항을 체크해주세요.");
      return;
    }
    // TODO: Alert 창 디자인 수정 및 문구 수정
    if (totalScore < 8) {
      Alert.alert("축하드립니다. 치매 위험도가 낮습니다.");
    } else {
      Alert.alert("치매 위험도가 높습니다.\n치매센터를 방문해주세요.");
    }
  };

  useEffect(() => {
    let sum = 0;
    let isCompleted = true;
    scoreArray.map((score) => {
      if (score) sum += score;
      else isCompleted = false;
    });
    setTotalScore(sum);
    setIsCompleted(isCompleted);
  }, [scoreArray]);

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
        <CheckBoxContainer content="1. 언제 어떤 일이 일어났는지 기억하지 못한다." index={0} handleScore={handleScore} />
        <CheckBoxContainer content="2. 며칠 전에 들었던 이야기를 잊는다." index={1} handleScore={handleScore} />
        <CheckBoxContainer
          content="3. 반복되는 일상생활에 변화가 생겼을 때 금방 적응하기가 힘들다."
          index={2}
          handleScore={handleScore}
        />
        <CheckBoxContainer
          content="4. 본인에게 중요한 사항을 잊는다. (배우자 생일, 결혼기념일, 제삿날 등)"
          index={3}
          handleScore={handleScore}
        />
        <CheckBoxContainer content="5. 어떤 일을 해놓고 잊어버려 다시 반복 한다." index={4} handleScore={handleScore} />
        <CheckBoxContainer content="6. 약속을 해놓고 잊는다." index={5} handleScore={handleScore} />
        <CheckBoxContainer
          content="7. 이야기 도중 방금 자기가 무슨 이야기를 하고 있었는지를 잊는다."
          index={6}
          handleScore={handleScore}
        />
        <CheckBoxContainer content="8. 하고 싶은 말이나 표현이 금방 떠오르지 않는다." index={7} handleScore={handleScore} />
        <CheckBoxContainer content="9. 물건 이름이 금방 생각나지 않는다." index={8} handleScore={handleScore} />
        <CheckBoxContainer content="10. 텔레비전을 보고 그 내용을 이해하기가 힘들다." index={9} handleScore={handleScore} />
        <CheckBoxContainer content="11. 전에 가본 장소를 기억하지 못한다." index={10} handleScore={handleScore} />
        <CheckBoxContainer content="12. 길을 잃거나 헤맨 적이 있다." index={11} handleScore={handleScore} />
        <CheckBoxContainer content="13. 계산능력이 떨어졌다." index={12} handleScore={handleScore} />
        <CheckBoxContainer content="14. 돈 관리를 하는데 실수가 있다." index={13} handleScore={handleScore} />
        <CheckBoxContainer content="15. 과거에 쓰던 기구의 사용이 서툴어졌다." index={14} handleScore={handleScore} />
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
