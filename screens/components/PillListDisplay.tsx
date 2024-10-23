import React, { useState, useEffect, useCallback } from "react";
import { Modal, View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import axios from "axios";

import { loadData } from "../components/Bookmark";
import { pillSearchInterface } from "../../interfaces";

import { pillSearchStyle } from "../styles/pillSearchStyle";
import { generalStyles } from "../styles/generalStyle";
import PillModal from "../components/PillModal";

const API_URL = "g7%2F%2B92eBrbF07oJ0SFsyzLTY%2BxGOvqJeeE8VUkQWvHJUi9nUxSm82jdtJLwIkuC91lVvkHvVbdCxlKFhmrp1Yg%3D%3D";

interface ChildProps {
  setSelectedData: React.Dispatch<React.SetStateAction<pillSearchInterface | undefined>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PillListDisplay: React.FC<ChildProps> = ({ setSelectedData, setShowModal }) => {
  const [favList, setFavList] = useState<pillSearchInterface[]>([]);

  // 북마크 목록 확인
  const fetchList = async () => {
    const exists = await loadData();
    if (exists) {
      setFavList(exists);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const renderFavItem = ({ item }: { item: pillSearchInterface }) => (
    <TouchableOpacity
      style={pillSearchStyle.resultItemContainer}
      key={item.itemSeq}
      onPress={() => {
        setSelectedData(item);
        setShowModal(true);
      }}
    >
      <Image
        source={item.itemImage ? { uri: item.itemImage } : require("../../assets/not_supported.png")}
        style={[pillSearchStyle.resultImage, { width: 120, height: 65 }]}
      />
      <View style={pillSearchStyle.resultLabelWrap}>
        <Text style={pillSearchStyle.resultItemTitle}>{item.itemName}</Text>
        <Text style={pillSearchStyle.resultItemLore}>{item.entpName}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={generalStyles.wrap}>
      <FlatList
        data={favList}
        renderItem={renderFavItem}
        keyExtractor={(item) => (item.itemSeq ? String(item.itemSeq) : String(Math.random()))}
      />
    </View>
  );
};

export default PillListDisplay;
