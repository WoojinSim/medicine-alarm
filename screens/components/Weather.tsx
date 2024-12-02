import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import axios from "axios";

import { generalStyles } from "../styles/generalStyle";
import { weatherStyle } from "../styles/weatherStyle";

const CURRENT_LOCATION_X = 36;
const CURRENT_LOCATION_Y = 127;

interface WeatherData {
  resultCode: string;
  resultMsg: string;
  baseDate: string;
  baseTime: string;
  nx: string;
  ny: string;
  category: string;
  obsrValue: string;
}

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const getBaseDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const getBaseTime = (): string => {
    const today = new Date();
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    return `${hours}00`;
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(`http://13.125.155.126:8080/pill/weather`, {
          params: {
            base_date: getBaseDate(),
            base_time: getBaseTime(),
            nx: `${CURRENT_LOCATION_X}`,
            ny: `${CURRENT_LOCATION_Y}`,
          },
        });
        const temperatureData = response.data.find((item: { category: string }) => item.category === "T1H");
        if (temperatureData) {
          setWeatherData(temperatureData);
        }
      } catch (error) {
        console.error("날씨 데이터를 가져오는데 실패했습니다", error);
      }
    };
    fetchWeatherData();
  }, []);

  return (
    <View style={generalStyles.rowContainer}>
      <View style={weatherStyle.weatherContainer}>
        <View style={weatherStyle.weatherItemContainer}>
          <Text style={weatherStyle.weatherItemTitle}>현재 기온</Text>
          <Text style={weatherStyle.weatherItemValue}>{!weatherData ? "-4" : weatherData?.obsrValue}℃</Text>
        </View>
        <View style={weatherStyle.weatherItemContainer}>
          <Text style={weatherStyle.weatherItemTitle}>미세먼지</Text>
          <Text style={weatherStyle.weatherItemValue}>보통</Text>
        </View>
      </View>
    </View>
  );
};

export default Weather;
