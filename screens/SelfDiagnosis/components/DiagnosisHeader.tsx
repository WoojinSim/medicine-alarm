import { StatusBar } from "react-native";
import { View, Text, TouchableOpacity, Vibration } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { generalValues } from "../../styles/generalValues";
import { generalStyles } from "../../styles/generalStyle";

import Icon from "react-native-vector-icons/Feather";
import { pillSearchStyle } from "../../styles/pillSearchStyle";

const DiagnosisHeader = () => {
  const navigation = useNavigation();
  const backButton = () => {
    Vibration.vibrate(20);
    navigation.goBack();
  };

  return (
    <>
      <StatusBar backgroundColor={generalValues.containerColor} barStyle="dark-content" animated={true} />
      <View style={generalStyles.tabTitleWithBackContainer}>
        <View style={pillSearchStyle.headerTextWrap}>
          <Text style={[generalStyles.tabTitleWithBackLabel, { marginRight: 8 }]}>자가진단</Text>
        </View>
        <TouchableOpacity style={generalStyles.tabTitleWithBackButton} onPress={backButton}>
          <Icon name="arrow-left" size={32} color="#454545" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default DiagnosisHeader;
