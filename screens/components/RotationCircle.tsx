import React, { useEffect, useRef } from "react";
import { Animated, View, Text, Easing } from "react-native";
import { useFonts } from "expo-font";

import { medicineAlarmStyles } from "../styles/medicineAlarmStyles";

const RotationCircle = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startRotation();
  }, []);

  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 100000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return <Animated.View style={[medicineAlarmStyles.circle, { transform: [{ rotate: spin }] }]} />;
};

export default RotationCircle;
