// 자가진단 페이지 커스텀 훅

import { useState, useEffect } from "react";
import { Alert } from "react-native";

interface UseDiagnosisScoreProps {
  maxContentCount: number;
  threshold: number;
  successMessage: string;
  warningMessage: string;
}

export const useDiagnosisScore = ({ maxContentCount, threshold, successMessage, warningMessage }: UseDiagnosisScoreProps) => {
  const [scoreArray, setScoreArray] = useState<number[]>(Array(maxContentCount).fill(null)); // 문항별 점수 배열
  const [totalScore, setTotalScore] = useState<number>(0); // 문항점수 합산 값
  const [isCompleted, setIsCompleted] = useState<boolean>(false); // 모든 문항 체크 여부

  /**
   * 선택지 점수 핸들러
   * @param index 선택지 인덱스
   * @param score 선택지 점수
   */
  const handleScore = (index: number, score: number) => {
    setScoreArray((prev) => {
      const newArray = [...prev];
      newArray[index] = score;
      return newArray;
    });
  };

  /**
   * 제출 핸들러
   */
  const handleSubmit = () => {
    if (!isCompleted) {
      Alert.alert("모든 문항을 체크해주세요.");
      return;
    }

    if (totalScore < threshold) {
      Alert.alert(successMessage);
    } else {
      Alert.alert(warningMessage);
    }
  };

  /**
   * 점수 합산 및 완료 여부 체크
   */
  useEffect(() => {
    let sum = 0;
    let isCompleted = true;
    scoreArray.forEach((score) => {
      if (score !== null) sum += score;
      else isCompleted = false;
    });
    setTotalScore(sum);
    setIsCompleted(isCompleted);
  }, [scoreArray]);

  return {
    scoreArray,
    totalScore,
    isCompleted,
    handleScore,
    handleSubmit,
  };
};
