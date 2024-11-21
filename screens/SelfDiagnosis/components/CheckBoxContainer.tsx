// 선택지 컴포넌트

import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { selfDiagnosisStyles } from "../../styles/selfDiagnosis";
import { generalValues } from "../../styles/generalValues";

interface CheckItemContainerProps {
  content: string;
  index: number;
  handleScore: (index: number, score: number) => void;
}

const CheckBoxContainer = ({ content, index, handleScore }: CheckItemContainerProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>();

  const handleSelect = (score: number) => {
    setSelectedIndex(score);
    handleScore(index, score);
  };

  return (
    <View style={selfDiagnosisStyles.checkBoxContainer}>
      <Text style={selfDiagnosisStyles.checkBoxLabel}>{content}</Text>
      <View style={selfDiagnosisStyles.radioBtnContainer}>
        <TouchableOpacity
          style={[selfDiagnosisStyles.radioBtn, selectedIndex === 0 ? { backgroundColor: generalValues.highlightColor } : {}]}
          onPress={() => handleSelect(0)}
        >
          <Text style={selfDiagnosisStyles.radioBtnText}>그렇지 않다</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[selfDiagnosisStyles.radioBtn, selectedIndex === 1 ? { backgroundColor: generalValues.highlightColor } : {}]}
          onPress={() => handleSelect(1)}
        >
          <Text style={selfDiagnosisStyles.radioBtnText}>간혹 그렇다</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[selfDiagnosisStyles.radioBtn, selectedIndex === 2 ? { backgroundColor: generalValues.highlightColor } : {}]}
          onPress={() => handleSelect(2)}
        >
          <Text style={selfDiagnosisStyles.radioBtnText}>자주 그렇다</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckBoxContainer;
