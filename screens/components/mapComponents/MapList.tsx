import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  Linking,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import { loadPharmacyData, globalPharmacyData } from "./PharSearch";

import { buttonStyles } from "../../styles/mapStyles/buttonStyle";
import { listStyles } from "../../styles/mapStyles/listStyle";
import { modalStyles } from "../../styles/mapStyles/modalStyle";

const MapList = () => {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState({});
  const [showFavorites, setShowFavorites] = useState(false);
  const [showList, setShowList] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  useEffect(() => {
    async function initLoad() {
      await loadPharmacyData();
      const favs = await AsyncStorage.getItem("favorites_pharmacy");
      setFavorites(favs ? JSON.parse(favs) : {});
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: 36.819597, //currentLocation.coords.latitude,
        longitude: 127.156281, //currentLocation.coords.longitude,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      });
      setIsLoading(false);
    }
    initLoad();
  }, []);

  const toggleFavorite = async (pharmacyId) => {
    const newFavorites = { ...favorites };
    if (newFavorites[pharmacyId]) {
      delete newFavorites[pharmacyId];
    } else {
      newFavorites[pharmacyId] = true;
    }
    setFavorites(newFavorites);
    await AsyncStorage.setItem("favorites_pharmacy", JSON.stringify(newFavorites));
  };

  const handleCloseModal = () => {
    setSelectedPharmacy(null);
  };

  const handleCloseList = () => {
    setShowList(false);
  };

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const filteredPharmacies = showFavorites ? globalPharmacyData.filter((pharmacy) => favorites[pharmacy.id]) : globalPharmacyData;

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // showsUserLocation={true}
  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }} showsMyLocationButton={true} initialRegion={location}>
        {filteredPharmacies.map((pharmacy, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: pharmacy.latitude,
              longitude: pharmacy.longitude,
            }}
            title={pharmacy.name}
            onPress={() => setSelectedPharmacy(pharmacy)}
          >
            <Image
              source={
                pharmacy.isOpen
                  ? require("../../../assets/markerImg/markerOpen.png")
                  : require("../../../assets/markerImg/markerClose.png")
              }
              style={{ width: 40, height: 40 }}
            />
          </Marker>
        ))}
      </MapView>

      <TouchableOpacity style={buttonStyles.favShowButton} onPress={() => setShowFavorites(!showFavorites)}>
        <Text style={buttonStyles.favShowButtonFont}>{showFavorites ? "전체 보기" : "즐겨찾기"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={buttonStyles.listButton} // Adjust or add this style in your buttonStyles
        onPress={() => setShowList(!showList)}
      >
        <Text>목록 보기</Text>
      </TouchableOpacity>

      {selectedPharmacy && (
        <Modal animationType="slide" transparent={true} visible={!!selectedPharmacy} onRequestClose={handleCloseModal}>
          <View style={modalStyles.modalContainer}>
            <View style={modalStyles.modalContent}>
              <TouchableOpacity style={modalStyles.favoriteIcon} onPress={() => toggleFavorite(selectedPharmacy.id)}>
                <Icon
                  name={favorites[selectedPharmacy.id] ? "star" : "star-outline"}
                  size={24}
                  color={favorites[selectedPharmacy.id] ? "gold" : "grey"}
                />
              </TouchableOpacity>

              <Text style={modalStyles.pharmacyName}>{selectedPharmacy.name}</Text>
              <Text>전화번호: {selectedPharmacy.phone}</Text>
              <Text>주소: {selectedPharmacy.address}</Text>
              <Text
                style={{
                  color: selectedPharmacy.dutyopen === "-1" ? "red" : "black",
                  fontWeight: selectedPharmacy.dutyopen === "-1" ? "700" : "400",
                }}
              >
                {selectedPharmacy.dutyopen === "-1"
                  ? "금일 휴무"
                  : "영업 시간: " + selectedPharmacy.dutyopen + "~" + selectedPharmacy.dutyclose}
              </Text>
              <Text style={selectedPharmacy.isOpen ? modalStyles.openStat : modalStyles.closeStat}>
                {selectedPharmacy.isOpen ? "영업 중" : "영업 종료"}
              </Text>
              <TouchableOpacity style={modalStyles.callButton} onPress={() => handleCall(selectedPharmacy.phone)}>
                <Text style={modalStyles.callButtonText}>전화 걸기</Text>
              </TouchableOpacity>
              <TouchableOpacity style={modalStyles.closeButton} onPress={handleCloseModal}>
                <Text style={modalStyles.closeButtonText}>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {showList && (
        <Modal animationType="slide" transparent={true} visible={showList} onRequestClose={handleCloseList}>
          <TouchableWithoutFeedback onPress={handleCloseList}>
            <View style={modalStyles.modalContainer}>
              <View style={modalStyles.modalContentCombine}>
                {globalPharmacyData.length === 0 ? (
                  <Text style={modalStyles.searchNone}>결과가 없습니다.</Text>
                ) : (
                  <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
                    onStartShouldSetResponder={() => true}
                  >
                    {globalPharmacyData.map((pharmacy, index) => (
                      <TouchableOpacity key={index} style={listStyles.pharmacy} onPress={() => setSelectedPharmacy(pharmacy)}>
                        <View>
                          <Text style={listStyles.name}>{pharmacy.name}</Text>
                          <Text>전화번호: {pharmacy.phone.toString()}</Text>
                          <Text>주소: {pharmacy.address}</Text>
                          <Text
                            style={{
                              color: pharmacy.dutyopen === "-1" ? "red" : "black",
                              fontWeight: pharmacy.dutyopen === "-1" ? "700" : "400",
                            }}
                          >
                            {pharmacy.dutyopen === "-1" ? "금일 휴무" : "영업 시간: " + pharmacy.dutyclose}
                          </Text>
                          <Text style={pharmacy.isOpen ? listStyles.openStat : listStyles.closeStat}>
                            {pharmacy.isOpen ? "영업 중" : "영업 종료"}
                          </Text>
                        </View>
                        <TouchableOpacity onPress={() => toggleFavorite(pharmacy.id)}>
                          <Icon
                            name={favorites[pharmacy.id] ? "star" : "star-outline"}
                            size={24}
                            color={favorites[pharmacy.id] ? "gold" : "grey"}
                          />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

export default MapList;
